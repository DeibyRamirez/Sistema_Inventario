import { Client } from "pg";
import { pool, query } from "../config/db";
import { IVenta } from "../models/venta.model";



export const VentaRepositorio = {

    // Listar Ventas
    findAll: async (): Promise<IVenta[]> => {
        const sql = `
            SELECT * FROM ventas;
        `;
        const result = await query(sql);
        return result.rows as IVenta[]; // Casteo seguro
    },

    // Crear una Venta
    create: async (data: any) => {
        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const {
                negocio_id,
                usuario_id,
                tipo_pago,
                descuento,
                productos
            } = data;

            // Calcular total

            const total = productos.reduce(
                (acc: number, p: any) => acc + p.cantidad * p.precio_unitario,
                0
            );

            // Insertar venta
            const ventaResultado = await client.query(
                `
                INSERT INTO ventas (negocio_id, usuario_id, total, descuento, tipo_pago)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id_venta;
                `,
                [negocio_id, usuario_id, total, descuento, tipo_pago]

            );

            const id_venta = ventaResultado.rows[0].id_venta;

            // Procesar cada producto
            for (const producto of productos) {
                const { producto_id, cantidad, precio_unitario } = producto;

                // Bloqueo y validación de stock
                const stockResult = await client.query(
                    `
                SELECT stock_actual
                FROM productos
                WHERE id_producto = $1
                FOR UPDATE
                `,
                    [producto_id]
                );

                if (stockResult.rows[0].stock_actual < cantidad) {
                    throw new Error(`Stock insuficiente para producto ${producto_id}`);
                }

                // Insertar detalle
                await client.query(
                    `
                INSERT INTO detalles_venta
                (venta_id, producto_id, cantidad, precio_unitario_momento)
                VALUES ($1, $2, $3, $4);`,

                    [id_venta, producto_id, cantidad, precio_unitario]
                );

                // Actualizar stock
                await client.query(
                    `
                UPDATE productos
                SET stock_actual = stock_actual - $1
                WHERE id_producto = $2;`,

                    [cantidad, producto_id]
                );

                // Movimiento de stock
                await client.query(
                    `
                INSERT INTO movimientos_stock
                (negocio_id, producto_id, tipo, motivo, cantidad)
                VALUES ($1, $2, 'salida', 'venta', $3);
                `,
                    [negocio_id, producto_id, cantidad]
                );

            }

            // Auditoria
            await client.query(
                `
                INSERT INTO auditoria
                (negocio_id, usuario_id, accion, metodo_http)
                VALUES ($1, $2, $3, 'POST');
                `,
                [negocio_id, usuario_id, `Venta registrada ID ${id_venta}`]
            );

            await client.query("COMMIT");

            return { message: "Venta registrada correctamente", id_venta };

        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();

        }
    }
};
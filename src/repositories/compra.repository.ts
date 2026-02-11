import { pool, query } from "../config/db";
import { ICompra } from "../models/compra.model";

export const CompraRepositorio = {

    // Listar compras
    findAll: async (): Promise<ICompra[]> => {
        const sql = `
            SELECT * FROM compras;
        `;
        const result = await query(sql);
        return result.rows as ICompra[]; // Casteo seguro
    },

    // Crear una Venta
    create: async (data: any, usuario_id: number) => {
        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const { negocio_id, proveedor_id, productos } = data;

            const total_compra = productos.reduce(
                (acc: number, p: any) => acc + p.cantidad * p.precio_unitario,
                0
            );

            // Insertar compra
            const compraResult = await client.query(
                `
            INSERT INTO compras (negocio_id, proveedor_id, total_compra, usuario_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id_compra;
            `,
                [negocio_id, proveedor_id, total_compra, usuario_id]
            );

            const id_compra = compraResult.rows[0].id_compra;

            // Procesar productos
            for (const producto of productos) {
                const { producto_id, cantidad, precio_unitario } = producto;

                const subtotal = cantidad * precio_unitario;

                // Insertar detalle_compra
                await client.query(
                    `
                INSERT INTO detalles_compra
                (compra_id, producto_id, cantidad, precio_unitario, subtotal)
                VALUES ($1, $2, $3, $4, $5);
                `,
                    [id_compra, producto_id, cantidad, precio_unitario, subtotal]
                );

                // Bloqueo
                await client.query(
                    `
                SELECT stock_actual
                FROM productos
                WHERE id_producto = $1
                FOR UPDATE;
                `,
                    [producto_id]
                );

                // Actualizar stock
                await client.query(
                    `
                UPDATE productos
                SET stock_actual = stock_actual + $1
                WHERE id_producto = $2;
                `,
                    [cantidad, producto_id]
                );

                // Movimiento
                await client.query(
                    `
                INSERT INTO movimientos_stock
                (negocio_id, producto_id, tipo, motivo, cantidad)
                VALUES ($1, $2, 'entrada', 'compra', $3);
                `,
                    [negocio_id, producto_id, cantidad]
                );
            }

            // Auditoría
            await client.query(
                `
            INSERT INTO auditoria
            (negocio_id, usuario_id, accion, metodo_http)
            VALUES ($1, $2, $3, 'POST');
            `,
                [negocio_id, usuario_id, `Compra registrada ID ${id_compra}`]
            );

            await client.query("COMMIT");

            return { message: "Compra registrada correctamente", id_compra };

        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    },


    // Editar una compra
    update: async (id_compra: number, fields: Partial<ICompra>) => {
        const keys = Object.keys(fields);
        if (keys.length === 0) return null; // No hay nada que actualizar

        // Construimos la parte "SET nombre=$1, email=$2..."
        const setClause = keys
            .map((key, index) => `${key} = $${index + 1}`)
            .join(", ");

        // Los valores para los $1, $2...
        const values = Object.values(fields);

        // Añadimos el ID al final para el WHERE
        const sql = `
                UPDATE compras 
                SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
                WHERE id_compra = $${values.length + 1} 
                RETURNING *;
            `;

        const result = await query(sql, [...values, id_compra]);
        return result.rows[0];
    },

    // Eliminar o desactivar la Compra
    delete: async (id_compra: number) => {
        const sql = `UPDATE compras SET activo = false WHERE id_compra = $1`;
        return await query(sql, [id_compra]);
    }
};
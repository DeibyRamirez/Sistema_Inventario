import { query } from "../config/db";
import { IVenta } from "src/models/venta.model";

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
    create: async (ventaData: any) => {
        const { negocio_id, usuario_id, total, descuento, tipo_pago, fecha } = ventaData;
        const sql = `
        INSERT INTO ventas (negocio_id, usuario_id, total, descuento, tipo_pago, fecha)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;
        const values = [negocio_id, usuario_id, total, descuento, tipo_pago, fecha];
        const result = await query(sql, values);
        return result.rows[0];
    },

    // Editar un Venta
    update: async (id_venta: number, fields: Partial<IVenta>) => {
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
                UPDATE ventas 
                SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
                WHERE id_venta = $${values.length + 1} 
                RETURNING *;
            `;

        const result = await query(sql, [...values, id_venta]);
        return result.rows[0];
    },

    // Eliminar o desactivar la Venta
    delete: async (id_venta: number) => {
        const sql = `UPDATE ventas SET activo = false WHERE id_venta = $1`;
        return await query(sql, [id_venta]);
    }
};
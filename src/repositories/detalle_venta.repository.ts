import { query } from "../config/db";
import { IDetalle_venta } from "../models/detalle_venta.model";

export const Detalle_ventaRepositorio = {

    // Listar Detalles_venta
    findAll: async (): Promise<IDetalle_venta[]> => {
        const sql = `
            SELECT * FROM detalles_venta;
        `;
        const result = await query(sql);
        return result.rows as IDetalle_venta[]; // Casteo seguro
    },

    // Crear un Detalles_venta
    create: async (detalles_ventaData: any) => {
        const { venta_id, producto_id, cantidad, precio_unitario_momento } = detalles_ventaData;
        const sql = `
        INSERT INTO detalles_venta (venta_id, producto_id, cantidad, precio_unitario_momento)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;
        const values = [venta_id, producto_id, cantidad, precio_unitario_momento];
        const result = await query(sql, values);
        return result.rows[0];
    },

    // Editar un Detalles_venta
    update: async (id_detalle: number, fields: Partial<IDetalle_venta>) => {
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
                UPDATE detalles_venta 
                SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
                WHERE id_detalle = $${values.length + 1} 
                RETURNING *;
            `;

        const result = await query(sql, [...values, id_detalle]);
        return result.rows[0];
    },

    // Eliminar o desactivar un Detalles_venta
    delete: async (id_detalle: number) => {
        const sql = `UPDATE detalles_venta SET activo = false WHERE id_detalle = $1`;
        return await query(sql, [id_detalle]);
    }
};
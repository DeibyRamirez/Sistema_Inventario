import { query } from "../config/db";
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

    // Crear una Compra
    create: async (compraData: any) => {
        const { negocio_id, proveedor_id, total_compra, fecha } = compraData;
        const sql = `
        INSERT INTO compras (negocio_id, proveedor_id, total_compra, fecha)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;
        const values = [negocio_id, proveedor_id, total_compra, fecha];
        const result = await query(sql, values);
        return result.rows[0];
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
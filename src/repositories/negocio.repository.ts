import { INegocio } from "src/models/negocio.model";
import { query } from "../config/db";

export const NegocioRepositorio = {

    // Listar Negocios
    findAll: async (): Promise<INegocio[]> => {
        const sql = `
            SELECT * FROM negocios;
        `;
        const result = await query(sql);
        return result.rows as INegocio[]; // Casteo seguro
    },

    // Crear un Negocio
    create: async (negocioData: any) => {
        const { nombre, nit, direccion, telefono, logro_url, activo } = negocioData;
        const sql = `
        INSERT INTO negocios (nombre, nit, direccion, telefono, logro_url, activo)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;
        const values = [nombre, nit, nombre, direccion, telefono, logro_url, activo];
        const result = await query(sql, values);
        return result.rows[0];
    },

    // Editar un Negocio
    update: async (id_negocio: number, fields: Partial<INegocio>) => {
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
                UPDATE negocios 
                SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
                WHERE id_negocio = $${values.length + 1} 
                RETURNING *;
            `;

        const result = await query(sql, [...values, id_negocio]);
        return result.rows[0];
    },

    // Eliminar o desactivar el Negocio
    delete: async (id_negocio: number) => {
        const sql = `UPDATE negocio SET activo = false WHERE id_negocio = $1`;
        return await query(sql, [id_negocio]);
    }
};
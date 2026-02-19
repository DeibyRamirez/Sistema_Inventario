import { INegocio } from "../models/negocio.model";
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

    // Listar Negocios
    soloUno: async (id_negocio: number): Promise<INegocio[]> => {
        const sql = `
            SELECT * FROM negocios WHERE id_negocio = $1;
        `;
        const result = await query(sql, [id_negocio]);
        return result.rows as INegocio[]; // Casteo seguro
    },

    // Crear un Negocio
    create: async (negocioData: any) => {
        const { nombre, nit, direccion, telefono, logo_url, activo } = negocioData;
        const sql = `
        INSERT INTO negocios (nombre, nit, direccion, telefono, logo_url, activo)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;
        const values = [nombre, nit, direccion, telefono, logo_url, true];
        const result = await query(sql, values);
        return result.rows[0];
    },

    // Editar un Negocio
    update: async (id_negocio: number, fields: Partial<INegocio>) => {

        const allowedFields = [
            "nombre",
            "nit",
            "direccion",
            "telefono",
            "logo_url",
            "activo"
        ];

        const filteredFields = Object.keys(fields)
            .filter(key => allowedFields.includes(key))
            .reduce((obj: any, key) => {
                obj[key] = (fields as any)[key];
                return obj;
            }, {});

        const keys = Object.keys(filteredFields);
        if (keys.length === 0) return null;

        const setClause = keys
            .map((key, index) => `${key} = $${index + 1}`)
            .join(", ");

        const values = Object.values(filteredFields);

        const sql = `
        UPDATE negocios 
        SET ${setClause}
        WHERE id_negocio = $${values.length + 1} 
        RETURNING *;
    `;

        const result = await query(sql, [...values, id_negocio]);
        return result.rows[0];
    },


    // Eliminar o desactivar el Negocio
    delete: async (id_negocio: number) => {
        const sql = `UPDATE negocios SET activo = false WHERE id_negocio = $1`;
        return await query(sql, [id_negocio]);
    }
};
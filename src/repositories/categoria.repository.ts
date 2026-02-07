import { query } from "../config/db";
import { ICategoria } from "src/models/categoria.model";

export const CategoriaRepositorio = {

    // Listar Categoria
    findAll: async (): Promise<ICategoria[]> => {
        const sql = `
            SELECT * FROM categorias;
        `;
        const result = await query(sql);
        return result.rows as ICategoria[]; // Casteo seguro
    },

    // Listar Categoria de un Negocio
    findAllCatagoriasNegocio: async (negocio_id: number): Promise<ICategoria[]> => {
        const sql = `
            SELECT * FROM categorias WHERE negocio_id = $1;
        `;
        const result = await query(sql, [negocio_id]);
        return result.rows as ICategoria[]; // Casteo seguro
    },

    // Crear un Categoria
    create: async (categoriaData: any) => {
        const { negocio_id, nombre, descripcion, activo } = categoriaData;
        const sql = `
        INSERT INTO categorias (negocio_id, nombre, descripcion, activo)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;
        const values = [negocio_id, nombre, descripcion, activo];
        const result = await query(sql, values);
        return result.rows[0];
    },

    // Editar un Negocio
    update: async (id_categoria: number, fields: Partial<ICategoria>) => {
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
                UPDATE categorias 
                SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
                WHERE id_negocio = $${values.length + 1} 
                RETURNING *;
            `;

        const result = await query(sql, [...values, id_categoria]);
        return result.rows[0];
    },

    // Eliminar o desactivar el Categoria
    delete: async (id_categoria: number) => {
        const sql = `UPDATE categorias SET activo = false WHERE id_categoria = $1`;
        return await query(sql, [id_categoria]);
    }
};
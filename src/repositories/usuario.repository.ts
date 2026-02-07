import { IUsuario } from "../models/usuario.model";
import { query } from "../config/db";


export const UsuarioRepositorio = {

    // Listar Usuarios
    findAll: async (): Promise<IUsuario[]> => {
        const sql = `
            SELECT id_usuario, negocio_id, nombre, email, rol, activo, created_at FROM usuarios;
        `;
        const result = await query(sql);
        return result.rows as IUsuario[]; // Casteo seguro
    },

    // Listar Usuarios del Negocio
    findAllNegocio: async (negocio_id: number): Promise<IUsuario[]> => {
        const sql = `
            SELECT id_usuario, negocio_id, nombre, email, rol, activo, created_at FROM usuarios WHERE negocio_id = $1;
        `;
        const result = await query(sql, [negocio_id]);
        return result.rows as IUsuario[]; // Casteo seguro
    },

    // Crear un Negocio
    create: async (usuarioData: any) => {
        const { negocio_id, nombre, email, password, rol, activo } = usuarioData;
        const sql = `
        INSERT INTO usuarios (negocio_id, nombre, email, password, rol, activo)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;
        const values = [negocio_id, nombre, email, password, rol, activo];
        const result = await query(sql, values);
        return result.rows[0];
    },

    // Editar un Usuario
    update: async (id_usuario: number, fields: Partial<IUsuario>) => {
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
        UPDATE usuarios 
        SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
        WHERE id_usuario = $${values.length + 1} 
        RETURNING *;
    `;

        const result = await query(sql, [...values, id_usuario]);
        return result.rows[0];
    },

    // Eliminar o desactivar un Usuario
    delete: async (id_usuario: number) => {
        const sql = `UPDATE usuarios SET activo = false WHERE id_usuario = $1`;
        return await query(sql, [id_usuario]);
    }
};
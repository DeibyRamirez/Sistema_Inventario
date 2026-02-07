import { query } from "../config/db";
import { IProveedor } from "../models/proveedor.model";

export const ProveedorRepositorio = {

    // Listar Proveedores
    findAll: async (negocio_id: number): Promise<IProveedor[]> => {
        const sql = `
            SELECT * FROM proveedores WHERE negocio_id = $1 AND activo = true;
        `;
        const result = await query(sql, [negocio_id]);
        return result.rows as IProveedor[]; // Casteo seguro
    },

    // Crear un Proveedor
    create: async (proveedorData: any) => {
        const { negocio_id, nombre, contacto, nit_proveedor, activo } = proveedorData;
        const sql = `
        INSERT INTO proveedores (negocio_id, nombre, contacto, nit_proveedor, activo)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;
        const values = [negocio_id, nombre, contacto, nit_proveedor, activo];
        const result = await query(sql, values);
        return result.rows[0];
    },

    // Editar un Proveedor
    update: async (id_proveedor: number, fields: Partial<IProveedor>) => {
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
            UPDATE proveedores 
            SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
            WHERE id_proveedor = $${values.length + 1} 
            RETURNING *;
        `;

        const result = await query(sql, [...values, id_proveedor]);
        return result.rows[0];
    },


    // Eliminar o desactivar el Proveedor
    delete: async (id_proveedor: number) => {
        const sql = `UPDATE proveedores SET activo = false WHERE id_proveedor = $1`;
        return await query(sql, [id_proveedor]);
    }
};
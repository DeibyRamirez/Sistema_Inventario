import { query } from "../config/db";
import { IProducto } from "../models/producto.model";

export const ProductoRepositorio = {

    // Obtener productos de un negocio específico (Seguridad Multi-tenant)
    getAllBusiness: async (negocio_id: number) => {
        const sql = `
        SELECT p.*, c.nombre as categorias_nombre 
        FROM productos p LEFT JOIN categorias c ON p.categoria_id = c.id_categoria
        WHERE p.negocio_id = $1 
        ORDER BY p.nombre ASC;
        `;
        const result = await query(sql, [negocio_id]);
        return result.rows;
    },

    // Listar Productos
    findAll: async (negocio_id: number): Promise<IProducto[]> => {
        const sql = `
            SELECT *
            FROM productos 
            WHERE negocio_id = $1 AND activo = true;
        `;
        const result = await query(sql, [negocio_id]);
        return result.rows as IProducto[]; // Casteo seguro
    },

    // Crear un producto
    create: async (productData: any) => {
        const { negocio_id, categoria_id, nombre, precio_venta } = productData;
        const sql = `
        INSERT INTO productos (negocio_id, categoria_id, nombre, precio_venta, stock_actual, activo)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;
        const values = [negocio_id, categoria_id, nombre, precio_venta, 0, true]; // Por defecto activo al crear
        const result = await query(sql, values);
        return result.rows[0];
    },

    // Editar el stock de un producto
    updateStock: async (id_producto: number, cantidad: number, client?: any) => {
        const sql = `UPDATE productos SET stock_actual = stock_actual - $1 WHERE id_producto = $2`;
        // Si usamos transacción, pasamos el 'client' de pg
        const db = client || { query };
        return await db.query(sql, [cantidad, id_producto]);
    },

    // Editar un Producto
    update: async (id_producto: number, fields: Partial<IProducto>, negocio_id: number) => {
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
            UPDATE productos 
            SET ${setClause}
            WHERE id_producto = $${values.length + 1} AND negocio_id = $${values.length + 2}
            RETURNING *;
        `;
    
            const result = await query(sql, [...values, id_producto, negocio_id]);
            return result.rows[0];
        },

    // En tu ProductRepository.ts
    delete: async (id_producto: number, negocio_id: number) => {
        const sql = `UPDATE productos SET activo = false WHERE id_producto = $1 AND negocio_id = $2`;
        return await query(sql, [id_producto, negocio_id]);
    }
};
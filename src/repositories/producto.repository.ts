import { query } from "../config/db";
import { IProducto } from "../models/producto.model";

export const ProductoRepositorio = {
    
    // Obtener productos de un negocio específico (Seguridad Multi-tenant)
    getAllBusiness: async (id_negocio: number) => {
        const sql = `
        SELECT p.*, c.nombre as categorias_nombre 
        FROM productos p LEFT JOIN categorias c ON p.categoria_id = c.id_categoria
        WHERE p.negocio_id = $1 
        ORDER BY p.nombre ASC;
        `;
        const result = await query(sql, [id_negocio]);
        return result.rows;
    },

    // Listar Productos
    findAll: async (negocio_id: number): Promise<IProducto[]> => {
        const sql = `
            SELECT id_producto, nombre, precio_venta, stock_actual 
            FROM productos 
            WHERE negocio_id = $1 AND activo = true;
        `;
        const result = await query(sql, [negocio_id]);
        return result.rows as IProducto[]; // Casteo seguro
    },

    // Crear un producto
    create: async (productData: any) => {
        const { negocio_id, categoria_id, nombre, precio_venta, stock_actual } = productData;
        const sql = `
        INSERT INTO productos (negocio_id, categoria_id, nombre, precio_venta, stock_actual)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;
        const values = [negocio_id, categoria_id, nombre, precio_venta, stock_actual];
        const result = await query(sql, values);
        return result.rows[0];
    },

    // Editar un producto
    updateStock: async (id_producto: number, cantidad: number, client?: any) => {
        const sql = `UPDATE productos SET stock_actual = stock_actual - $1 WHERE id_producto = $2`;
        // Si usamos transacción, pasamos el 'client' de pg
        const db = client || { query }; 
        return await db.query(sql, [cantidad, id_producto]);
    },

    // En tu ProductRepository.ts
    delete: async (id_producto: number) => {
        const sql = `UPDATE productos SET activo = false WHERE id_producto = $1`;
        return await query(sql, [id_producto]);
}
};
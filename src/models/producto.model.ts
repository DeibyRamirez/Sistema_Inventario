// src/models/product.model.ts

export interface IProducto {
    id_producto: number;
    negocio_id: number;
    categoria_id: number | null;
    proveedor_id: number | null;
    nombre: string;
    codigo_barras?: string;
    precio_venta: number;
    stock_actual: number;
    activo: boolean; // Para el Soft Delete que hablamos
}

// También puedes definir interfaces para las peticiones (Body)
export interface ICrearProductoDTO {
    categoria_id?: number;
    nombre: string;
    precio_venta: number;
    stock_actual: number;
}
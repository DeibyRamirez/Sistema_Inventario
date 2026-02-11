// src/models/venta.model.ts

export interface IVenta {
    id_venta: number;
    negocio_id: number;
    usuario_id?: number;
    total: number;
    descuento?: number;
    tipo_pago?: string;
    fecha: Date;
}

export interface IVentaDTO {
    negocio_id: number;
    usuario_id: number;
    tipo_pago?: string;
    descuento?: number;
    productos: {
        producto_id: number;
        cantidad: number;
        precio_unitario: number;
    }[];
}

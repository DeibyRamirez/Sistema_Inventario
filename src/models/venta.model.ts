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

// También puedes definir interfaces para las peticiones (Body)
export interface IVentaDTO {
    negocio_id: number;
    total: number;
    fecha: Date;
}
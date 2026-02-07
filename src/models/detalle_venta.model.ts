// src/models/detalle_venta.model.ts

export interface IDetalle_venta {
    id_detalle: number;
    venta_id: number;
    producto_id?: number;
    cantidad: number;
    precio_unitario_momento?: number;
}

// También puedes definir interfaces para las peticiones (Body)
export interface IDetalle_ventaDTO {
    id_compra: number;
    negocio_id: number;
    tola_compra: number;
}
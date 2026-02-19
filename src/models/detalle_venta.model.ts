// src/models/detalle_venta.model.ts

export interface IDetalle_venta {
    id_detalle: number;
    venta_id: number;
    producto_id?: number;
    cantidad: number;
    precio_unitario_momento?: number;
}

// src/models/compra.model.ts

export interface ICompra {
    id_compra: number;
    negocio_id: number;
    proveedor_id?: number;
    total_compra?: number;
    fecha?: Date;
}

// También puedes definir interfaces para las peticiones (Body)
export interface ICompraDTO {
    id_compra: number;
    negocio_id: number;
    tola_compra: number;
}
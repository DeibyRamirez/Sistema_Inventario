// src/models/compra.model.ts

export interface ICompra {
    id_compra: number;
    negocio_id: number;
    proveedor_id: number;
    total_compra: number;
    fecha: Date;
}


// También puedes definir interfaces para las peticiones (Body)
export interface ICompraDTO {
    negocio_id: number;
    proveedor_id: number;
    productos: {
        producto_id: number;
        cantidad: number;
        precio_unitario: number;
    }[];
}

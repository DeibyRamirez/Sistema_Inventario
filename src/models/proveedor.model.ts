// src/models/product.model.ts

export interface IProveedor {
    id_proveedor: number;
    negocio_id: number | null;
    nombre: string;
    contacto?: string;
    nit_proveedor?: string;
    activo: boolean; // Para el Soft Delete que hablamos
}

// También puedes definir interfaces para las peticiones (Body)
export interface IProveedorDTO {
    nombre: string;
    contacto: string;
}
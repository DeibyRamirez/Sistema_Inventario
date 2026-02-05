// src/models/product.model.ts

export interface INegocio {
    id_negocio: number;
    nombre: string;
    nit?: string;
    direccion?: string;
    telefono: string;
    logo_url: string;
    activo: boolean; // Para el Soft Delete que hablamos
    created_at?: Date;
    updated_at?: Date;
}

// También puedes definir interfaces para las peticiones (Body)
export interface INegocioDTO {
    nombre: string;
    direccion: string;
    telefono: string;
}
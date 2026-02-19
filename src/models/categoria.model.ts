// src/models/categoria.model.ts

export interface ICategoria {
    id_categoria: number;
    negocio_id: number;
    nombre: string;
    descripcion?: string;
    activo: boolean; // Para el Soft Delete que hablamos
}

// También puedes definir interfaces para las peticiones (Body)
export interface ICategoriaDTO {
    negocio_id: number;
    nombre: string;
}
// src/models/product.model.ts

export interface IUsuario {
    id_usuario: number;
    negocio_id?: number | null;
    nombre: string;
    email?: string;
    password?: string;
    rol: string;
    activo: boolean; // Para el Soft Delete que hablamos
    created_at?: Date;
}

// También puedes definir interfaces para las peticiones (Body)
export interface IUsuarioDTO {
    nombre: string;
    email: string;
    password: string;
    rol: string;
}
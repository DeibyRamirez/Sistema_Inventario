// src/models/auditoria.model.ts

export interface IAuditoria {
  id_auditoria: number;
  negocio_id: number;
  usuario_id: number;
  accion: string;
  metodo_http: string;
  ip_address: string;
  fecha: Date;
}

// DTO para crear auditoría
export interface IAuditoriaCreateDTO {
  negocio_id: number;
  usuario_id: number;
  accion: string;
  metodo_http: string;
  ip_address: string;
}

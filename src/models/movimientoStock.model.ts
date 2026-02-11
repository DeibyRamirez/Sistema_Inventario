// src/models/movimientoStock.model.ts

export interface IMovimientoStock {
  id_movimiento: number;
  negocio_id: number;
  producto_id: number;
  tipo: "entrada" | "salida";
  motivo: string;
  cantidad: number;
  fecha: Date;
}

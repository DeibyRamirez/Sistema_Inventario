// src/repositories/movimientoStock.repository.ts

import { IMovimientoStockCreateDTO } from "../models/movimientoStock.model";
import { query } from "../config/db";

export const MovimientoStockRepository = {

  registrar: async (data: IMovimientoStockCreateDTO) => {
    const sql = `
      INSERT INTO movimientos_stock (
        negocio_id,
        producto_id,
        tipo,
        motivo,
        cantidad
      )
      VALUES ($1, $2, $3, $4, $5);
    `;

    const values = [
      data.negocio_id,
      data.producto_id,
      data.tipo,
      data.motivo,
      data.cantidad
    ];

    await query(sql, values);
  },

  listarPorProducto: async (producto_id: number) => {
    const sql = `
      SELECT *
      FROM movimientos_stock
      WHERE producto_id = $1
      ORDER BY fecha DESC;
    `;
    const result = await query(sql, [producto_id]);
    return result.rows;
  }
};

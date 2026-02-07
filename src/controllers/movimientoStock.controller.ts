// src/controllers/movimientoStock.controller.ts

import { Request, Response } from "express";
import { MovimientoStockService } from "src/services/movimientoStock.service";

export const getMovimientosStock = async (req: Request, res: Response) => {
  try {
    const { producto_id } = req.params;

    const movimientos = await MovimientoStockService.listarPorProducto(
      Number(producto_id)
    );

    res.status(200).json(movimientos);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener movimientos de stock",
      error: String(error)
    });
  }
};

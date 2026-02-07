// src/services/movimientoStock.service.ts

import { IMovimientoStockCreateDTO } from "../models/movimientoStock.model";
import { MovimientoStockRepository } from "../repositories/movimientoStock.repository";

export const MovimientoStockService = {

  registrarMovimiento: async (data: IMovimientoStockCreateDTO) => {
    if (data.cantidad <= 0) {
      throw new Error("La cantidad debe ser mayor a cero");
    }

    await MovimientoStockRepository.registrar(data);
  },

  listarPorProducto: async (producto_id: number) => {
    return await MovimientoStockRepository.listarPorProducto(producto_id);
  }
};

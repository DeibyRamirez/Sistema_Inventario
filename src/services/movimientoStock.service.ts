// src/services/movimientoStock.service.ts

import { IMovimientoStockCreateDTO } from "src/models/movimientostock.model";
import { MovimientoStockRepository } from "src/repositories/movimientoStock.repository";

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

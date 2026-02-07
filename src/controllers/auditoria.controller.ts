// src/controllers/auditoria.controller.ts

import { Request, Response } from "express";
import { AuditoriaService } from "src/services/auditoria.service";

export const getAuditoria = async (req: Request, res: Response) => {
  try {
    const negocio_id = 1; // luego vendrá del JWT

    const auditoria = await AuditoriaService.listarPorNegocio(negocio_id);
    res.status(200).json(auditoria);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener auditoría",
      error: String(error)
    });
  }
};

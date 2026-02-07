// src/services/auditoria.service.ts

import { AuditoriaRepository } from "src/repositories/auditoria.repository";
import { IAuditoriaCreateDTO } from "src/models/auditoria.model";

export const AuditoriaService = {

  registrar: async (data: IAuditoriaCreateDTO) => {
    // Aquí podrías filtrar acciones sensibles o enriquecer el mensaje
    await AuditoriaRepository.create(data);
  },

  listarPorNegocio: async (negocio_id: number) => {
    return await AuditoriaRepository.findByNegocio(negocio_id);
  }
};

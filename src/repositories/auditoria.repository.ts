// src/repositories/auditoria.repository.ts

import { query } from "../config/db";
import { IAuditoriaCreateDTO } from "src/models/auditoria.model";

export const AuditoriaRepository = {

  create: async (data: IAuditoriaCreateDTO) => {
    const sql = `
      INSERT INTO auditoria (
        negocio_id,
        usuario_id,
        accion,
        metodo_http,
        ip_address
      )
      VALUES ($1, $2, $3, $4, $5);
    `;

    const values = [
      data.negocio_id,
      data.usuario_id,
      data.accion,
      data.metodo_http,
      data.ip_address
    ];

    await query(sql, values);
  },

  findByNegocio: async (negocio_id: number) => {
    const sql = `
      SELECT *
      FROM auditoria
      WHERE negocio_id = $1
      ORDER BY fecha DESC;
    `;
    const result = await query(sql, [negocio_id]);
    return result.rows;
  }
};

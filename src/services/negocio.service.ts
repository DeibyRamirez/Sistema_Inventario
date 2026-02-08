import { NegocioRepositorio } from "../repositories/negocio.repository";


export const NegocioSevice = {

  listaNegocios: async () => {
    return await NegocioRepositorio.findAll();
  },

  crearNegocios: async (data: any) => {
    return await NegocioRepositorio.create(data);
  },

  editarNegocios: async (id_negocio: number, data: any) => {
    return await NegocioRepositorio.update(id_negocio, data);
  },

  eliminarNegocios: async (id_negocio: number) => {
    return await NegocioRepositorio.delete(id_negocio);
  }
};

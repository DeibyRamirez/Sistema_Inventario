import { CompraRepositorio } from "../repositories/compra.repository";


export const CompraSevice = {
    
    listacompras: async (negocio_id: number) => {
        return await CompraRepositorio.findAll(negocio_id);
    },

    crearcompras: async (body: any, usuario_id: number) => {
        return await CompraRepositorio.create(body, usuario_id);
    }
}
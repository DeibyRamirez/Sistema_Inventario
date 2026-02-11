import { CompraRepositorio } from "../repositories/compra.repository";


export const CompraSevice = {
    
    listacompras: async () => {
        return await CompraRepositorio.findAll();
    },

    crearcompras: async (body: any) => {
        return await CompraRepositorio.create(body);
    }
}
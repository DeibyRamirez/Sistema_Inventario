import { CompraRepositorio } from "../repositories/compra.repository";


export const CompraSevice = {
    
    listacompras: async () => {
        return await CompraRepositorio.findAll();
    }
}
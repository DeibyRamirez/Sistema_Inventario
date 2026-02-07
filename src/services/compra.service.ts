import { CompraRepositorio } from "src/repositories/compra.repository";


export const CompraSevice = {
    
    listacompras: async () => {
        return await CompraRepositorio.findAll();
    }
}
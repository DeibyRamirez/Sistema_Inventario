import { NegocioRepositorio } from "src/repositories/negocio.repository";


export const NegocioSevice = {
    
    listaNegocios: async () => {
        return await NegocioRepositorio.findAll();
    }
}
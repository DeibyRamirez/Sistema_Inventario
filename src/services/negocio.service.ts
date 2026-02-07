import { NegocioRepositorio } from "../repositories/negocio.repository";


export const NegocioSevice = {
    
    listaNegocios: async () => {
        return await NegocioRepositorio.findAll();
    }
}
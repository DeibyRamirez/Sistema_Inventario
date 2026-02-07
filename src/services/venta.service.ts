import { VentaRepositorio } from "../repositories/venta.repository";


export const VentaSevice = {
    
    listaVentas: async () => {
        return await VentaRepositorio.findAll();
    }
}
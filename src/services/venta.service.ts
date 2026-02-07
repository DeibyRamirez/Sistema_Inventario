import { VentaRepositorio } from "src/repositories/venta.repository";


export const VentaSevice = {
    
    listaVentas: async () => {
        return await VentaRepositorio.findAll();
    }
}
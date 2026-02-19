import { Detalle_ventaRepositorio } from "../repositories/detalle_venta.repository";

export const DetallesVentaSevice = {
    
    listaDetallesVenta: async () => {
        return await Detalle_ventaRepositorio.findAll();
    }
}
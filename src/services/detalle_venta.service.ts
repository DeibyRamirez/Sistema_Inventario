import { Detalle_ventaRepositorio } from "src/repositories/detalle_venta.repository";
import { NegocioRepositorio } from "src/repositories/negocio.repository";


export const DetallesVentaSevice = {
    
    listaDetallesVenta: async () => {
        return await Detalle_ventaRepositorio.findAll();
    }
}
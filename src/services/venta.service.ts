import { VentaRepositorio } from "../repositories/venta.repository";


export const VentaSevice = {
    
    listaVentas: async (negocio_id: number) => {
        return await VentaRepositorio.findAll(negocio_id);
    },

    crearVentas: async (body: any) => {
        if (!body.productos || body.productos.legth === 0) {
            throw new Error("La venta debe tener productos");
        }
        return await VentaRepositorio.create(body);
    }
};
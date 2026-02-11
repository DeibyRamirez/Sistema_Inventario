import { VentaRepositorio } from "../repositories/venta.repository";


export const VentaSevice = {
    
    listaVentas: async () => {
        return await VentaRepositorio.findAll();
    },

    crearVentas: async (body: any) => {
        if (!body.productos || body.productos.legth === 0) {
            throw new Error("La venta debe tener productos");
        }
        return await VentaRepositorio.create(body);
    }
};
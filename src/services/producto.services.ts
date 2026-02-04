import { ProductoRepositorio } from "../repositories/producto.repository"

export const ProductoSevice = {
    
    listaProductos: async (negocio_id: number) => {
        return await ProductoRepositorio.findAll(negocio_id);
    }
}
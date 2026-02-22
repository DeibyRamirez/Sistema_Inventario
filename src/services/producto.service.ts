import { ProductoRepositorio } from "../repositories/producto.repository"

export const ProductoSevice = {
    
    listaProductos: async (negocio_id: number) => {
        return await ProductoRepositorio.findAll(negocio_id);
    },

    crearProductos: async (body: any) => {
        return await ProductoRepositorio.create(body);
    },

    editarProductos: async (id_producto: number, body: any, negocio_id: number) => {
        return await ProductoRepositorio.update(id_producto, body, negocio_id);
    },

    eliminarProductos: async (id_producto: number, negocio_id: number) => {
        return await ProductoRepositorio.delete(id_producto, negocio_id);
    },

}
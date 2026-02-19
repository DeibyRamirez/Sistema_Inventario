import { ProveedorRepositorio } from "../repositories/proveedor.repository";


export const ProveedorSevice = {
    
    listaProveedores: async () => {
        return await ProveedorRepositorio.findAll();
    },

    listaProveedoresFiltrada: async (negocio_id: number) => {
        return await ProveedorRepositorio.findAllfiltrado(negocio_id);
    },

    crearProveedores: async (body: any) => {
        return await ProveedorRepositorio.create(body);
    },

    editarProveedores: async (id_proveedor: number, body: any) => {
        return await ProveedorRepositorio.update(id_proveedor, body);
    },

    eliminarProveedores: async (id_proveedor: number) => {
        return await ProveedorRepositorio.delete(id_proveedor);
    }
}
import { ProveedorRepositorio } from "../repositories/proveedor.repository";


export const ProveedorSevice = {
    
    listaProveedores: async (negocio_id: number) => {
        return await ProveedorRepositorio.findAll(negocio_id);
    }
}
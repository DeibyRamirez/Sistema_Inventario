import { UsuarioRepositorio } from "../repositories/usuario.repository";


export const UsuarioSevice = {
    
    listaUsuarios: async () => {
        return await UsuarioRepositorio.findAll();
    },

    listaUsuariosNegocio: async (negocio_id: number) => {
        return await UsuarioRepositorio.findAllNegocio(negocio_id);
    }
}
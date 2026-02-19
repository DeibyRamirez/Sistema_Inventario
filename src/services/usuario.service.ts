import { UsuarioRepositorio } from "../repositories/usuario.repository";


export const UsuarioSevice = {
    
    listaUsuarios: async () => {
        return await UsuarioRepositorio.findAll();
    },

    listaUsuariosNegocio: async (negocio_id: number) => {
        return await UsuarioRepositorio.findAllNegocio(negocio_id);
    },

    crearUsuarios: async (data: any) => {
        return await UsuarioRepositorio.create(data);
    },

    editarUsuarios: async (id_usuario: number, data: any) => {
        return await UsuarioRepositorio.update(id_usuario,data);
    },

    eliminarUsuarios: async (id_usuario: number) => {
        return await UsuarioRepositorio.delete(id_usuario);
    },
}
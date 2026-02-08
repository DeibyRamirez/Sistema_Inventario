import { CategoriaRepositorio } from "../repositories/categoria.repository";


export const CategoriaSevice = {
    
    listaCategorias: async () => {
        return await CategoriaRepositorio.findAll();
    },

    listaCategoriasNegocio: async (negocio_id: number) => {
        return await CategoriaRepositorio.findAllCatagoriasNegocio(negocio_id);
    },

    crearCategorias: async (data: any) => {
        return await CategoriaRepositorio.create(data);
    },

    editarCategorias: async (id_categoria: number, data: any) => {
        return await CategoriaRepositorio.update(id_categoria, data);
    },

    eliminarCategorias: async (id_categoria: number) => {
        return await CategoriaRepositorio.delete(id_categoria);
    },
}
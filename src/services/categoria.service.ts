import { CategoriaRepositorio } from "src/repositories/categoria.repository";


export const CategoriaSevice = {
    
    listaCategorias: async () => {
        return await CategoriaRepositorio.findAll();
    },

    listaCategoriasNegocio: async (negocio_id: number) => {
        return await CategoriaRepositorio.findAllCatagoriasNegocio(negocio_id);
    }
}
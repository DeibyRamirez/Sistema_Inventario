import { Response, Request } from "express";
import { CategoriaSevice } from "../services/categoria.service";

export const getCategorias = async (req: Request, res: Response) => {

    
    try {
        
        const categorias = await CategoriaSevice.listaCategorias();
        
        res.status(200).json(categorias);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener categorias", error: String(error) });
    }
};

export const postCategorias = async (req: Request, res: Response) => {

    
    try {
        const data = req.params;
        const categorias = await CategoriaSevice.crearCategorias(data);
        
        res.status(200).json(categorias);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener categorias", error: String(error) });
    }
};

export const putCategorias = async (req: Request, res: Response) => {

    
    try {

        const { id_categoria } = req.params;
        const data = req.body;
        const categorias = await CategoriaSevice.editarCategorias(Number(id_categoria), data);
        
        res.status(200).json(categorias);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener categorias", error: String(error) });
    }
};

export const deleteCategorias = async (req: Request, res: Response) => {

    
    try {
        const {id_categoria} = req.params;
        
        const categorias = await CategoriaSevice.eliminarCategorias(Number(id_categoria));
        
        res.status(200).json(categorias);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener categorias", error: String(error) });
    }
};
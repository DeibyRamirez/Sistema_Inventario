import { Response, Request } from "express";
import { CategoriaSevice } from "../services/categoria.service";

export const getCategorias = async (req: Request, res: Response) => {

    const negocio_id = 1
    try {
        // Log para ver si el usuario llega bien
        // console.log("Usuario en la petición:", req.user);

        // if (!req.user) {
        //     return res.status(401).json({ message: "No hay usuario autenticado" });
        // }

        // const { negocio_id } = req.user; 
        const categorias = await CategoriaSevice.listaCategorias();
        
        res.status(200).json(categorias);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener categorias", error: String(error) });
    }
};
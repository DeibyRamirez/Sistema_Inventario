import { Response, Request } from "express";
import { ProductoSevice } from "../services/producto.services";

export const getProductos = async (req: Request, res: Response) => {

    const negocio_id = 1
    try {
        // Log para ver si el usuario llega bien
        console.log("Usuario en la petición:", req.user);

        // if (!req.user) {
        //     return res.status(401).json({ message: "No hay usuario autenticado" });
        // }

        // const { negocio_id } = req.user; 
        const productos = await ProductoSevice.listaProductos(negocio_id);
        
        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener productos", error: String(error) });
    }
};
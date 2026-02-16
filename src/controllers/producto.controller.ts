import { Response, Request } from "express";
import { ProductoSevice } from "../services/producto.service";

export const getProductos = async (req: Request, res: Response) => {

    try {
        const { id_negocio } = req.params;
        const productos = await ProductoSevice.listaProductos(Number(id_negocio));
        
        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener productos", error: String(error) });
    }
};

export const postProductos = async (req: Request, res: Response) => {

    try {
        const body = req.body;
        const productos = await ProductoSevice.crearProductos(body);
        
        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al crear productos", error: String(error) });
    }
};

export const putProductos = async (req: Request, res: Response) => {

    try {
        // Cuando usamos el  {id_producto} en la ruta, lo recibimos por req.params y cuando usamos el body, lo recibimos por req.body
        // Si usamos el {body} en la ruta, lo recibimos por req.params y el id_producto por req.body, pero eso no es lo común
        // Por eso es importante estandarizar que los IDs siempre vengan por params y los datos por body, así el código es más predecible

        const { id_producto } = req.params;
        const  body  = req.body;
        const productos = await ProductoSevice.editarProductos(Number(id_producto), body);
        
        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al editar productos", error: String(error) });
    }
};

export const deleteProductos = async (req: Request, res: Response) => {

    try {
        const { id_producto } = req.params;
        const productos = await ProductoSevice.eliminarProductos(Number(id_producto));
        
        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al eliminar productos", error: String(error) });
    }
};
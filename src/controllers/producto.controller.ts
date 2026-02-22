import { Response, Request } from "express";
import { ProductoSevice } from "../services/producto.service";

export const getProductos = async (req: Request, res: Response) => {

    try {
        if (!req.user) {
            return res.status(401).json({ message: "No autorizado" });
        }
        const { negocio_id } = req.user;
        const productos = await ProductoSevice.listaProductos(negocio_id);
        
        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener productos", error: String(error) });
    }
};

export const postProductos = async (req: Request, res: Response) => {

    try {
        if (!req.user) {
            return res.status(401).json({ message: "No autorizado" });
        }
        const { negocio_id } = req.user;
        const body = { ...req.body, negocio_id }; // Force negocio_id from token
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

        if (!req.user) {
            return res.status(401).json({ message: "No autorizado" });
        }
        const { negocio_id } = req.user;
        const { id_producto } = req.params;
        const body = req.body;
        
        // Pass negocio_id to service to ensure ownership check
        const productos = await ProductoSevice.editarProductos(Number(id_producto), body, negocio_id);
        
        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al editar productos", error: String(error) });
    }
};

export const deleteProductos = async (req: Request, res: Response) => {

    try {
        if (!req.user) {
            return res.status(401).json({ message: "No autorizado" });
        }
        const { negocio_id } = req.user;
        const { id_producto } = req.params;
        const productos = await ProductoSevice.eliminarProductos(Number(id_producto), negocio_id);
        
        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al eliminar productos", error: String(error) });
    }
};
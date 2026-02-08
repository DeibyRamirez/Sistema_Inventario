import { Response, Request } from "express";
import { ProveedorSevice } from "../services/proveedor.service";


export const getProveedores = async (req: Request, res: Response) => {

    const negocio_id = 1
    try {
        
        const proveedores = await ProveedorSevice.listaProveedores(negocio_id);
        
        res.status(200).json(proveedores);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener proveedores", error: String(error) });
    }
};

export const postProveedores = async (req: Request, res: Response) => {

    
    try {
        const body = req.params;
        const proveedores = await ProveedorSevice.crearProveedores(body);
        
        res.status(200).json(proveedores);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener proveedores", error: String(error) });
    }
};

export const putProveedores = async (req: Request, res: Response) => {

    
    try {
        const { id_proveedor } = req.params;
        const body = req.params;
        const proveedores = await ProveedorSevice.editarProveedores(Number(id_proveedor), body);
        
        res.status(200).json(proveedores);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener proveedores", error: String(error) });
    }
};

export const deleteProveedores = async (req: Request, res: Response) => {

    
    try {

        const { id_proveedor } = req.params;
        const proveedores = await ProveedorSevice.eliminarProveedores(Number(id_proveedor));
        
        res.status(200).json(proveedores);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener proveedores", error: String(error) });
    }
};
import { Response, Request } from "express";
import { DetallesVentaSevice } from "src/services/detalle_venta.service";
import { NegocioSevice } from "src/services/negocio.service";

export const getDetallesVenta = async (req: Request, res: Response) => {

    try {
        // Log para ver si el usuario llega bien
        console.log("Usuario en la petición:", req.user);

        // if (!req.user) {
        //     return res.status(401).json({ message: "No hay usuario autenticado" });
        // }

        // const { negocio_id } = req.user; 
        const detalles_venta = await DetallesVentaSevice.listaDetallesVenta();
        
        res.status(200).json(detalles_venta);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener detallesVenta", error: String(error) });
    }
};
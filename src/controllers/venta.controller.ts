import { Response, Request } from "express";
import { VentaSevice } from "../services/venta.service";
import { IVentaDTO } from "src/models/venta.model";

export const getVentas = async (req: Request, res: Response) => {

    
    try {

        const { negocio_id } = req.params;
        
        const ventas = await VentaSevice.listaVentas(Number(negocio_id));

        res.status(200).json(ventas);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener ventas", error: String(error) });
    }
};

export const postVentas = async (req: Request, res: Response) => {


    try {
        const body: IVentaDTO = req.body;

        const venta = await VentaSevice.crearVentas({
            ...body,
        });

        res.status(201).json(venta);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener ventas", error: String(error) });
    }
};
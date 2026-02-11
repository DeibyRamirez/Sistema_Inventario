import { Response, Request } from "express";
import { CompraSevice } from "../services/compra.service";
import { ICompraDTO } from "../models/compra.model";

export const getCompras = async (req: Request, res: Response) => {

    try {

        const compras = await CompraSevice.listacompras();

        res.status(200).json(compras);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({
            message: "Error al obtener compras",
            error: String(error)
        });
    }
};

export const postCompras = async (req: Request, res: Response) => {

    try {

        const body: ICompraDTO = req.body;

        // 🔥 TEMPORAL hasta que implementes JWT
        const usuario_id = 1;

        const compra = await CompraSevice.crearcompras({
            ...body,
            usuario_id
        });

        res.status(201).json(compra);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({
            message: "Error al registrar compra",
            error: String(error)
        });
    }
};

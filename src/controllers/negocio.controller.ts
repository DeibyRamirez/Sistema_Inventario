import { Response, Request } from "express";
import { NegocioSevice } from "../services/negocio.service";

export const getNegocios = async (req: Request, res: Response) => {

    try {
    
        const negocios = await NegocioSevice.listaNegocios();
        
        res.status(200).json(negocios);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener negocios", error: String(error) });
    }
};

export const postNegocios = async (req: Request, res: Response) => {

    try {
        const data = req.body;

        const negocios = await NegocioSevice.crearNegocios(
            data
        );
        
        res.status(200).json(negocios);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener negocios", error: String(error) });
    }
};

export const putNegocios = async (req: Request, res: Response) => {
  try {
    const { id_negocio } = req.params;
    const data = req.body;

    const negocio = await NegocioSevice.editarNegocios(
      Number(id_negocio),
      data
    );

    res.status(200).json(negocio);
  } catch (error) {
    res.status(500).json({ message: "Error al editar negocio", error });
  }
};


export const deleteNegocios = async (req: Request, res: Response) => {

    try {
        
        const { id_negocio } = req.params;
        const negocios = await NegocioSevice.eliminarNegocios(
            Number(id_negocio),
        );
        
        res.status(200).json(negocios);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener negocios", error: String(error) });
    }
};
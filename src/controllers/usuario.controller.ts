import { Response, Request } from "express";
import { UsuarioSevice } from "../services/usuario.service";

export const getUsuarios = async (req: Request, res: Response) => {


    try {
        const productos = await UsuarioSevice.listaUsuarios();

        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener usuarios", error: String(error) });
    }
};

export const postUsuarios = async (req: Request, res: Response) => {


    try {
        const data = req.body;
        const productos = await UsuarioSevice.crearUsuarios(data);

        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener usuarios", error: String(error) });
    }
};

export const putUsuarios = async (req: Request, res: Response) => {


    try {
        const { id_usuario } = req.params;
        const data = req.body;
        const productos = await UsuarioSevice.editarUsuarios(
            Number(id_usuario),
            data
        );

        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener usuarios", error: String(error) });
    }
};

export const deleteUsuarios = async (req: Request, res: Response) => {


    try {
        const { id_usuario} = req.params;

        const productos = await UsuarioSevice.eliminarUsuarios(Number(id_usuario));

        res.status(200).json(productos);

    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); // <-- ESTO TE DIRÁ LA VERDAD
        res.status(500).json({ message: "Error al obtener usuarios", error: String(error) });
    }
};
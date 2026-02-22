import { Request, Response, NextFunction } from "express";
import { verificarToken } from '../utils/jwt';

// Define qué datos esperas que vengan en el Token
export interface UserPayload {
    id_usuario: number;
    negocio_id: number;
    rol: string;
    permisos?: string[]; // Array de permisos granulares ej: ['ventas.crear', 'productos.leer']
}

declare global {
    namespace Express {
        interface Request {
            // En lugar de any, usa tu interface
            user?: UserPayload;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(' ')[1]; // Extrae el token del formato "Bearer

    try {
        const decoded = verificarToken(token) as UserPayload; // Verifica el token y castea al tipo esperado
        req.user = decoded; // Almacena la información del usuario en la solicitud

        console.log("DECODED TOKEN:", decoded);
        

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalido" });
    }
};
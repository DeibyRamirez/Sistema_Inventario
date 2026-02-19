import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

// Define qué datos esperas que vengan en el Token
interface UserPayload {
    id_usuario: number;
    negocio_id: number;
    rol: string;
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
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(403).json({ message: "El token no fue proporcionado"});

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as any;
        
        // Inyectamos la info del usuario y su negocio en la petición
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message: "Token invalido"});
    }
};
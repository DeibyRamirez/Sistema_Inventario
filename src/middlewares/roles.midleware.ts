import { Request, Response, NextFunction } from "express";

export const authorizeRoles = (...rolesPermitidos: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const user = req.user; // viene del verifyToken

        if (!user) {
            return res.status(401).json({ message: "No autenticado" });
        }

        if (!rolesPermitidos.includes(user.rol)) {
            return res.status(403).json({ message: "No tienes permisos para esta acción" });
        }

        next();
    };
};
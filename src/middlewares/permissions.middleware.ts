import { Request, Response, NextFunction } from "express";

export const authorizePermissions = (requiredPermission: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "No autenticado" });
        }

        // Si es admin o dueño, tiene acceso total (bypass)
        if (user.rol === 'admin' || user.rol === 'dueño') {
            return next();
        }

        // Verificar permisos granulares
        // Asumimos que user.permisos es un array de strings ej: ['ventas.crear', 'productos.editar']
        // O un array de permisos en base de datos.
        // Nota: Necesitamos asegurarnos que 'permisos' venga en el token o consultarlo aquí.
        // Por rendimiento, lo ideal es que venga en el token (si no son muchos).
        
        const userPermissions = user.permisos || [];

        if (userPermissions.includes(requiredPermission)) {
            return next();
        }

        return res.status(403).json({ 
            message: `No tienes el permiso necesario: ${requiredPermission}` 
        });
    };
};

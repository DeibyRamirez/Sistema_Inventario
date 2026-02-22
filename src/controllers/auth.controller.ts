import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { query } from "../config/db";
import { generarToken } from "../utils/jwt";


// Controlador de autenticación - Maneja el login de usuarios
export const login = async (req: Request, res: Response) => {
    try {
        // Extrae email y password del cuerpo de la solicitud
        const { email, password } = req.body;

        // Busca el usuario en la base de datos por email
        const result = await query(
            "SELECT * FROM usuarios WHERE email = $1", [email]
        );

        // Obtiene el primer resultado (usuario encontrado)
        const usuario = result.rows[0];

        // Valida si el usuario existe
        if (!usuario) {
            return res.status(401).json({ message: "Credenciales inválidas o Usuario no exitente" });
        }

        // Compara la contraseña ingresada con la contraseña hasheada en la BD
        const passwordValidao = await bcrypt.compare(password, usuario.password);

        // Valida si la contraseña es correcta
        if (!passwordValidao) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // Genera un token JWT con la información del usuario
        const token = generarToken({
            id_usuario: usuario.id_usuario,
            negocio_id: usuario.negocio_id,
            rol: usuario.rol,
            permisos: usuario.permisos || [] // Include granular permissions
        });
        

        // Responde con el token generado
        res.json({ token });
        
    } catch (error) {
        // Captura y registra errores en la consola
        console.error("Error en login:", error);
        // Responde con error 500 en caso de error interno
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
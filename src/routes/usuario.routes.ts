import { Router } from 'express';
import { getUsuarios } from '../controllers/usuario.controller';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getUsuarios); 

// Exportamos el objeto router por defecto
export default router;
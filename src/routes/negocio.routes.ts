import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.midleware';
import { getNegocios } from 'src/controllers/negocio.controller';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getNegocios); 

// Exportamos el objeto router por defecto
export default router;
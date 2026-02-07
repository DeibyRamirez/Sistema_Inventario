import { Router } from 'express';
import { getNegocios } from '../controllers/negocio.controller';


const router = Router();

// GET /api/negocios -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getNegocios); 

// Exportamos el objeto router por defecto
export default router;
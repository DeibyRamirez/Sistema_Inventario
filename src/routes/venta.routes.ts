import { Router } from 'express';
import { getVentas, postVentas } from '../controllers/venta.controller';
import { verifyToken } from '../middlewares/auth.midleware';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/:negocio_id', verifyToken, getVentas); 
router.post('/', verifyToken, postVentas); 

// Exportamos el objeto router por defecto
export default router;
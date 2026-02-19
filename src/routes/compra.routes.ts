import { Router } from 'express';
import { getCompras, postCompras } from '../controllers/compra.controller';
import { verifyToken } from '../middlewares/auth.midleware';


const router = Router();

// GET /api/compras -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/:negocio_id', verifyToken, getCompras); 
router.post('/', verifyToken, postCompras); 

// Exportamos el objeto router por defecto
export default router;
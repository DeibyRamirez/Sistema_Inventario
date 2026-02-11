import { Router } from 'express';
import { getVentas, postVentas } from '../controllers/venta.controller';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getVentas); 
router.post('/', postVentas); 

// Exportamos el objeto router por defecto
export default router;
import { Router } from 'express';
import { deleteProductos, getProductos, postProductos, putProductos } from '../controllers/producto.controller';
import { verifyToken } from '../middlewares/auth.midleware';



const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/:id_negocio', verifyToken, getProductos); 
router.post('/', verifyToken, postProductos); 
router.put('/:id_producto', verifyToken, putProductos); 
router.delete('/:id_producto', verifyToken, deleteProductos);

// Exportamos el objeto router por defecto
export default router;
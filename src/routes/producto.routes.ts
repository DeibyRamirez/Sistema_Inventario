import { Router } from 'express';
import { deleteProductos, getProductos, postProductos, putProductos } from '../controllers/producto.controller';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/:id_negocio', getProductos); 
router.post('/', postProductos); 
router.put('/:id_producto', putProductos); 
router.delete('/:id_producto', deleteProductos);

// Exportamos el objeto router por defecto
export default router;
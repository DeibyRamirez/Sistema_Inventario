import { Router } from 'express';
import { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } from '../controllers/usuario.controller';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getUsuarios); 
router.post('/', postUsuarios); 
router.put('/:id_usuario', putUsuarios); 
router.delete('/:id_usuario', deleteUsuarios); 

// Exportamos el objeto router por defecto
export default router;
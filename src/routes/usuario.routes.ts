import { Router } from 'express';
import { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, getUsuariosNegocio } from '../controllers/usuario.controller';
import { verifyToken } from '../middlewares/auth.midleware';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', verifyToken, getUsuarios);
router.get('/:negocio_id', verifyToken, getUsuariosNegocio);  
router.post('/', verifyToken, postUsuarios); 
router.put('/:id_usuario', verifyToken, putUsuarios); 
router.delete('/:id_usuario',verifyToken, deleteUsuarios); 

// Exportamos el objeto router por defecto
export default router;
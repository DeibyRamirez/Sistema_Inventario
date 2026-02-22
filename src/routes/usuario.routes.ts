import { Router } from 'express';
import { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, getUsuariosNegocio } from '../controllers/usuario.controller';
import { verifyToken } from '../middlewares/auth.midleware';
import { authorizeRoles } from '../middlewares/roles.midleware';


const router = Router();

// GET /api/products -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', verifyToken, authorizeRoles("admin"), getUsuarios);
router.get('/:negocio_id', verifyToken, authorizeRoles("admin", "dueño"), getUsuariosNegocio);  
router.post('/', verifyToken, authorizeRoles("admin"), postUsuarios); 
router.put('/:id_usuario', verifyToken, authorizeRoles("admin"), putUsuarios); 
router.delete('/:id_usuario',verifyToken, authorizeRoles("admin"), deleteUsuarios); 

// Exportamos el objeto router por defecto
export default router;
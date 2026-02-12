import { Router } from 'express';
import { getNegocios, postNegocios, putNegocios, deleteNegocios, getOneNegocios } from '../controllers/negocio.controller';


const router = Router();

// GET /api/negocios -> Solo usuarios logueados (puedes quitar el comentario de verifyToken cuando tengas el login)
router.get('/', getNegocios); 
router.get('/:id_negocio', getOneNegocios);
router.post('/', postNegocios); 
router.put('/:id_negocio', putNegocios); 
router.delete('/:id_negocio', deleteNegocios); 

// Exportamos el objeto router por defecto
export default router;
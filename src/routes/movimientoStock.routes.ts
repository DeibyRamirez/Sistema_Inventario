// src/routes/movimientoStock.routes.ts

import { Router } from "express";
import { getMovimientosStock } from "../controllers/movimientoStock.controller";
import { authorizeRoles } from "../middlewares/roles.midleware";

const router = Router();

// Solo consulta
router.get("/:producto_id", authorizeRoles("admin", "dueño"), getMovimientosStock);

export default router;

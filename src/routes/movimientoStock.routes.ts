// src/routes/movimientoStock.routes.ts

import { Router } from "express";
import { getMovimientosStock } from "src/controllers/movimientoStock.controller";

const router = Router();

// Solo consulta
router.get("/:producto_id", getMovimientosStock);

export default router;

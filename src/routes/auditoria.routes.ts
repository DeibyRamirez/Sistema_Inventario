// src/routes/auditoria.routes.ts

import { Router } from "express";
import { getAuditoria } from "src/controllers/auditoria.controller";
// import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

// Solo lectura (admin)
router.get("/auditoria", getAuditoria);

export default router;

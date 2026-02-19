// src/routes/auditoria.routes.ts
import { Router } from "express";
import { getAuditoria } from "../controllers/auditoria.controller";

const router = Router();

// Solo lectura (admin)
router.get("/", getAuditoria);

export default router;

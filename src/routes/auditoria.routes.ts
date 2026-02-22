// src/routes/auditoria.routes.ts
import { Router } from "express";
import { getAuditoria } from "../controllers/auditoria.controller";
import { authorizeRoles } from "../middlewares/roles.midleware";

const router = Router();

// Solo lectura (admin)
router.get("/", authorizeRoles("admin"), getAuditoria);

export default router;

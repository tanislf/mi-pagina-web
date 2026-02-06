import { Router } from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import {
  getAllMessages,
  markMessageAsRead,
} from "../controllers/admin.controller.js";

const router = Router();

//listar mensajes
router.get("/", auth, isAdmin, getAllMessages);

//marcar como leído
router.patch("/:id", auth, isAdmin, markMessageAsRead);

export default router;

//REVISIÓN

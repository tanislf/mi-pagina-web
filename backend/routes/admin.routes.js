import { Router } from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import {
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/admin.controller.js";

const router = Router();

//listar mensajes
router.get("/", auth, isAdmin, getAllMessages);

//marcar como leido
router.patch("/:id", auth, isAdmin, markMessageAsRead);

//borrar mensaje
router.delete("/:id", auth, isAdmin, deleteMessage);

export default router;

//REVISIÓN

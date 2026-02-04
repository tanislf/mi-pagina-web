import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  getAllMessages,
  markMessageAsRead,
} from "../controllers/admin.controller.js";

const router = Router();

//listar mensajes
router.get("/", auth, getAllMessages);

//marcar como leído
router.patch("/:id/read", auth, markMessageAsRead);

export default router;

//REVISION

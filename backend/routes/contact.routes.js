import { Router } from "express";
import createContactMessage from "../controllers/contact.controller.js";
import {
  getAllMessages,
  markMessageAsRead,
} from "../controllers/admin.controller.js";
import { ContactSchema } from "../models/Contact.js";
import { validate } from "../middlewares/validate.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = Router();

//contacto público
router.post("/", validate(ContactSchema), createContactMessage);

//admin
router.get("/", auth, isAdmin, getAllMessages);
router.patch("/:id", auth, isAdmin, markMessageAsRead);

export default router;

//REVISIÓN

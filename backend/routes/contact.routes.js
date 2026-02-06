import { Router } from "express";
import createContactMessage from "../controllers/contact.controller.js";
import { ContactSchema } from "../models/Contact.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

//contacto público
router.post("/", validate(ContactSchema), createContactMessage);

export default router;

//REVISIÓN

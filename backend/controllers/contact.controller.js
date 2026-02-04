import ContactMessage from "../models/ContactMessage.js";
import { ContactSchema } from "../models/Contact.js";

//Guardar mensajes
const createContactMessage = async (req, res) => {
  try {
    const data = ContactSchema.parse(req.body);

    await ContactMessage.create(data);

    res.status(201).json({
      message: "Mensaje enviado correctamente",
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        errors: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }
  }

  res.status(500).json({ error: "Error del servidor" });
};

export default createContactMessage;

//REVISIÓN

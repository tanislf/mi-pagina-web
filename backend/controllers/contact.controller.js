import ContactMessage from "../models/ContactMessage.js";

//Guardar mensajes
const createContactMessage = async (req, res, next) => {
  try {
    const newMessage = await ContactMessage.create(req.body);

    res.status(201).json({
      message: "Mensaje enviado correctamente",
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};
export default createContactMessage;

//REVISIÓN

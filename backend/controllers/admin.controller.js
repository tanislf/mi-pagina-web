import ContactMessage from "../models/ContactMessage.js";

// obtener todos los mensajes
export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// marcar mensajes como leído
export const markMessageAsRead = async (req, res, next) => {
  try {
    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status: "leido" },
      { new: true },
    );

    if (!updatedMessage) {
      return res.status(404).json({
        error: "Mensaje no encontrado",
      });
    }

    res.json({
      message: "Mensaje marcado como leído",
      data: updatedMessage,
    });
  } catch (error) {
    next(error);
  }
};

//REVISION

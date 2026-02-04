import ContactMessage from "../models/ContactMessage.js";

//obtener todos los mensajes
export const getAllMessages = async (req, res) => {
  try {
    const message = (await ContactMessage.find()).toSorted({ createdAt: -1 });

    res.json(message);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener mensajes",
    });
  }
};

//marcar mensajes como leído
export const markMessageAsRead = async (req, res) => {
  try {
    await ContactMessage.findByIdAndUpdate(req.params.id, {
      status: "leido",
    });

    res.json({
      message: "Mensaje marcado como leído",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar mensaje",
    });
  }
};

//REVISION

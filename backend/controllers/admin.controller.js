import ContactMessage from "../models/ContactMessage.js";

// obtener todos los mensajes
export async function getAllMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    next(error);
  }
}

// marcar mensajes como leido
export async function markMessageAsRead(req, res, next) {
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
      message: "Mensaje marcado como leido",
      data: updatedMessage,
    });
  } catch (error) {
    next(error);
  }
}

// borrar mensaje
export async function deleteMessage(req, res, next) {
  try {
    const { id } = req.params;

    const deletedMessage = await ContactMessage.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ error: "Mensaje no encontrado" });
    }

    await deletedMessage.deleteOne();

    res.json({ message: "Mensaje eliminado", data: deletedMessage });
  } catch (error) {
    next(error);
  }
}

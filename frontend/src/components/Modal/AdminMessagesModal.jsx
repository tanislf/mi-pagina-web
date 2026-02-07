import { useEffect, useState } from "react";
import api from "../../utils/api.js";
import Modal from "./Modal.jsx";
import Loader from "../Animations/LoaderDots.jsx";
import DeleteMessage from "./DeleteMessageModal.jsx";

function AdminMessages({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    api
      .getMessages()
      .then(setMessages)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isOpen]);

  //cerrar modal de borrar mensaje
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setMessageToDelete(null);
  };

  //marcar mensajes como leidos
  const handleMarkAsRead = async (id) => {
    try {
      await api.markMessageAsRead(id);
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, status: "leido" } : msg)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  //borrar mensajes
  const handleDelete = async () => {
    if (!messageToDelete) return;

    try {
      await api.deleteMessage(messageToDelete);
      setMessages((prev) => prev.filter((msg) => msg._id !== messageToDelete));
      closeDeleteModal();
    } catch (err) {
      console.error("Error al eliminar mensaje:", err);
      alert(`Error al eliminar el mensaje: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DeleteMessage
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />

      <div className="admin-messages">
        <h2 className="admin-messages__title"> Mensajes de contacto</h2>

        {loading && <Loader />}
        {!loading && messages.length === 0 && (
          <p className="admin-messages__loading"> No hay mensajes aún</p>
        )}

        <ul className="admin-messages__list">
          {messages.map((msg) => (
            <li key={msg._id} className={`message message--${msg.status}`}>
              <header className="admin-messages__header">
                <h4 className="admin-messages__name">
                  {msg.name} - {msg.service} - {msg.budget} - {msg.difusion}
                </h4>
                <span className="admin-messages__status">{msg.status}</span>
              </header>

              <p className="admin-messages__text">{msg.message}</p>

              <footer className="admin-messages__footer">
                <div className="admin-messages__info">
                  <span className="admin-messages__text">
                    <strong>Email:</strong> {msg.email}
                  </span>
                  <span className="admin-messages__text">
                    <strong>Teléfono:</strong> {msg.phone}
                  </span>

                  <span className="admin-messages__text">
                    <strong>Fecha:</strong>{" "}
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="admin-messages__buttons">
                  <button
                    type="button"
                    className="admin-messages__button"
                    onClick={() => handleMarkAsRead(msg._id)}
                    disabled={msg.status !== "nuevo"}
                  >
                    Marcar como leído
                  </button>

                  <button
                    type="button"
                    className="admin-messages__button"
                    onClick={() => {
                      setMessageToDelete(msg._id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Borrar mensaje
                  </button>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export default AdminMessages;

//REVISIÓN

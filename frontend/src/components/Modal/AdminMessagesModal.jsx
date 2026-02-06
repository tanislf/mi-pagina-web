import { useEffect, useState } from "react";
import api from "../../utils/api.js";
import Modal from "./Modal.jsx";
import Loader from "../Animations/LoaderDots.jsx";

function AdminMessages({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    api
      .getMessages()
      .then(setMessages)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
                  {msg.message} - {msg.service}
                </h4>
                <span className="admin-messages__status">{msg.status}</span>
              </header>

              <p className="admin-messages__text">{msg.message}</p>

              <footer className="admin-messages__footer">
                <span className="admin-messages__text">{msg.email}</span>
                <span>{new Date(msg.createdAt).toLocaleDateString()}</span>

                <button
                  className="admin-messages__mark-btn"
                  onClick={() => handleMarkAsRead(msg._id)}
                  disabled={msg.status !== "nuevo"}
                >
                  Marcar como leído
                </button>
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

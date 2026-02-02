import { useState } from "react";
import api from "../../utils/api.js";
import { setToken } from "../../utils/token.js";
import Modal from "./Modal.jsx";

function AddAdminModal({ isOpen, onClose, onSuccess }) {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  //cerrar modal y resetear la info
  const handleClose = () => {
    setSecret("");
    setError("");
    onClose();
  };

  //logear el admin
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!secret.trim()) {
      setError("Ingresa la palabra secreta");
      return;
    }

    try {
      const { token } = await api.adminLogin(secret);
      setToken(token);
      onSuccess();
    } catch (err) {
      setError("¡Palabra Incorrecta!");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form className="admin__container" onSubmit={handleSubmit}>
        <p className="admin__text">Solo para el administrador de la página</p>

        <input
          className="admin__input"
          placeholder="Ingresa la palabra secreta"
          value={secret}
          onChange={(e) => {
            setSecret(e.target.value);
            if (error) setError("");
          }}
        />

        {error && <p className="admin__error">{error}</p>}

        <div className="admin__options">
          <button type="submit" className="admin__button">
            Confirmar
          </button>
          <button
            type="button"
            className="admin__button "
            onClick={handleClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddAdminModal;

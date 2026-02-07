import Modal from "./Modal";

function DeleteMessage({ isOpen, onClose, onConfirm }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="delete__form" onSubmit={handleSubmit}>
        <p className="delete__text">¿Segura que quieres eliminar el mensaje?</p>

        <div className="delete__buttons">
          <button className="delete__button" type="submit">
            Sí
          </button>
          <button className="delete__button" type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default DeleteMessage;

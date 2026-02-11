import Modal from "./Modal.jsx";

function ServicesModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="services-modal">
        <h1 className="services-title">¿Qué necesitas?</h1>
        <button type="button" className="services-modal__button">
          Programación y Diseño Web
        </button>
        <button type="button" className="services-modal__button">
          Ilustración
        </button>
        <button type="button" className="services-modal__button">
          Fotografía
        </button>
        <button type="button" className="services-modal__button">
          Edición digital
        </button>
      </div>
    </Modal>
  );
}

export default ServicesModal;

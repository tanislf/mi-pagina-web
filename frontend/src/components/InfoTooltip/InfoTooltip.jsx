import Modal from "../Modal/Modal";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="infotooltip__container">
        <div
          className={`infotooltip__logo ${
            isSuccess ? "infotooltip__logo_success" : "infotooltip__logo_fail"
          }`}
        />

        <p className="infotooltip__message">
          {isSuccess
            ? "¡Solicitud enviada! Me pondré en contacto contigo lo antes posible."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </Modal>
  );
}

export default InfoTooltip;

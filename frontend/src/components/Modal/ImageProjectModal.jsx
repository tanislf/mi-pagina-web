import Modal from "./Modal";

function ImageModal({ isOpen, imageCard, onClose }) {
  if (!imageCard) return null;

  const { title, images } = imageCard;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="image-modal">
        <img className="image-modal__image" src={images} alt={title} />
        <p className="image-modal__title">{title}</p>
        <button
          type="button"
          className="image-modal__close-button"
          onClick={onClose}
        />
      </div>
    </Modal>
  );
}

export default ImageModal;

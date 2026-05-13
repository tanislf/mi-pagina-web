import { useState, useEffect } from "react";
import Modal from "./Modal";

function ImageModal({ isOpen, imageCard, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen, imageCard]);

  if (!imageCard) return null;

  const { title, images } = imageCard;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentMedia = images && images.length > 0 ? images[currentIndex] : "";
  const isVideo = currentMedia && currentMedia.match(/\.(mp4|webm|mov|ogg)$/i);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="image-modal">
        {images && images.length > 1 && (
          <button className="image-modal__nav image-modal__nav--prev" onClick={handlePrev} type="button">
            &#10094;
          </button>
        )}

        {isVideo ? (
          <video className="image-modal__image" src={currentMedia} autoPlay controls muted playsInline />
        ) : (
          <img className="image-modal__image" src={currentMedia} alt={title} />
        )}

        {images && images.length > 1 && (
          <button className="image-modal__nav image-modal__nav--next" onClick={handleNext} type="button">
            &#10095;
          </button>
        )}

        <div className="image-modal__footer">
          <p className="image-modal__title">{title}</p>
          {images && images.length > 1 && (
            <div className="image-modal__counter">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
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

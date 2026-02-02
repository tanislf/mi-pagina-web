import { useEffect } from "react";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <section className="modaltool">
      <div className="modaltool__overlay" onClick={onClose} />
      <div className="modaltool__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </section>
  );
}

export default Modal;

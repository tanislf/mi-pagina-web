function Modal({ isOpen, onClose, children }) {
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

import check from "../../images/check.png";

function InfoTooltip() {
  return (
    <section className="tooltip">
      <div className="tooltip__container">
        <p className="tooltip__text">¡Solicitud enviada!</p>
        <p className="tooltip__text">
          Me pondré en contacto contigo <br />
          lo antes posible.
        </p>
        <img className="tooltip__image" src={check} />
      </div>
    </section>
  );
}

export default InfoTooltip;

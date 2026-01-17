function ContactForm() {
  return (
    <section className="contact">
      <div className="contact__modal">
        <button className="contact__close-button" type="button" />

        <form className="contact__form">
          <p className="contact__text">
            Este cuestionario te llevará unos 5 minutos
          </p>

          <div className="contact__container">
            <h2 className="contact__header">Cuéntame ¿Qué necesitas?</h2>

            <div className="contact__grid-options">
              <button type="button" className="contact__option">
                Ilustración
              </button>
              <button type="button" className="contact__option">
                Website
              </button>
              <button type="button" className="contact__option">
                Fotografía
              </button>
              <button type="button" className="contact__option">
                Ilustración
              </button>
            </div>
          </div>

          <div className="contact__container">
            <h2 className="contact__header">¿Para cuándo lo necesitas?</h2>

            <div className="contact__grid-options">
              <button type="button" className="contact__option">
                Lo antes posible
              </button>
              <button type="button" className="contact__option">
                En los siguientes 2 meses
              </button>
              <button type="button" className="contact__option">
                En los siguientes 6 meses
              </button>
              <button type="button" className="contact__option">
                No hay prisa
              </button>

              <button className="contact__back-button" type="button" />
            </div>
          </div>

          <div className="contact__container">
            <h2 className="contact__header">
              Genial, ¿Cuál es tu presupuesto estimado?
            </h2>

            <div className="contact__grid-options">
              <button type="button" className="contact__option">
                $30 - $60 USD
              </button>
              <button type="button" className="contact__option">
                $60 - $170 USD
              </button>
              <button type="button" className="contact__option">
                $170 - $300 USD
              </button>
              <button type="button" className="contact__option">
                $300+ USD
              </button>

              <button className="contact__back-button" type="button" />
            </div>
          </div>

          <div className="contact__container">
            <h2 className="contact__header">
              Casi listo, ¿Cómo te enteraste de mi trabajo?
            </h2>

            <div className="contact__grid-options">
              <button type="button" className="contact__option">
                Redes sociales
              </button>
              <button type="button" className="contact__option">
                Linkedin
              </button>
              <button type="button" className="contact__option">
                Recomendación
              </button>
              <button type="button" className="contact__option">
                Otro
              </button>

              <button className="contact__back-button" type="button" />
            </div>
          </div>

          <div className="contact__container">
            <h2 className="contact__header contact__header_input">
              Para finalizar, compárteme tus datos y <br />
              un poco sobre tu proyecto.
            </h2>

            <div className="contact__grid-inputs">
              <input
                type="text"
                placeholder="Nombre"
                className="contact__input"
              />

              <input
                type="text"
                placeholder="Número de celular"
                className="contact__input"
              />
              <input
                type="text"
                placeholder="E-mail"
                className="contact__input contact__input3"
              />
              <input
                type="text"
                placeholder="Mensaje"
                className="contact__input contact__input4"
              />
              <button className="contact__send-button" type="submit">
                Enviar
              </button>
              <button className="contact__back-button" type="button" />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;

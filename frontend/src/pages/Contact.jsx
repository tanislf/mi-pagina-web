import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../components/Modal/Modal";

function ContactForm({ isOpen, onClose, onSuccess, onError }) {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, reset } = useForm();

  const nextStep = (field, value) => {
    setValue(field, value);
    setStep((prev) => prev + 1);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Datos finales:", data);
      alert("Gracias por tu solicitud");
      reset();
      setStep(1);
      onClose();
      onSuccess();
    } catch (e) {
      onError();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="contact">
        <div className="contact__modal">
          <button
            className="contact__close-button"
            type="button"
            onClick={onClose}
          />

          <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
            <p className="contact__text">
              Este cuestionario te llevará unos 5 minutos
            </p>

            {step === 1 && (
              <div className="contact__container">
                <h2 className="contact__header">Cuéntame ¿Qué necesitas?</h2>

                <div className="contact__grid-options">
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("service", "Ilustraci0n")}
                  >
                    Ilustración
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("service", "Website")}
                  >
                    Website
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("service", "Fotografia")}
                  >
                    Fotografía
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("service", "Edicion")}
                  >
                    Edición
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="contact__container">
                <h2 className="contact__header">¿Para cuándo lo necesitas?</h2>

                <div className="contact__grid-options">
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("time", "Urgente")}
                  >
                    Lo antes posible
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("time", "Proximo")}
                  >
                    En los siguientes 2 meses
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("time", "Hay tiempo")}
                  >
                    En los siguientes 6 meses
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("time", "Relajate")}
                  >
                    No hay prisa
                  </button>

                  <button
                    className="contact__back-button"
                    type="button"
                    onClick={() => setStep(1)}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="contact__container">
                <h2 className="contact__header">
                  Genial, ¿Cuál es tu presupuesto estimado?
                </h2>

                <div className="contact__grid-options">
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("budget", "Bajo")}
                  >
                    $30 - $60 USD
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("budget", "Medio")}
                  >
                    $60 - $170 USD
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("budget", "Alto")}
                  >
                    $170 - $300 USD
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("budget", "Super")}
                  >
                    $300+ USD
                  </button>

                  <button
                    className="contact__back-button"
                    type="button"
                    onClick={() => setStep(2)}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="contact__container">
                <h2 className="contact__header">
                  Casi listo, ¿Cómo te enteraste de mi trabajo?
                </h2>

                <div className="contact__grid-options">
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("difusion", "Redes")}
                  >
                    Redes sociales
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("difusion", "Linkedin")}
                  >
                    Linkedin
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("difusion", "Recomendacion")}
                  >
                    Recomendación
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("difusion", "Otro")}
                  >
                    Otro
                  </button>

                  <button
                    className="contact__back-button"
                    type="button"
                    onClick={() => setStep(3)}
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="contact__container">
                <h2 className="contact__header contact__header_input">
                  Para finalizar, compárteme tus datos y <br />
                  un poco sobre tu proyecto.
                </h2>

                <div className="contact__grid-inputs">
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Nombre"
                    className="contact__input"
                  />

                  <input
                    {...register("phone")}
                    type="text"
                    placeholder="Número de celular"
                    className="contact__input"
                  />
                  <input
                    {...register("email", { required: true })}
                    type="text"
                    placeholder="E-mail"
                    className="contact__input contact__input3"
                  />
                  <textarea
                    {...register("message")}
                    type="text"
                    placeholder="Mensaje"
                    className="contact__input contact__input4"
                  />
                  <button className="contact__send-button" type="submit">
                    Enviar
                  </button>
                  <button
                    className="contact__back-button"
                    type="button"
                    onClick={() => setStep(4)}
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </Modal>
  );
}

export default ContactForm;

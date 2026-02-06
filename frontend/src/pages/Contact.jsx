import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../components/Modal/Modal.jsx";
import ContactSchema from "../validators/contact.schema.js";
import LoaderSmall from "../components/Animations/LoaderDotsSmall.jsx";
import api from "../utils/api.js";

function ContactForm({ isOpen, onClose, onSuccess, onError }) {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      service: "",
      time: "",
      budget: "",
      difusion: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const formValues = watch();

  // pasar a la siguiente pregunta
  const nextStep = (field, value) => {
    setValue(field, value, { shouldValidate: true });
    setStep((prev) => prev + 1);
  };

  // mandar formulario
  const onSubmit = async (data) => {
    try {
      console.log("Datos finales:", data);

      // usar instancia para enviar datos
      await api.submitContact(data);

      alert("Gracias por tu solicitud");
      reset();
      setStep(1);
      onClose();
      onSuccess();
    } catch (e) {
      console.error(e);
      alert(`Error al enviar el formulario: ${e.message}`);
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
                {errors.service && (
                  <p className="contact__error">{errors.service.message}</p>
                )}

                <div className="contact__grid-options">
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("service", "Ilustración")}
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
                    onClick={() => nextStep("service", "Fotografía")}
                  >
                    Fotografía
                  </button>
                  <button
                    type="button"
                    className="contact__option"
                    onClick={() => nextStep("service", "Edición")}
                  >
                    Edición
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="contact__container">
                <h2 className="contact__header">¿Para cuándo lo necesitas?</h2>
                {errors.time && (
                  <p className="contact__error">{errors.time.message}</p>
                )}

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
                    onClick={() => nextStep("time", "Próximo")}
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
                    onClick={() => nextStep("time", "Relájate")}
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
                {errors.budget && (
                  <p className="contact__error">{errors.budget.message}</p>
                )}

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
                {errors.difusion && (
                  <p className="contact__error">{errors.difusion.message}</p>
                )}

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
                    onClick={() => nextStep("difusion", "Recomendación")}
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
                  <div className="contact__field">
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Nombre"
                      className={`contact__input ${errors.name ? "error" : ""}`}
                    />
                    {errors.name && (
                      <span className="contact__error-message">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="contact__field">
                    <input
                      {...register("phone")}
                      type="text"
                      placeholder="Número de celular"
                      className={`contact__input ${
                        errors.phone ? "error" : ""
                      }`}
                    />
                    {errors.phone && (
                      <span className="contact__error-message">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  <div className="contact__field">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="E-mail"
                      className={`contact__input contact__input3 ${
                        errors.email ? "error" : ""
                      }`}
                    />
                    {errors.email && (
                      <span className="contact__error-message">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="contact__field">
                    <textarea
                      {...register("message")}
                      placeholder="Mensaje"
                      className={`contact__input contact__input4 ${
                        errors.message ? "error" : ""
                      }`}
                    />
                    {errors.message && (
                      <span className="contact__error-message">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="contact__send-button"
                    type="submit"
                  >
                    {isSubmitting ? <LoaderSmall /> : "Enviar"}
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

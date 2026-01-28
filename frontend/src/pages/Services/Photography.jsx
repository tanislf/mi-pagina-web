import { Link } from "react-router-dom";
import CircularGallery from "../../components/Animations/CircularGallery";

function Photography({ onContactClick }) {
  return (
    <>
      <section className="design">
        <p className="design__services">FOTÓGRAFA Y EDITORA DIGITAL</p>
        <h1 className="design__welcome">
          Visuales que conectan y sitios web que <br />
          funcionan para creativos.
        </h1>

        <button
          type="button"
          onClick={onContactClick}
          className="design__button-contact"
        >
          Empecemos un proyecto juntos
        </button>
      </section>

      <section className="photography">
        <div className="photography__container">
          <p className="photography__title">FOTOGRAFÍA</p>
          <h1 className="photography__header">Pintar con luz</h1>
          <p className="photography__text">
            Más que solo imágens bonitas. Trabajo con fotografía de retrato,
            fotografía de producto y de ambientes. Resalto identidades, capturo
            la escencia y cuento historias visuales, cuidando la iluminación,
            encuadre y detalles que transmitan y conecten con el espectador.
          </p>

          <p className="photography__text">
            Cada proyecto es una colaboración meticulosa, sea cual sea tu
            concepto o idea original.
          </p>

          <div className="photography__buttons">
            <Link
              to="https://www.instagram.com/tania.lofier/"
              className="photography__link-button"
            >
              <button className="photography__button photography__button_insta" />
            </Link>

            <Link
              to="https://www.linkedin.com/in/tania-lópez-fierros-216682345/"
              className="photography__link-button"
            >
              <button className="photography__button photography__button_linkedin" />
            </Link>

            <Link
              to="https://www.behance.net/tanialopez29"
              className="photography__link-button"
            >
              <button className="photography__button photography__button_behance" />
            </Link>

            <Link to="" className="photography__link-button">
              <button className="photography__button photography__button_mail" />
            </Link>
          </div>
        </div>

        <div className="photography__grid">
          <CircularGallery
            bend={0.7}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
            scrollSpeed={1.9}
          />
        </div>
      </section>

      <section className="photography__edition">
        <div className="photography__edition-container">
          <p className="photography__edition-title">EDICIÓN DIGITAL</p>
          <h1 className="photography__edition-header"></h1>
          <p className="photography__text">
            Donde las imágenes cuentan su mejor versión. Me encargo de realzar
            colores, corregir detalles y cuidar la composición para que cada
            fotografía comunique exactamente lo que quieres decir (y un poquito
            más). Ya sea un ajuste sutil o una tranformación completa. Además,
            te ayudo a realizar montajes extravagantes si tu idea es más
            arriegada o deseas salir de lo común.
          </p>
          <p className="photography__text">
            ¿El resultado? fotos limpias, atractivas y listas para destacar en
            cualquier formato, sin perder naturalidad ni personalidad.
          </p>
        </div>

        <div className="photography__edition-grid">
          <img src="" className="photography__edition-image" />
        </div>
      </section>
    </>
  );
}

export default Photography;

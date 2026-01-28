import { Link } from "react-router-dom";
import meCartoon from "../../images/imagen-personal.png";

function Design() {
  return (
    <>
      <section className="design">
        <p className="design__services">
          IILUSTRADORA, DISEÑADORA Y PROGRAMADORA WEB
        </p>
        <h1 className="design__welcome">
          Visuales que conectan y sitios web que <br />
          funcionan para creativos.
        </h1>
        <Link to="/contact">
          <button className="design__button-contact">
            Empezemos un proyecto juntos
          </button>
        </Link>
      </section>

      <section className="design__ilustration">
        <div className="design__ilustration-container">
          <p className="design__ilustration-title">ILUSTRACIÓN</p>
          <h1 className="design__ilustration-header">Trae lápiz y papel</h1>
          <p className="design__text">
            Si tienes una idea taladrando tu crerebro (por muy loca, abstracta o
            específica que sea), yo me encargo de darle forma, color y
            presonalidad.
          </p>

          <p className="design__text">
            Transformo conceptos en imágenes que comunican, conectan y cuentan
            historias, ya sea para un proyecto personal, una marca... incluso
            ese ship con el que estás obsesionado. Trabajo de la mano contigo
            para entender tu visión y llevarla a un paso más allá, cuidando cada
            detalle para que el resultado no solo se vea bien, sino que se
            sienta auténtico y hecho a tu medida.
          </p>

          <div className="design__buttons">
            <Link
              to="https://www.instagram.com/tani.sdoodles/"
              className="design__link-button"
            >
              <button className="design__button design__button_insta" />
            </Link>

            <Link
              to="https://www.linkedin.com/in/tania-lópez-fierros-216682345/"
              className="design__link-button"
            >
              <button className="design__button design__button_linkedin" />
            </Link>

            <Link
              to="https://www.behance.net/tanialopez29"
              className="design__link-button"
            >
              <button className="design__button design__button_behance" />
            </Link>

            <Link to="" className="design__link-button">
              <button className="design__button design__button_mail" />
            </Link>
          </div>
        </div>

        <div className="design__ilustration-grid">
          <img src={meCartoon} className="design__ilustration-image" />
        </div>
      </section>

      <section className="design__web">
        <div className="design__web-grid">
          <img src="" className="design__web-image" />
        </div>

        <div className="design__web-container">
          <p className="design__web-title">PROGRAMACIÓN WEB</p>
          <h1 className="design__web-header">
            Páginas web de altos resultados
          </h1>
          <p className="design__text">
            ¡Sin plantillas! Como desarrolladora full-stack, creo páginas web
            costumizadas hechas para enriquecer tu marca o emprendimiento y
            mejorar su productividad. Intuitivas y fáciles de manejar.
          </p>
          <p className="design__text">
            Confecciono sitios web que se ajusten a tus necesidades y reflejen
            tus ambiciones. Me encargo de ponerlas en marcha y subirlas a la
            red.
          </p>

          <div className="design__buttons">
            <Link
              to="https://www.linkedin.com/in/tania-lópez-fierros-216682345/"
              className="design__link-button"
            >
              <button className="design__button design__button_linkedin" />
            </Link>

            <Link
              to="https://www.behance.net/tanialopez29"
              className="design__link-button"
            >
              <button className="design__button design__button_behance" />
            </Link>

            <Link to="" className="design__link-button">
              <button className="design__button design__button_mail" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Design;

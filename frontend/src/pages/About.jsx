import { Link } from "react-router-dom";

import yo from "../images/mifoto.webp";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <h1 className="about__me">Sobre mi </h1>
        <h2 className="about__welcome">¡BIENVENIDO A MI PÁGINA! </h2>
        <p className="about__description">
          Pasa, ponte cómodo y no toques nada frágil. Ya que haz llegado hasta
          aquí, voy a contarte un poco sombre mi. Soy una persona dedicada,
          curiosa por naturaleza y profundamente apasionada por las artes
          visuales e ideas extravagantes (de esas que no te dejan dormir por la
          noche) para convertirlas en proyectos tangibles, funcionales y con
          personalidad propia.
          <p className="about__description">
            A lo largo de mi camino he explorado y mejorado en distintas áreas
            del diseño: ilustración, fotografía y edición. Siendo mi nuevo
            aprendizaje el mundo de la programación y desarrollo web. Además,
            déjame informate que tengo una formación en diseño industrial. Esta
            combinación me permite abordar cada proyecto desde una perspectiva
            integral, cuidando tanto la estética como la funcionalidad.
          </p>
          <p className="about__description">
            Me he desarrollado como freelancer en ilustración y fotografía
            durante 3 años. Si te gusta mi trabajo, será un placer crear algo
            juntos.
            <div className="about__programs">
              <h2 className="about__programs-title">Programas que manejo</h2>
              <div className="about__buttons">
                <button className="about__button about__button_photoshop" />
                <button className="about__button about__button_lightroom" />
                <button className="about__button about__button_illustrator" />
                <button className="about__button about__button_indesign" />
                <button className="about__button about__button_rhino" />
                <button className="about__button about__button_solid" />
                <button className="about__button about__button_vsc" />
              </div>
            </div>
            <p className="about__description">
              <Link to="/portfolio" className="about__link">
                ¡Date una vuelta por mi portafolio!
              </Link>
            </p>
          </p>
        </p>
      </div>

      <div className="about__me-image-container">
        <img className="about__me-image" src={yo} alt="Imagen de calle" />
      </div>
    </section>
  );
}

export default About;

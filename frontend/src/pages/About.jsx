import { Link } from "react-router-dom";
import { useState } from "react";
import yo from "../images/mifoto.webp";

function About() {
  const [openProgram, setOpenProgram] = useState(null);

  const programs = [
    {
      id: "photoshop",
      name: "Photoshop",
      description: "Edición fotográfica avanzada y retoque digital.",
    },
    {
      id: "lightroom",
      name: "Lightroom",
      description: "Revelado digital y gestión de flujo fotográfico.",
    },
    {
      id: "illustrator",
      name: "Illustrator",
      description: "Diseño vectorial e ilustración digital.",
    },
    {
      id: "indesign",
      name: "InDesign",
      description: "Maquetación editorial y diseño de publicaciones.",
    },
    {
      id: "rhino",
      name: "Rhinoceros",
      description: "Modelado 3D avanzado y diseño industrial.",
    },
    {
      id: "solid",
      name: "SolidWorks",
      description: "Diseño mecánico y modelado paramétrico.",
    },
    {
      id: "vsc",
      name: "VS Code",
      description: "Herramienta de desarrollo web y programación frontend/backend.",
    },
    {
      id: "antigravity",
      name: "Antigravity",
      description: "Asistente de IA para programación y diseño web.",
    },
    {
      id: "claude",
      name: "Claude Code",
      description: "Asistente de IA para programación y diseño web.",
    },
    {
      id: "lenguajes",
      name: "Lenguajes y frameworks",
      description: "Lenguajes de programación como Java y JavaScript, y frameworks como React y Node.js. Además de HTML, CSS y express, manejos de APIS REST, bases de datos MongoDB y Google Cloude.",
    },
  ];

  const toggleProgram = (id) => {
    setOpenProgram(openProgram === id ? null : id);
  };

  return (
    <section className="about">
      <div className="about__container">
        <h1 className="about__me">Sobre mi </h1>
        <h2 className="about__welcome">¡BIENVENIDO A MI PÁGINA! </h2>
        <div className="about__text-content">
          <p className="about__description">
            Pasa, ponte cómodo y no toques nada frágil. Ya que haz llegado hasta
            aquí, voy a contarte un poco sombre mi. Soy una persona dedicada,
            curiosa por naturaleza y profundamente apasionada por las artes
            visuales e ideas extravagantes (de esas que no te dejan dormir por
            la noche) para convertirlas en proyectos tangibles, funcionales y
            con personalidad propia.
          </p>
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
          </p>
        </div>

        <div className="about__socials">
          <Link
            to="https://www.instagram.com/tania.lofier/"
            className="about__social-link"
          >
            <button className="about__social-button about__social-button_insta" />
          </Link>
          <Link
            to="https://www.linkedin.com/in/tania-lópez-fierros-216682345/"
            className="about__social-link"
          >
            <button className="about__social-button about__social-button_linkedin" />
          </Link>
          <Link
            to="https://www.behance.net/tanialopez29"
            className="about__social-link"
          >
            <button className="about__social-button about__social-button_behance" />
          </Link>
          <Link
            to="mailto:tania.lfbussines@outlook.com"
            className="about__social-link"
          >
            <button className="about__social-button about__social-button_mail" />
          </Link>
          <Link
            to="https://www.instagram.com/tani.sdoodles/"
            className="about__social-link"
          >
            <button className="about__social-button about__social-button_insta-draw" />
          </Link>
        </div>

        <div className="about__programs">
          <h2 className="about__programs-title">Softwares y habilidades</h2>
          <div className="about__accordion">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className={`about__accordion-item ${
                  openProgram === prog.id ? "about__accordion-item--open" : ""
                }`}
              >
                <button
                  className="about__accordion-header"
                  onClick={() => toggleProgram(prog.id)}
                  type="button"
                >
                  <span
                    className={`about__program-icon about__button_${prog.id}`}
                  />
                  <span className="about__program-name">{prog.name}</span>
                  <span className="about__accordion-arrow">⌄</span>
                </button>
                <div className="about__accordion-content">
                  <p className="about__program-description">
                    {prog.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="about__description">
          <Link to="/portfolio" className="about__link">
            ¡Date una vuelta por mi portafolio!
          </Link>
        </p>
      </div>

      <div className="about__me-image-container">
        <img className="about__me-image" src={yo} alt="Imagen de Tania" />
      </div>
    </section>
  );
}

export default About;

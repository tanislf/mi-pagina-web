import { Link } from "react-router-dom";
import meImage from "../images/imagen-personal.png";

const projects = [
  {
    id: 1,

    title: "holis",
  },
];

function Portfolio() {
  return (
    <>
      <section className="portfolio">
        <p className="portfolio__welcome">MIS PROYECTOS</p>
        <h1 className="portfolio__header">
          Visuales que conectan y sitios web que <br />
          funcionan para creativos.
        </h1>
        <Link to="/contact">
          <button className="portfolio__button-contact">
            Empezemos un proyecto juntos
          </button>
        </Link>
      </section>

      <div className="portfolio__options">
        <button className="portfolio__options-button">Ilustración</button>
        <button className="portfolio__options-button">Fotografía</button>
        <button className="portfolio__options-button">Desarrollo web</button>
      </div>

      <section className="portfolio__works">
        <div className="portfolio__grid">
          <div className="portfolio__grid-container">
            <img className="portfolio__grid-image" src={meImage} alt="yo" />

            <div className="portfolio__grid-description">
              <h1 className="portfolio__grid-name">Hola que hace</h1>
              <figure className="portfolio__grid-category">Ilustración</figure>
            </div>

            <p className="portfolio__grid-text">
              Una foto de mi trabajo de ilustración.
            </p>
          </div>

          <div className="portfolio__grid-container">
            <img className="portfolio__grid-image" src={meImage} alt="yo" />

            <div className="portfolio__grid-description">
              <h1 className="portfolio__grid-name">Hola que hace</h1>
              <figure className="portfolio__grid-category">Ilustración</figure>
            </div>

            <p className="portfolio__grid-text">
              Una foto de mi trabajo de ilustración.
            </p>
          </div>

          <div className="portfolio__grid-container">
            <img className="portfolio__grid-image" src={meImage} alt="yo" />

            <div className="portfolio__grid-description">
              <h1 className="portfolio__grid-name">Hola que hace</h1>
              <figure className="portfolio__grid-category">Ilustración</figure>
            </div>

            <p className="portfolio__grid-text">
              Una foto de mi trabajo de ilustración.
            </p>
          </div>

          <div className="portfolio__grid-container">
            <img className="portfolio__grid-image" src={meImage} alt="yo" />

            <div className="portfolio__grid-description">
              <h1 className="portfolio__grid-name">Hola que hace</h1>
              <figure className="portfolio__grid-category">Ilustración</figure>
            </div>

            <p className="portfolio__grid-text">
              Una foto de mi trabajo de ilustración.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Portfolio;

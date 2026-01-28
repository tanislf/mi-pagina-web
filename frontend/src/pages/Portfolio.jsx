import { useEffect, useState } from "react";
import api from "../utils/api.js";
import AddProjectModal from "../components/Modal/AddProjectModal.jsx";

function Portfolio({ onContactClick }) {
  const [portfolio, setPortfolio] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  //cargar proyectos
  const fetchProjects = async (category = "") => {
    try {
      setLoading(true);
      const data = await api.getProjects(category);
      setPortfolio(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <section className="portfolio">
        <p className="portfolio__welcome">MIS PROYECTOS</p>
        <h1 className="portfolio__header">
          Visuales que conectan y sitios web que <br />
          funcionan para creativos.
        </h1>

        <button
          type="button"
          onClick={onContactClick}
          className="portfolio__button-contact"
        >
          Empecemos un proyecto juntos
        </button>
      </section>

      <div className="portfolio__options">
        {[
          { label: "Ilustración", value: "ilustracion" },
          { label: "Fotografía", value: "fotografia" },
          { label: "Dearrollo web", value: "desarrollo-web" },
          { label: "Todos", value: "" },
        ].map(({ label, value }) => (
          <button
            key={value || "all"}
            className={`portfolio__options-button ${activeCategory === value ? "active" : ""}`}
            onClick={() => {
              setActiveCategory(value);
              fetchProjects(value);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="portfolio__works">
        {isAdmin && (
          <button
            className="portfolio__add-button"
            onClick={() => setIsModalOpen(true)}
          >
            Agregar Proyecto
          </button>
        )}

        {isAdmin && IsModalOpen && (
          <AddProjectModal
            onClose={() => setIsModalOpen(false)}
            onProjectAdded={() => fetchProjects(activeCategory)}
          />
        )}

        <div className="portfolio__grid">
          {loading && <p>Cargando proyectos...</p>}

          {!loading && portfolio.length === 0 && (
            <p className="portfolio__warning">¡Sigo trabajando en ello!</p>
          )}

          {!loading &&
            portfolio.map((project) => (
              <div key={project._id} className="portfolio__grid-container">
                <img
                  className="portfolio__grid-image"
                  src={project.image?.[0]}
                  alt={project.title}
                />

                <div className="portfolio__grid-description">
                  <h1 className="portfolio__grid-name">{project.title}</h1>
                  <figure className="portfolio__grid-category">
                    {project.category}
                  </figure>
                </div>

                <p className="portfolio__grid-text">{project.description}</p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default Portfolio;

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Loader from "../components/Animations/LoaderDots.jsx";
import api from "../utils/api.js";
import AddProjectModal from "../components/Modal/AddProjectModal.jsx";
import DeleteProject from "../components/Modal/DeleteProjectModal.jsx";
import EditProject from "../components/Modal/EditProjectModal.jsx";
import ImageModal from "../components/Modal/ImageProjectModal.jsx";

// Íconos SVG inline — sin dependencias extra
const IconCalendar = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconCategory = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const IconLink = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const categoryLabels = {
  illustration: "Ilustración",
  photography: "Fotografía",
  web: "Desarrollo Web",
  industrial: "Diseño Industrial",
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function ProjectCard({
  project,
  index,
  isAdmin,
  onImageClick,
  onDelete,
  onEdit,
}) {
  const formattedDate = project.date
    ? new Date(project.date).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
      })
    : null;

  const isVideo = project.images?.[0]?.match(/\.(mp4|webm|mov|ogg)$/i);

  return (
    <motion.article
      className="pcard"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      layout
    >
      {/* IMAGEN */}
      <div className="pcard__media-col">
        <div
          className="pcard__image-wrap"
          onClick={() => onImageClick(project)}
        >
          {isVideo ? (
            <video
              className="pcard__image"
              src={project.images[0]}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              className="pcard__image"
              src={project.images?.[0]}
              alt={project.title}
            />
          )}

          {/* Overlay de admin */}
          {isAdmin && (
            <div className="pcard__admin-overlay">
              <button
                type="button"
                className="portfolio__edit-button portfolio__image-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(project);
                }}
              />
              <button
                type="button"
                className="portfolio__delete-button portfolio__image-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(project._id);
                }}
              />
            </div>
          )}
        </div>

        {/* Miniaturas si hay más de una imagen */}
        {project.images?.length > 1 && (
          <div className="pcard__thumbnails">
            {project.images.slice(0, 4).map((img, i) => (
              <div key={i} className="pcard__thumb">
                {img.match(/\.(mp4|webm|mov|ogg)$/i) ? (
                  <video src={img} className="pcard__thumb-media" muted />
                ) : (
                  <img src={img} alt="" className="pcard__thumb-media" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="pcard__info-col">
        {/* Eyebrow — número decorativo */}
        <span className="pcard__index">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Título */}
        <h2 className="pcard__title">{project.title}</h2>

        {/* Separador */}
        <div className="pcard__divider" />

        {/* Descripción */}
        <p className="pcard__description">{project.description}</p>

        {/* Metadatos */}
        <ul className="pcard__meta">
          {formattedDate && (
            <li className="pcard__meta-row">
              <span className="pcard__meta-icon">
                <IconCalendar />
              </span>
              <div className="pcard__meta-content">
                <span className="pcard__meta-label">Fecha</span>
                <span className="pcard__meta-value">{formattedDate}</span>
              </div>
            </li>
          )}

          {project.collaboration && (
            <li className="pcard__meta-row">
              <span className="pcard__meta-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <div className="pcard__meta-content">
                <span className="pcard__meta-label">Colaboración</span>
                <span className="pcard__meta-value">
                  {project.collaboration}
                </span>
              </div>
            </li>
          )}

          {project.exhibition && (
            <li className="pcard__meta-row">
              <span className="pcard__meta-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              <div className="pcard__meta-content">
                <span className="pcard__meta-label">Exhibición</span>
                <span className="pcard__meta-value">{project.exhibition}</span>
              </div>
            </li>
          )}

          <li className="pcard__meta-row">
            <span className="pcard__meta-icon">
              <IconCategory />
            </span>
            <div className="pcard__meta-content">
              <span className="pcard__meta-label">Categoría</span>
              <span className="pcard__meta-value">
                {categoryLabels[project.category] || project.category}
              </span>
            </div>
          </li>

          {project.link && (
            <li className="pcard__meta-row">
              <span className="pcard__meta-icon">
                <IconLink />
              </span>
              <div className="pcard__meta-content">
                <span className="pcard__meta-label">Enlace</span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pcard__meta-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ver proyecto
                </a>
              </div>
            </li>
          )}
        </ul>
      </div>
    </motion.article>
  );
}

//Función general del portfolio, que contiene la lógica de carga de proyectos, filtrado por categoría,
// y manejo de modales para agregar, editar y eliminar proyectos. También maneja la visualización de imágenes y videos en un modal.
function Portfolio({
  onContactClick,
  isAdmin,
  onAdminLogin,
  onMessagesClick,
  onLogout,
}) {
  const [portfolio, setPortfolio] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  //cargar proyectos
  const fetchProjects = useCallback(async (category = "") => {
    try {
      setLoading(true);
      const data = await api.getProjects(category);
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.date || 0).getTime();
        const dateB = new Date(b.date || 0).getTime();
        // Si la fecha es inválida, se enviará al final
        return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
      });
      console.log("Proyectos cargados:", sortedData);
      setPortfolio(sortedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  //modal de borrar proyectos
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  //eliminar proyectos
  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await api.deleteProject(projectToDelete);
      closeDeleteModal();
      fetchProjects(activeCategory);
    } catch (err) {
      console.error("Error al eliminar proyecto", err);
    }
  };

  //abrir imagen
  const handleImageClick = (image) => {
    setActiveImage(image);
    setIsImageModalOpen(true);
  };

  //cerrar imagen
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setActiveImage(null);
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
          { label: "Ilustración", value: "illustration" },
          { label: "Fotografía", value: "photography" },
          { label: "Desarrollo web", value: "web" },
          { label: "Diseño Industrial", value: "industrial" },
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

        <button
          className="portfolio__add-button"
          type="button"
          onClick={() => {
            if (isAdmin) {
              setIsProjectModalOpen(true);
            } else {
              onAdminLogin();
            }
          }}
        />

        {isAdmin && (
          <button
            className="portfolio__close-session-button"
            type="button"
            onClick={onLogout}
          />
        )}

        {isAdmin && (
          <button
            className="portfolio__messages-button"
            type="button"
            onClick={onMessagesClick}
          />
        )}
      </div>

      {isAdmin && (
        <AddProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onProjectAdded={() => fetchProjects(activeCategory)}
        />
      )}

      <DeleteProject
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />

      <EditProject
        isOpen={isEditModalOpen}
        project={projectToEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setProjectToEdit(null);
        }}
        onUpdated={() => fetchProjects(activeCategory)}
      />

      <ImageModal
        isOpen={isImageModalOpen}
        imageCard={activeImage}
        onClose={closeImageModal}
      />

      <section className="portfolio__works">
        {loading && <Loader />}

        {!loading && portfolio.length === 0 && (
          <p className="portfolio__warning">¡Sigo trabajando en ello!</p>
        )}

        {/* <div className="portfolio__grid">
          {!loading &&
            portfolio.map((project) => (
              <div key={project._id} className="portfolio__grid-container">
                <div className="portfolio__grid-image-container">
                  {project.images?.[0] &&
                  project.images[0].match(/\.(mp4|webm|mov|ogg)$/i) ? (
                    <video
                      className="portfolio__grid-image"
                      src={project.images[0]}
                      onClick={() => handleImageClick(project)}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      className="portfolio__grid-image"
                      src={project.images?.[0]}
                      alt={project.title}
                      onClick={() => handleImageClick(project)}
                    />
                  )}

                  {isAdmin && (
                    <>
                      <button
                        type="button"
                        className="portfolio__delete-button portfolio__image-button"
                        onClick={() => {
                          setProjectToDelete(project._id);
                          setIsDeleteModalOpen(true);
                        }}
                      />
                      <button
                        type="button"
                        className="portfolio__edit-button portfolio__image-button"
                        onClick={() => {
                          setProjectToEdit(project);
                          setIsEditModalOpen(true);
                        }}
                      />
                    </>
                  )}
                </div>

                <div className="portfolio__grid-description">
                  <h1 className="portfolio__grid-name">{project.title}</h1>
                  <figure className="portfolio__grid-category">
                    {project.category}
                  </figure>
                </div>

                {project.date && (
                  <p className="portfolio__grid-date">
                    {new Date(project.date).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                )}

                <p className="portfolio__grid-text">{project.description}</p>
                {project.category === "industrial" && project.collaboration && (
                  <p
                    className="portfolio__grid-text"
                    style={{ marginTop: "10px" }}
                  >
                    <strong>Colaboración:</strong> {project.collaboration}
                  </p>
                )}
                {project.category === "industrial" && project.exhibition && (
                  <p
                    className="portfolio__grid-text"
                    style={{ marginTop: "5px" }}
                  >
                    <strong>Exhibición:</strong> {project.exhibition}
                  </p>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio__grid-link"
                >
                  {project.link}
                </a>
              </div>
            ))}
        </div> */}

        <AnimatePresence>
          <div className="portfolio__list">
            {!loading &&
              portfolio.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  isAdmin={isAdmin}
                  onImageClick={handleImageClick}
                  onDelete={(id) => {
                    setProjectToDelete(id);
                    setIsDeleteModalOpen(true);
                  }}
                  onEdit={(p) => {
                    setProjectToEdit(p);
                    setIsEditModalOpen(true);
                  }}
                />
              ))}
          </div>
        </AnimatePresence>
      </section>
    </>
  );
}

export default Portfolio;

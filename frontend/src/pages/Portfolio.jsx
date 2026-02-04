import { useEffect, useState, useCallback } from "react";

import Loader from "../components/Animations/LoaderDots.jsx";

import api from "../utils/api.js";
import AddProjectModal from "../components/Modal/AddProjectModal.jsx";
import DeleteProject from "../components/Modal/DeleteProjectModal.jsx";
import EditProject from "../components/Modal/EditProjectModal.jsx";
import ImageModal from "../components/Modal/ImageProjectModal.jsx";

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
      setPortfolio(data);
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

        <div className="portfolio__grid">
          {!loading &&
            portfolio.map((project) => (
              <div key={project._id} className="portfolio__grid-container">
                <div className="portfolio__grid-image-container">
                  <img
                    className="portfolio__grid-image"
                    src={project.images?.[0]}
                    alt={project.title}
                    onClick={() => handleImageClick(project)}
                  />

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

                <p className="portfolio__grid-text">{project.description}</p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default Portfolio;

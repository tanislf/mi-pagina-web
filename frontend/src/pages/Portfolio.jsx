import { useEffect, useState } from "react";

import Loader from "../components/Animations/LoaderDots.jsx";

import api from "../utils/api.js";
import AddProjectModal from "../components/Modal/AddProjectModal.jsx";
import AddAdminModal from "../components/Modal/AddAdminModal.jsx";
import DeleteProject from "../components/Modal/DeleteProjectModal.jsx";
import EditProject from "../components/Modal/EditProjectModal.jsx";
import ImageModal from "../components/Modal/ImageProjectModal.jsx";
import { getToken, removeToken } from "../utils/token.js";

function Portfolio({ onContactClick, onOpenImage, imageCard }) {
  const [portfolio, setPortfolio] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true",
  );

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

  //modal de borrar proyectos
  const closeDleteModal = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  //eliminar proyectos
  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await api.deleteProject(projectToDelete);
      closeDleteModal();
      setProjectToDelete(null);
      fetchProjects(activeCategory);
    } catch (err) {
      console.error("Error al eliminar proyecto", err);
    }
  };

  //cerrar sesión
  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);

    setIsProjectModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setProjectToEdit(null);
    setProjectToDelete(null);

    setShowLogoutMessage(true);

    setTimeout(() => {
      setShowLogoutMessage(false);
    }, 2500);
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
    if (!getToken()) {
      localStorage.removeItem("isAdmin");
      setIsAdmin(false);
    }
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
              setIsAdminModalOpen(true);
            }
          }}
        />

        {isAdmin && (
          <button
            className="portfolio__close-session-button"
            type="button"
            onClick={handleLogout}
          />
        )}
      </div>

      <AddAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          localStorage.setItem("isAdmin", "true");
          setIsAdmin(true);
          setIsAdminModalOpen(false);
          setIsProjectModalOpen(true);
        }}
      />

      {isAdmin && (
        <AddProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onProjectAdded={() => fetchProjects(activeCategory)}
        />
      )}

      <DeleteProject
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={() => handleDelete(projectToDelete)}
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

        {showLogoutMessage && (
          <p className="portfolio__logout-message">
            ¡Sesión cerrada correctamente!
          </p>
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

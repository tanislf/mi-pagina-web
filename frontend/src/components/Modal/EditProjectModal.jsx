import { useState, useEffect } from "react";
import Modal from "./Modal.jsx";
import LoaderSmall from "../Animations/LoaderDotsSmall.jsx";
import api from "../../utils/api.js";

function EditProject({ isOpen, onClose, project, onUpdated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //sincronizar datos al abrir
  useEffect(() => {
    if (!project) return;

    setTitle(project.title || "");
    setDescription(project.description || "");
    setCategory(project.category || "");
    setLink(project.link || "");
  }, [project]);

  //actualiza la info del formulario
  const handleSubmitProject = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("link", link);

    if (images?.length) {
      for (let file of images) {
        formData.append("images", file);
      }
    }

    try {
      setLoading(true);

      const updated = await api.updateProject(project._id, formData);

      onUpdated(updated);
      onClose();
    } catch (err) {
      setError("No se pudo editar el proyecto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="editmodal__form" onSubmit={handleSubmitProject}>
        <h2 className="editmodal__text">Editar Proyecto</h2>

        {error && <p className="editmodal__error">{error}</p>}

        {project?.images?.[0] && (
          <img src={project.images[0]} className="editmodal__preview" alt="" />
        )}

        <div className="editmodal__form-options">
          <input
            className="editmodal__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="editmodal__input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
          />

          <input
            className="editmodal__input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link del proyecto (opcional)"
          />

          <select
            className="editmodal__input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecciona una categoría</option>
            <option value="illustration">Ilustración</option>
            <option value="photography">Fotografía</option>
            <option value="web">Desarrollo Web</option>
          </select>

          <input
            className="editmodal__input-image"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
            type="file"
          />
        </div>

        <div className="editmodal__buttons">
          <button
            className="editmodal__button"
            type="submit"
            disabled={loading}
          >
            {loading ? <LoaderSmall /> : "Guardar cambios"}
          </button>
          <button className="editmodal__button" type="button" onClick={onClose}>
            Cacelar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditProject;

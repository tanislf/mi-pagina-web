import { useState } from "react";
import api from "../../utils/api.js";
import Modal from "./Modal.jsx";
import LoaderSmall from "../Animations/LoaderDotsSmall.jsx";

function AddProjectModal({ isOpen, onClose, onProjectAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState([]);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //crear el proyecto
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("link", link);

    for (let file of image) {
      formData.append("images", file);
    }

    try {
      setLoading(true);

      const newProject = await api.createProject(formData);
      onProjectAdded(newProject);
      onClose();
    } catch (err) {
      setError("No se pudo crear el proyecto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="modal__form" onSubmit={handleSubmit}>
        <h2 className="modal__text">Nuevo Proyecto</h2>

        {error && <p className="modal__error">{error}</p>}

        <input
          className="modal__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />

        <textarea
          className="modal__input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
        />

        <input
          className="modal__input"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link del proyecto (opcional)"
        />

        <select
          className="modal__input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Selecciona una categoría</option>
          <option value="illustration">Ilustración</option>
          <option value="photography">Fotografía</option>
          <option value="web">Desarrollo Web</option>
        </select>

        <input
          className="modal__input-image"
          accept="image/*"
          multiple
          onChange={(e) => setImage(e.target.files)}
          type="file"
        />

        <div className="modal__buttons">
          <button className="modal__button" type="submit" disabled={loading}>
            {loading ? <LoaderSmall /> : "Guardar"}
          </button>
          <button className="modal__button" type="button" onClick={onClose}>
            Cacelar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddProjectModal;

import { useState } from "react";
import api from "../../utils/api.js";
import Modal from "./Modal.jsx";
import LoaderSmall from "../Animations/LoaderDotsSmall.jsx";

function AddProjectModal({ isOpen, onClose, onProjectAdded }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
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
    formData.append("date", date);
    for (let file of image) {
      formData.append("images", file);
      formData.append("imageOrder", file.name);
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

  const handleFileChange = (e) => {
    setImage(Array.from(e.target.files));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    setImage((prev) => {
      const newImages = [...prev];
      [newImages[index - 1], newImages[index]] = [
        newImages[index],
        newImages[index - 1],
      ];
      return newImages;
    });
  };

  const moveDown = (index) => {
    if (index === image.length - 1) return;
    setImage((prev) => {
      const newImages = [...prev];
      [newImages[index], newImages[index + 1]] = [
        newImages[index + 1],
        newImages[index],
      ];
      return newImages;
    });
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

        <input
          className="modal__input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Fecha"
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
          <option value="industrial">Diseño Industrial</option>
        </select>

        <input
          className="modal__input-image"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          type="file"
        />

        {image.length > 0 && (
          <div className="modal__preview-list">
            {image.map((file, index) => (
              <div key={index} className="modal__preview-item">
                {file.type.startsWith("video/") ? (
                  <video
                    src={URL.createObjectURL(file)}
                    className="modal__preview-media"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(file)}
                    className="modal__preview-media"
                    alt=""
                  />
                )}
                <span className="modal__preview-name">{file.name}</span>
                <div className="modal__preview-actions">
                  <button
                    type="button"
                    className="modal__preview-btn"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                  >
                    ⬆️
                  </button>
                  <button
                    type="button"
                    className="modal__preview-btn"
                    onClick={() => moveDown(index)}
                    disabled={index === image.length - 1}
                  >
                    ⬇️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="modal__buttons" style={{ marginTop: "20px" }}>
          <button className="modal__button" type="submit" disabled={loading}>
            {loading ? <LoaderSmall /> : "Guardar"}
          </button>
          <button className="modal__button" type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddProjectModal;

import { useState, useEffect } from "react";
import Modal from "./Modal.jsx";
import LoaderSmall from "../Animations/LoaderDotsSmall.jsx";
import api from "../../utils/api.js";

function EditProject({ isOpen, onClose, project, onUpdated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
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
    setExistingImages(project.images || []);
    setImages(null);
  }, [project]);

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const moveExistingUp = (index) => {
    if (index === 0) return;
    setExistingImages((prev) => {
      const newImages = [...prev];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      return newImages;
    });
  };

  const moveExistingDown = (index) => {
    if (index === existingImages.length - 1) return;
    setExistingImages((prev) => {
      const newImages = [...prev];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      return newImages;
    });
  };

  const moveNewUp = (index) => {
    if (index === 0) return;
    setImages((prev) => {
      const newImages = [...prev];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      return newImages;
    });
  };

  const moveNewDown = (index) => {
    if (index === images.length - 1) return;
    setImages((prev) => {
      const newImages = [...prev];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      return newImages;
    });
  };

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
        formData.append("imageOrder", file.name);
      }
    } else if (existingImages?.length) {
      for (let url of existingImages) {
        formData.append("existingImages", url);
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
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            type="file"
          />
        </div>

        {/* Mostrar imágenes nuevas si hay, si no, mostrar las existentes */}
        {images?.length > 0 ? (
          <div className="editmodal__preview-list-container">
            <p className="editmodal__preview-title">Nuevos archivos seleccionados:</p>
            <div className="editmodal__preview-list">
              {images.map((file, index) => (
                <div key={index} className="editmodal__preview-item">
                  {file.type.startsWith("video/") ? (
                    <video src={URL.createObjectURL(file)} className="editmodal__preview-media" />
                  ) : (
                    <img src={URL.createObjectURL(file)} className="editmodal__preview-media" alt="" />
                  )}
                  <span className="editmodal__preview-name">{file.name}</span>
                  <div className="editmodal__preview-actions">
                    <button type="button" className="editmodal__preview-btn" onClick={() => moveNewUp(index)} disabled={index === 0}>⬆️</button>
                    <button type="button" className="editmodal__preview-btn" onClick={() => moveNewDown(index)} disabled={index === images.length - 1}>⬇️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : existingImages?.length > 0 ? (
          <div className="editmodal__preview-list-container">
            <p className="editmodal__preview-title">Archivos actuales:</p>
            <div className="editmodal__preview-list">
              {existingImages.map((url, index) => (
                <div key={index} className="editmodal__preview-item">
                  {url.match(/\.(mp4|webm|mov|ogg)$/i) ? (
                    <video src={url} className="editmodal__preview-media" />
                  ) : (
                    <img src={url} className="editmodal__preview-media" alt="" />
                  )}
                  <span className="editmodal__preview-name">Archivo {index + 1}</span>
                  <div className="editmodal__preview-actions">
                    <button type="button" className="editmodal__preview-btn" onClick={() => moveExistingUp(index)} disabled={index === 0}>⬆️</button>
                    <button type="button" className="editmodal__preview-btn" onClick={() => moveExistingDown(index)} disabled={index === existingImages.length - 1}>⬇️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="editmodal__buttons" style={{ marginTop: "20px" }}>
          <button
            className="editmodal__button"
            type="submit"
            disabled={loading}
          >
            {loading ? <LoaderSmall /> : "Guardar cambios"}
          </button>
          <button className="editmodal__button" type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditProject;

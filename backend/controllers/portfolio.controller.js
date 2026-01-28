import Portfolio from "../models/Portfolio.js";

//Mostrar proyectos
export async function getProjects(req, res) {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const projects = await Portfolio.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proyectos" });
  }
}

//Crear Proyecto
export async function createProject(req, res) {
  try {
    if (!req.files || !req.files.length) {
      return res.status(400).json({
        message: "Selecciona al menos una imágen",
      });
    }

    const images = req.files.map((file) => file.path);
    const { title, description, category, link } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Faltan campos obligatorios",
      });
    }

    const newProject = await Portfolio.create({
      title,
      description,
      category,
      images,
      link,
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Erorr al crear tu proyecto", error });
  }
}

//Eliminar proyecto
export async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    const project = await Portfolio.findById(id);

    if (!project) {
      return res
        .status(404)
        .json({ message: "No se ha encontrado este proyecto" });
    }

    await project.deleteOne();

    res.status(200).json({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "No se pudo eliminar este proyecto" });
  }
}

//Actualizar información del proyecto
export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const { title, description, category, link, featured, order } = req.body;

    const updatedProject = await Portfolio.findByIdAndUpdate(
      id,
      { title, description, category, link, featured, order },
      { new: true, runValidators: true },
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: "Datos inválidos" });
  }
}

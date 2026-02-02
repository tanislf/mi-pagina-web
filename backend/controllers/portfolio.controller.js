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
    const { title, description, category, link } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Faltan campos obligatorios",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Selecciona al menos una imagen" });
    }

    const images = req.files.map((file) => file.path);

    const newProject = await Portfolio.create({
      title,
      description,
      category,
      images,
      link,
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({
      message: "Error al crear tu proyecto",
      error: error.message,
    });
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

//Actualizar proyecto
export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const { title, description, category, link, featured, order } = req.body;

    const project = await Portfolio.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    // actualizar texto solo si viene
    if (title) project.title = title;
    if (description) project.description = description;
    if (category) project.category = category;
    if (link !== undefined) project.link = link;
    if (featured !== undefined) project.featured = featured;
    if (order !== undefined) project.order = order;

    // actualizar imágenes
    if (req.files && req.files.length > 0) {
      project.images = req.files.map((file) => file.path);
    }

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(400).json({ message: error.message });
  }
}

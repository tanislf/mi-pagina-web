// import Portfolio from "../models/Portfolio.js";

// //Mostrar proyectos
// export async function getProjects(req, res) {
//   try {
//     const { category } = req.query;

//     const filter = category ? { category } : {};

//     const sorted = projects.sort((a, b) => {
//       if (!a.date) return 1;
//       if (!b.date) return -1;
//       return new Date(b.date) - new Date(a.date);
//     });

//     res.status(200).json(projects);
//   } catch (error) {
//     console.error("GET PROJECTS ERROR:", error);
//     res
//       .status(500)
//       .json({ message: "Error al obtener proyectos", error: error.message });
//   }
// }

// //Crear Proyecto
// export async function createProject(req, res) {
//   try {
//     const { title, description, category, link, date } = req.body;

//     if (!title || !description || !category) {
//       return res.status(400).json({
//         message: "Faltan campos obligatorios",
//       });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Selecciona al menos una imagen" });
//     }

//     let uploadedImages = req.files.map((file) => ({
//       url: file.path,
//       name: file.originalname,
//     }));

//     if (req.body.imageOrder) {
//       const order = Array.isArray(req.body.imageOrder)
//         ? req.body.imageOrder
//         : [req.body.imageOrder];
//       uploadedImages.sort((a, b) => {
//         return order.indexOf(a.name) - order.indexOf(b.name);
//       });
//     }

//     const images = uploadedImages.map((img) => img.url);

//     const newProject = await Portfolio.create({
//       title,
//       description,
//       category,
//       images,
//       link,
//       date,
//     });

//     res.status(201).json(newProject);
//   } catch (error) {
//     console.error("CREATE PROJECT ERROR:", error);
//     res.status(500).json({
//       message: "Error al crear tu proyecto",
//       error: error.message,
//     });
//   }
// }

// //Eliminar proyecto
// export async function deleteProject(req, res) {
//   try {
//     const { id } = req.params;

//     const project = await Portfolio.findById(id);

//     if (!project) {
//       return res
//         .status(404)
//         .json({ message: "No se ha encontrado este proyecto" });
//     }

//     await project.deleteOne();

//     res.status(200).json({ message: "Proyecto eliminado correctamente" });
//   } catch (error) {
//     res.status(400).json({ message: "No se pudo eliminar este proyecto" });
//   }
// }

// //Actualizar proyecto
// export async function updateProject(req, res) {
//   try {
//     const { id } = req.params;
//     const { title, description, category, link, featured, order, date } =
//       req.body;

//     const project = await Portfolio.findById(id);

//     if (!project) {
//       return res.status(404).json({ message: "Proyecto no encontrado" });
//     }

//     // actualizar texto solo si viene
//     if (title) project.title = title;
//     if (description) project.description = description;
//     if (category) project.category = category;
//     if (link !== undefined) project.link = link;
//     if (featured !== undefined) project.featured = featured;
//     if (order !== undefined) project.order = order;
//     if (date !== undefined) project.date = date;

//     console.log("DATE QUE LLEGA:", req.body.date);
//     if (date !== undefined) project.date = date;
//     console.log("DATE EN PROYECTO:", project.date);

//     // actualizar imágenes
//     if (req.files && req.files.length > 0) {
//       let uploadedImages = req.files.map((file) => ({
//         url: file.path,
//         name: file.originalname,
//       }));

//       if (req.body.imageOrder) {
//         const order = Array.isArray(req.body.imageOrder)
//           ? req.body.imageOrder
//           : [req.body.imageOrder];
//         uploadedImages.sort(
//           (a, b) => order.indexOf(a.name) - order.indexOf(b.name),
//         );
//       }

//       project.images = uploadedImages.map((img) => img.url);
//     }

//     // incluir las imágenes existentes si se mantienen
//     if (req.body.existingImages) {
//       project.images = Array.isArray(req.body.existingImages)
//         ? req.body.existingImages
//         : [req.body.existingImages];
//       project.images = [...(project.images || []), ...existing];
//     }

//     project.markModified("images");
//     await project.save();

//     res.status(200).json(project);
//   } catch (error) {
//     console.error("UPDATE ERROR:", error);
//     res.status(400).json({ message: error.message });
//   }
// }

import Portfolio from "../models/Portfolio.js";

//Mostrar proyectos
export async function getProjects(req, res) {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const projects = await Portfolio.find(filter).lean();

    // Ordenar en JS por fecha — más confiable con strings YYYY-MM-DD
    const sorted = projects.sort((a, b) => {
      if (!a.date) return 1; // sin fecha van al final
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date); // más reciente primero
    });

    res.status(200).json(sorted);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    res
      .status(500)
      .json({ message: "Error al obtener proyectos", error: error.message });
  }
}

//Crear Proyecto
export async function createProject(req, res) {
  try {
    const { title, description, category, link, date } = req.body;

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

    let uploadedImages = req.files.map((file) => ({
      url: file.path,
      name: file.originalname,
    }));

    if (req.body.imageOrder) {
      const order = Array.isArray(req.body.imageOrder)
        ? req.body.imageOrder
        : [req.body.imageOrder];
      uploadedImages.sort((a, b) => {
        return order.indexOf(a.name) - order.indexOf(b.name);
      });
    }

    const images = uploadedImages.map((img) => img.url);

    const newProject = await Portfolio.create({
      title,
      description,
      category,
      images,
      link,
      date,
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
    const { title, description, category, link, featured, order, date } =
      req.body;

    // LOG TEMPORAL — borra estas dos líneas cuando confirmes que funciona
    console.log("DATE QUE LLEGA:", req.body.date);

    const project = await Portfolio.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    // actualizar campos de texto solo si vienen en el request
    if (title) project.title = title;
    if (description) project.description = description;
    if (category) project.category = category;
    if (link !== undefined) project.link = link;
    if (featured !== undefined) project.featured = featured;
    if (order !== undefined) project.order = order;
    if (date !== undefined) project.date = date;

    // LOG TEMPORAL — borra esta línea cuando confirmes que funciona
    console.log("DATE EN PROYECTO ANTES DE SAVE:", project.date);

    // actualizar imágenes nuevas si las hay
    if (req.files && req.files.length > 0) {
      let uploadedImages = req.files.map((file) => ({
        url: file.path,
        name: file.originalname,
      }));

      if (req.body.imageOrder) {
        const imageOrder = Array.isArray(req.body.imageOrder)
          ? req.body.imageOrder
          : [req.body.imageOrder];
        uploadedImages.sort((a, b) => {
          return imageOrder.indexOf(a.name) - imageOrder.indexOf(b.name);
        });
      }

      project.images = uploadedImages.map((img) => img.url);
    }

    // siempre conservar imágenes existentes si vienen
    if (req.body.existingImages) {
      const existing = Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : [req.body.existingImages];

      // si hay imágenes nuevas, combinar; si no, reemplazar con las existentes
      if (req.files && req.files.length > 0) {
        project.images = [...project.images, ...existing];
      } else {
        project.images = existing;
      }
    }

    project.markModified("images");
    await project.save();

    res.status(200).json(project);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(400).json({ message: error.message });
  }
}

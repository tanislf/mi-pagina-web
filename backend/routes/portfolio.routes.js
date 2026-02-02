import { Router } from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/portfolio.controller.js";
import { auth, isAdmin } from "../middlewares/auth.js";
import { upload } from "../config/multer.js";

const router = Router();

//Rutas públicas
router.get("/", getProjects);

//Rutas solo para Admin
router.post("/", auth, isAdmin, upload.array("images", 50), createProject);
router.put("/:id", auth, isAdmin, upload.array("images"), updateProject);
router.delete("/:id", auth, isAdmin, deleteProject);

export default router;

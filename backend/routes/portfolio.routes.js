import { Router } from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/portfolio.controller.js";
import { isAdmin } from "../middlewares/auth.js";
import { upload } from "../config/multer.js";

const router = Router();

//Rutas públicas
router.get("/", getProjects);

//Rutas solo para Admin
// router.post("/", upload.array("images", 50), createProject);
router.post("/", isAdmin, upload.array("images", 50), createProject);
router.put("/:id", isAdmin, upload.array("images", 50), updateProject);
router.delete("/:id", isAdmin, deleteProject);

export default router;

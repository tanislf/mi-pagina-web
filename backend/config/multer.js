import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4", "mov"],
    resource_type: "auto",
  },
});

export const upload = multer({ storage });

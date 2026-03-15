import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import "./config/cloudinary.js";

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log("Cloudinary:", {
    secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
  });
});

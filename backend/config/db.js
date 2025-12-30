import mongoose from "mongoose";

export function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Servidor conectado a MongoDB"))
    .catch((error) => console.error("Error al conectar:", error));
}

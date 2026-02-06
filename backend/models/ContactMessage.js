import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      enum: ["Ilustración", "Website", "Fotografía", "Edición"],
      required: true,
    },

    time: {
      type: String,
      enum: ["Urgente", "Próximo", "Hay tiempo", "Relájate"],
      required: true,
    },

    budget: {
      type: String,
      enum: ["Bajo", "Medio", "Alto", "Super"],
      required: true,
    },

    difusion: {
      type: String,
      enum: ["Redes", "Linkedin", "Recomendación", "Otro"],
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: ["nuevo", "leido", "respondido"],
      default: "nuevo",
    },
  },
  { timestamps: true },
);

export default mongoose.model("ContactMessage", contactMessageSchema);

//REVISION

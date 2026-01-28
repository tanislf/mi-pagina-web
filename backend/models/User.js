import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Me llamo...",
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Debe ser un email válido",
    },
  },
  phone: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    minlength: 2,
  },
});

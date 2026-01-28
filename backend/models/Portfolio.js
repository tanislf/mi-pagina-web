import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["ilustracion", "fotografia", "web"],
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    link: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;

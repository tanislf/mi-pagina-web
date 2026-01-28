import express from "express";
import cors from "cors";
import portfolioRoute from "./routes/portfolio.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/portfolio", portfolioRoute);

export default app;

import express from "express";
import cors from "cors";
import portfolioRoute from "./routes/portfolio.routes.js";
import authRoute from "./routes/auth.routes.js";
import contactRoute from "./routes/contact.routes.js";
import adminRoute from "./routes/admin.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Orígenes permitidos
const defaultAllowedCors = [
  "https://tripleten.tk",
  "http://tripleten.tk",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://tanisaround.github.io",
];

const allowedCors = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
  : defaultAllowedCors;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedCors.includes(origin)) return callback(null, true);
    return callback(new Error("CORS policy: origin not allowed"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoute);
app.use("/portfolio", portfolioRoute);
app.use("/api/contact", contactRoute);
app.use("/admin", adminRoute);

app.use(errorHandler);

export default app;

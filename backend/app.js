import express from "express";
import cors from "cors";
import portfolioRoute from "./routes/portfolio.routes.js";
import authRoute from "./routes/auth.routes.js";
import contactRoute from "./routes/contact.routes.js";
import adminRoute from "./routes/admin.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// // Orígenes permitidos
// const allowedCors = [
//   "https://tripleten.tk",
//   "http://tripleten.tk",
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "http://localhost:5173",
//   "http://127.0.0.1:5173",
//   "https://tanislf.github.io",
//   "https://tanialopezmoretz.github.io",
// ];

// app.use(function (req, res, next) {
//   const { origin } = req.headers;

//   // Verificar si el origen está en la lista permitida
//   if (allowedCors.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }

//   // Permitir métodos HTTP necesarios
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");

//   // Permitir encabezados necesarios
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//   );

//   // Manejar solicitudes preflight OPTIONS
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//     return;
//   }

//   next();
// });

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/portfolio", portfolioRoute);
app.use("/api/contact", contactRoute);
app.use("/admin", adminRoute);

app.use(errorHandler);

export default app;

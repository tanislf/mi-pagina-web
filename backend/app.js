import express from "express";
import cors from "cors";
import portfolioRoute from "./routes/portfolio.routes.js";
import authRoute from "./routes/auth.routes.js";
import contactRoute from "./routes/contact.routes.js";
import adminRoute from "./routes/admin.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
// app.use(cors({ origin: "https://tanislf.github.io" }));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/portfolio", portfolioRoute);
app.use("/api/contact", contactRoute);
app.use("/admin", adminRoute);

app.use(errorHandler);

export default app;

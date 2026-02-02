import { Router } from "express";
import jwt from "jsonwebtoken";
import { checkSecret } from "../middlewares/checkSecret.js";

const router = Router();

router.post("/admin", checkSecret, (req, res) => {
  const { secret } = req.body;

  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ message: "Palabra incorrecta" });
  }

  const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({ token });
});

export default router;

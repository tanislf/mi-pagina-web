import jwt from "jsonwebtoken";

//Autenticación
export function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token requerido" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    return res.status(401).json({ message: "Token invalido" });
  }
}

//Administrador
export function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Token requerido" });
  }

  if (req.user.isAdmin !== true) {
    return res
      .status(403)
      .json({ message: "Acceso solo para administradores" });
  }

  next();
}

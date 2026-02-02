export function checkSecret(req, res, next) {
  if (!req.body || !req.body.secret) {
    return res.status(400).json({ message: "Falta la palabra secreta" });
  }

  next();
}

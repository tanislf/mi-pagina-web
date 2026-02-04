export const validate = (schema) => (req, res, nest) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Datos inválidos",
      errors: error.errors,
    });
  }
};

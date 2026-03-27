import { validationResult } from "express-validator";
import { errorResponse } from "../utils/response.js";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const erroresAgrupados = errors.array().reduce((acc, err) => {
      if (!acc[err.path]) acc[err.path] = [];
      acc[err.path].push(err.msg);
      return acc;
    }, {});
    return errorResponse(res, 400, "Error de validación", erroresAgrupados);
  }
  next();
};

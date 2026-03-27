import { body } from "express-validator";

const validarActualizarUsuario=[
    body("nombre").trim().notEmpty().withMessage("El usuario debe tener un nombre"),
    body("email").isEmail().normalizeEmail().withMessage("Ingresar email")
]
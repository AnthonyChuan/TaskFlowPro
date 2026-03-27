import { body } from "express-validator";

export const validacionCrearProyecto=[
    body("nombre").trim().notEmpty().withMessage("Asignar el nombre del proyecto"),
    body("descripcion").trim().notEmpty().withMessage("Asignar la descripcion del proyecto")
]
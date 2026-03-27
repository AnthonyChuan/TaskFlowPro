import { body } from "express-validator";

export const validarTarea=[
    body("id_usuario").trim().isNumeric().notEmpty().withMessage("La tarea tiene que estar asignada a alguien"),
    body("nombre").trim().notEmpty().withMessage("La tarea tiene que tener un nombre"),
    body("descripcion").trim().notEmpty().withMessage("La tarea tiene que tener una descripcion"),
    body("prioridad").trim().notEmpty().withMessage("La tarea debe tener un grado de prioridad"),
    body("project_id").trim().notEmpty().withMessage("La tarea debe pertenecer a algun proyecto"),
    body("due_date").isDate().withMessage("Fecha invalida").custom((fecha) => {
      if (new Date(fecha) < new Date().setHours(0, 0, 0, 0)) {
        throw new Error("No se pueden reservar citas en fechas pasadas");
      }
      return true;
    }),
]
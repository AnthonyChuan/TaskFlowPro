import { Router } from "express";
import { validarEditarTarea, validarTarea } from "./tareas.validator.js";
import { handleValidationErrors } from "../../midlewares/validator.js";
import { actualizarTareaEnCursoController,actualizarTareaEnCursoDeveloperController, actualizarTareaInReviewController, actualizarTareaInReviewDeveloperController, actualizaTareaDoneController, crearTareaController, deleteTareaController, editarTareaController, selectAllTareasController, selectTareasController, selectTareasPorProyectocontroller } from "./tareas.controller.js";
import { authenticateToken } from "../../midlewares/auth.js";
import { authorizeRole } from "../../midlewares/roles.js";

const tareasRouter=Router()

tareasRouter.post("/tareas",authenticateToken,validarTarea,handleValidationErrors,crearTareaController);
tareasRouter.get("/tareas",authenticateToken,selectTareasController);
tareasRouter.put("/tareas/curso/dev",authenticateToken,authorizeRole([1]),actualizarTareaEnCursoDeveloperController);
tareasRouter.put("/tareas/curso",authenticateToken,authorizeRole([2,3]),actualizarTareaEnCursoController)
tareasRouter.put("/tareas/review",authenticateToken,authorizeRole([2,3]),actualizarTareaInReviewController);
tareasRouter.put("/tareas/review/dev",authenticateToken,authorizeRole([1]),actualizarTareaInReviewDeveloperController);
tareasRouter.put("/tareas/done",authenticateToken,authorizeRole([2,3]),actualizaTareaDoneController)
tareasRouter.get("/tareas/proyecto",authenticateToken,authorizeRole([2,3]),selectTareasPorProyectocontroller)
tareasRouter.delete("/tarea",authenticateToken,authorizeRole([3,2]),deleteTareaController)
tareasRouter.get("/tareas/adm",authenticateToken,authorizeRole([3]),selectAllTareasController)
tareasRouter.put("/tareas/actualizar",authenticateToken,authorizeRole([3]),validarEditarTarea,handleValidationErrors,editarTareaController)

export default tareasRouter
import { Router } from "express";
import { validarTarea } from "./tareas.validator.js";
import { handleValidationErrors } from "../../midlewares/validator.js";
import {  actualizarTareaDoneDeveloperController,actualizarTareaEnCursoController,actualizarTareaEnCursoDeveloperController, actualizarTareaInReviewController, actualizaTareaDoneController, crearTareaController, selectTareasController, selectTareasPorProyectocontroller } from "./tareas.controller.js";
import { authenticateToken } from "../../midlewares/auth.js";
import { authorizeRole } from "../../midlewares/roles.js";

const tareasRouter=Router()

tareasRouter.post("/tareas",authenticateToken,validarTarea,handleValidationErrors,crearTareaController);
tareasRouter.get("/tareas",authenticateToken,selectTareasController);
tareasRouter.put("/tareas/curso/dev",authenticateToken,authorizeRole([1]),actualizarTareaEnCursoDeveloperController);
tareasRouter.put("/tareas/curso",authenticateToken,authorizeRole([2,3]),actualizarTareaEnCursoController)
tareasRouter.put("/tareas/review",authenticateToken,authorizeRole([2,3]),actualizarTareaInReviewController);
tareasRouter.put("/tareas/done/dev",authenticateToken,authorizeRole([1]),actualizarTareaDoneDeveloperController);
tareasRouter.put("/tareas/done",authenticateToken,authorizeRole([2,3]),actualizaTareaDoneController)
tareasRouter.get("/tareas/proyecto",authenticateToken,selectTareasPorProyectocontroller)

export default tareasRouter
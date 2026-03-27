import { Router } from "express";
import { validacionCrearProyecto } from "./proyectos.validator.js";
import { handleValidationErrors } from "../../midlewares/validator.js";
import { archivarMyProjectController, archivarProyectoController, borrarProyectoController, crearProyectoController, selectAllProjectsController, selectMyProjectsController } from "./proyectos.controller.js";
import { authenticateToken } from "../../midlewares/auth.js";
import { authorizeRole } from "../../midlewares/roles.js";

const proyectosRoutes=Router()

proyectosRoutes.post("/proyecto",authenticateToken,authorizeRole([3]),validacionCrearProyecto,handleValidationErrors,crearProyectoController)
proyectosRoutes.delete("/proyecto",authenticateToken,authorizeRole([3]),borrarProyectoController)
proyectosRoutes.put("/proyecto",authenticateToken,authorizeRole([3]),archivarProyectoController)
proyectosRoutes.put("/proyecto/pm",authenticateToken,authorizeRole([2]),archivarMyProjectController)
proyectosRoutes.get("/proyecto",authenticateToken,authorizeRole([3]),selectAllProjectsController)
proyectosRoutes.get("/proyecto/pm",authenticateToken,authorizeRole([2]),selectMyProjectsController)

export default proyectosRoutes
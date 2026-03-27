import { Router } from "express";
import { authenticateToken } from "../../midlewares/auth.js";
import { authorizeRole } from "../../midlewares/roles.js";
import { cambiarEstadoController, cambiarRolAdminController, cambiarRolPMController } from "./usuarios.controller.js";


const usuariosRouter=Router()

usuariosRouter.put("/usuario/pm",authenticateToken,authorizeRole([3]),cambiarRolPMController)
usuariosRouter.put("/usuario",authenticateToken,authorizeRole([3]),cambiarRolAdminController)
usuariosRouter.put("/usuario/estado",authenticateToken,authorizeRole([3]),cambiarEstadoController)

export default usuariosRouter
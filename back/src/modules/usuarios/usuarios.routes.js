import { Router } from "express";
import { authenticateToken } from "../../midlewares/auth.js";
import { authorizeRole } from "../../midlewares/roles.js";
import { actualizarUsuarioAdminController, actualizarUsuarioController, buscarUsuariosController, cambiarEstadoController, cambiarRolAdminController, cambiarRolPMController, obtenerUsuariosController, selectMyPerfilController } from "./usuarios.controller.js";


const usuariosRouter=Router()

usuariosRouter.put("/usuario/pm",authenticateToken,authorizeRole([3]),cambiarRolPMController)
usuariosRouter.put("/usuario",authenticateToken,authorizeRole([3]),cambiarRolAdminController)
usuariosRouter.put("/usuario/estado",authenticateToken,authorizeRole([3]),cambiarEstadoController)
usuariosRouter.put("/usuario/perfil",authenticateToken,actualizarUsuarioController)
usuariosRouter.get("/usuario/me",authenticateToken,selectMyPerfilController)
usuariosRouter.get("/usuario",authenticateToken,authorizeRole([3]),obtenerUsuariosController)
usuariosRouter.put("/usuario/admin/editar", authenticateToken, authorizeRole([3]), actualizarUsuarioAdminController)
usuariosRouter.get("/usuario/buscar", authenticateToken, authorizeRole([2, 3]), buscarUsuariosController)

export default usuariosRouter
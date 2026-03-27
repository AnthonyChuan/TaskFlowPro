import { Router } from "express";
import { validarLogin, validarRegistro } from "./auth.validator.js";
import { handleValidationErrors } from "../../midlewares/validator.js";
import { crearUsuarioController, loginController } from "./auth.controller.js";

const authRouter=Router()

authRouter.post("/register",validarRegistro,handleValidationErrors,crearUsuarioController)
authRouter.post("/login",validarLogin,handleValidationErrors,loginController)

export default authRouter
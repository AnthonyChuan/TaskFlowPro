import { errorResponse, successResponse } from "../../utils/response.js";
import { crearUsuarioService, loginService } from "./auth.service.js";

export const crearUsuarioController = async (req, res) => {
  try {
    await crearUsuarioService(req.body);
    successResponse(res,201,"Usuario creado correctamente")
  } catch (error) {
    console.log(error);
    if (error.code == 23505) {
        return errorResponse(res,400,"Email duplicado")
    }
    errorResponse(res,500,"Error en el servidor")
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { usuario, accessToken } = await loginService(email, password);
    successResponse(
      res,
      200,
      "Inicio de sesion correcto",
      {usuario,
      accessToken}
    );
  } catch (error) {
    console.log(error);
    if (error.status) {
      return errorResponse(res, error.status, error.message);
    }
    errorResponse(res, 500, "Error en el servidor");
  }
};

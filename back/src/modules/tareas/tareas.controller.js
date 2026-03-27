import { errorResponse, successResponse } from "../../utils/response.js";
import {
  actualizarTareaDoneDeveloperService,
  actualizarTareaDoneService,
  actualizarTareaEnCursoDeveloperService,
  actualizarTareaEnCursoService,
  actualizarTareaInReviewService,
  crearTareaService,
  deleteTareaService,
  selectTareasPorProyectoService,
  selectTareasService,
} from "./tareas.services.js";

export const crearTareaController = async (req, res) => {
  const id = req.usuario.id;
  try {
    await crearTareaService(req.body, id);
    successResponse(res, 201, "Tarea creada con éxito");
  } catch (error) {
    console.log(error);
    if (error.status) {
      return errorResponse(res, error.status, error.message);
    }
    errorResponse(res, 500, "Error en el servidor");
  }
};

export const selectTareasController = async (req, res) => {
  const id = req.usuario.id;
  try {
    const tareas= await selectTareasService(id);
    successResponse(res, 200, "Tareas obtenidas", tareas);
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Error en el servidor");
  }
};

export const actualizarTareaEnCursoDeveloperController = async (req, res) => {
  const id = req.usuario.id;
  const { id_tarea } = req.body;
  try {
    await actualizarTareaEnCursoDeveloperService(id_tarea, id);
    successResponse(res, 200, "Tarea actualizada con éxito");
  } catch (error) {
    console.log(error);
    if (error.status) {
      return errorResponse(res, error.status, error.message);
    }
    errorResponse(res, 500, "Error en el servidor");
  }
};

export const actualizarTareaEnCursoController = async (req, res) => {
  const { id_tarea } = req.body;
  try {
    await actualizarTareaEnCursoService(id_tarea);
    successResponse(res, 200, "Tarea actualizada con éxito");
  } catch (error) {
    console.log(error);
    if (error.status) {
      return errorResponse(res, error.status, error.message);
    }
    errorResponse(res, 500, "Error en el servidor");
  }
};

export const actualizarTareaInReviewController = async (req, res) => {
  const { id_tarea } = req.body;

  try {
    await actualizarTareaInReviewService(id_tarea);
    successResponse(res, 200, "Tarea actualizada con éxito");
  } catch (error) {
    console.log(error);
    if (error.status) {
      return errorResponse(res, error.status, error.message);
    }
    errorResponse(res, 500, "Error en el servidor");
  }
};

export const actualizarTareaDoneDeveloperController = async (req, res) => {
  const id = req.usuario.id;
  const { id_tarea } = req.body;
  try {
    await actualizarTareaDoneDeveloperService(id_tarea, id);
    successResponse(res, 200, "Tarea actualizada con éxito");
  } catch (error) {
    console.log(error);
    if (error.status) {
      return errorResponse(res, error.status, error.message);
    }
    errorResponse(res, 500, "Error en el servidor");
  }
};

export const actualizaTareaDoneController = async (req, res) => {
  const { id_tarea } = req.body;
  try {
    await actualizarTareaDoneService(id_tarea);
    successResponse(res, 200, "Tarea actualizada con éxito");
  } catch (error) {
    console.log(error);
    if (error.status) {
      return errorResponse(res, error.status, error.message);
    }
    errorResponse(res, 500, "Error en el servidor");
  }
};

export const deleteTareaController= async(req,res)=>{
    const {id_tarea}=req.body

    try {
        await deleteTareaService(id_tarea)
        successResponse(res,200,"Tarea borrada con exito")
    } catch (error) {
        console.error(error)
        if (error.status) {
            errorResponse(res,error.status,error.message)
        }
        errorResponse(res,500,"Error en el servidor")
    }
}

export const selectTareasPorProyectocontroller=async(req,res)=>{
  const {id_proyecto}=req.body

  try {
    const tareas= await selectTareasPorProyectoService(id_proyecto)
    successResponse(res,200,"Peticion exitosa",tareas)
  } catch (error) {
    console.error(error)
        if (error.status) {
            errorResponse(res,error.status,error.message)
        }
        errorResponse(res,500,"Error en el servidor")
  }
}
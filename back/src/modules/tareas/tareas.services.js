import pool from "../../config/db.js";
import {
  actualizarTareaDone,
  actualizarTareaInProgress,
  actualizarTareaInReview,  
  contarTareas,  
  crearTarea,
  deleteTarea,
  editarTarea,
  selectAllTareas,
  selectTareasPorId,
  selectTareasPorProyecto,
  validarDuenoTarea,
  validarProjectId,
  validarTarea,
  validarUserId,
} from "./tareas.repository.js";

export async function crearTareaService(data, id) {
  const client = await pool.connect();
  try {
    const usuario = await validarUserId(client, data.id_usuario);

    if (!usuario) {
      const error = new Error("Usuario inexistente");
      error.status = 404;
      throw error;
    }

    const proyecto = await validarProjectId(client, data.project_id);
    if (!proyecto) {
      const error = new Error("proyecto inexistente");
      error.status = 404;
      throw error;
    }

    await crearTarea(client, { ...data, created_by: id });
  } finally {
    client.release();
  }
}

export async function selectTareasService(id_usuario) {
  const client = await pool.connect();
  try {
    const tareas = await selectTareasPorId(client,id_usuario);
    return tareas;
  } finally {
    client.release();
  }
}

export async function actualizarTareaEnCursoDeveloperService(id_tarea, id) {
  const client = await pool.connect();
  try {
    const tarea = await validarDuenoTarea(client, id_tarea);
    if (!tarea) {
      const error = new Error("No existe tarea");
      error.status = 404;
      throw error;
    }
    if (tarea.assigned_to !== id) {
      const error = new Error(
        "No puedes cambiar el estado de la tarea de otro",
      );
      error.status = 401;
      throw error;
    }
    await actualizarTareaInProgress(client, id_tarea);
  } finally {
    client.release();
  }
}
export async function actualizarTareaEnCursoService(id_tarea) {
  const client = await pool.connect();
  try {
    const tarea = await validarTarea(client, id_tarea);
    if (!tarea) {
      const error = new Error("Tarea inexistente");
      error.status = 404;
      throw error;
    }
    await actualizarTareaInProgress(client, id_tarea);
  } finally {
    client.release();
  }
}

export async function actualizarTareaInReviewService(id_tarea) {
  const client = await pool.connect();
  try {
    const tarea = await validarTarea(client, id_tarea);
    if (!tarea) {
      const error = new Error("Tarea inexistente");
      error.status = 404;
      throw error;
    }
    await actualizarTareaInReview(client, id_tarea);
  } finally {
    client.release();
  }
}

export async function actualizarTareaInReviewDeveloperService(id_tarea, id) {
  const client = await pool.connect();
  try {
    const tarea = await validarDuenoTarea(client, id_tarea);
    if (!tarea) {
      const error = new Error("No existe tarea");
      error.status = 404;
      throw error;
    }
    if (tarea.assigned_to !== id) {
      const error = new Error(
        "No puedes cambiar el estado de la tarea de otro",
      );
      error.status = 401;
      throw error;
    }
    await actualizarTareaInReview(client, id_tarea);
  } finally {
    client.release();
  }
}

export async function actualizarTareaDoneService(id_tarea) {
  const client = await pool.connect();
  try {
    const tarea = await validarTarea(client, id_tarea);
    if (!tarea) {
      const error = new Error("Tarea inexistente");
      error.status = 404;
      throw error;
    }
    await actualizarTareaDone(client, id_tarea);
  } finally {
    client.release();
  }
}

export async function deleteTareaService(id_tarea) {
  const client = await pool.connect();
  try {
    const tarea = await validarTarea(client, id_tarea);
    if (!tarea) {
      const error = new Error("Tarea inexistente");
      error.status = 404;
      throw error;
    }
    await deleteTarea(client,id_tarea)
  } finally{
        client.release()
  }
}

export async function selectTareasPorProyectoService(id_proyecto) {
  const client= await pool.connect();
  try {
    const proyecto= await validarProjectId(client,id_proyecto)
    if (!proyecto) {
      const error = new Error("Proyecto inexistente");
      error.status = 404;
      throw error;
    }

    const tareas=await selectTareasPorProyecto(client,id_proyecto)
    return tareas 

  } finally {
    client.release()
  }
}

export async function selectAllTareasService(page,limit) {
  const client= await pool.connect()
  try {
    const offset=(page-1)*limit
    const tareas=await selectAllTareas(client,{limit,offset})
    const total= await contarTareas(client)

    return{
      tareas,
      meta:{
        page,
        limit,
        total,
        totalPages:Math.ceil(total/limit)
      }
    }

  } finally {
    client.release()
  }
}

 export async function editarTareaService(data) {
  const client=await pool.connect()
  try {
    await editarTarea(client,{...data})
  } finally{
    client.release()
  }
 }
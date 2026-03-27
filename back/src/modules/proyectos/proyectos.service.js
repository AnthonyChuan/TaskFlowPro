import pool from "../../config/db.js";
import { validarProjectId, validarUserId } from "../tareas/tareas.repository.js";
import { archivarProyecto, borrarProyecto, crearProyecto, editarProyecto, selectAllProjects, selectMyProjects, verificarProyectoId } from "./proyectos.repository.js";

export async function crearProyectoService(data,id) {
    const client= await pool.connect()
    try {
        const usuario=await validarUserId(client,id)
        if (!usuario) {
            const error=new Error("Usuario inexistente")
            error.status=404
            throw error
        }

        await crearProyecto(client,{owner_id:id,...data})
    } finally{
        client.release()
    }
}
export async function borrarProyectoService(id_proyecto,id) {
    const client= await pool.connect()
    try {
        const usuario=await validarUserId(client,id)
        if (!usuario) {
            const error=new Error("Usuario inexistente")
            error.status=404
            throw error
        }
        await borrarProyecto(client,id_proyecto)
    } finally {
        client.release()
    }
}

export async function archivarProyectoService(id_proyecto) {
    const client=await pool.connect()
    try {
        const proyecto= await validarProjectId(client,id_proyecto)
        if (!proyecto) {
            const error=new Error("Este proyecto no existe")
            error.status=404
            throw error
        }
        await archivarProyecto(client,id_proyecto)
    } finally {
        client.release()
    }
}

export async function archivarMyProjectService(id_proyecto,id) {
    const client=await pool.connect()
    try {
        const proyecto=await verificarProyectoId(client,id_proyecto,id)
        if (!proyecto) {
            const error= new Error("No existe este proyecto o usuario")
            error.status=404
            throw error
        }

        if (proyecto.owner_id!==id) {
            const error=new Error("No puedes archivar el proyecto de otras personas")
            error.status=401
            throw error
        }

        await archivarProyecto(client,id_proyecto)
    } finally {
        client.release()
    }
}

export async function selectAllProjectsService() {
    const client=await pool.connect()
    try {
        const proyectos=await selectAllProjects(client)
        return proyectos
    } finally {
        client.release()
    }
}

export async function selectMyProjectsService(id_usuario) {
    const client= await pool.connect()
    try {
        const proyectos=await selectMyProjects(client,id_usuario)
        return proyectos
    } finally{
        client.release()
    }
}

export async function editarProyectoService(data, id, rol) {
    const client = await pool.connect()
    try {
        if (rol === 2) {
            const proyecto = await validarProjectId(client, data.id_proyecto)
            if (proyecto.owner_id !== id) {
                const error = new Error("No puedes editar proyectos de otro")
                error.status = 403
                throw error
            }
        }
        await editarProyecto(client, data)
    } finally {
        client.release()
    }
}
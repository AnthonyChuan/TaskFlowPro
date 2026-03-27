import { errorResponse, successResponse } from "../../utils/response.js";
import { archivarMyProjectService, archivarProyectoService, borrarProyectoService, crearProyectoService, editarProyectoService, selectAllProjectsService, selectMyProjectsService } from "./proyectos.service.js";

export const crearProyectoController=async(req,res)=>{
    const id=req.usuario.id;
    try {
        await crearProyectoService(req.body,id)
        successResponse(res,201,"Proyecto creado con exito")
    } catch (error) {
        console.log(error)
        if (error.status) {
            return errorResponse(res, error.status, error.message)
        }
        errorResponse(res, 500, "Error en el servidor")
    }
}

export const borrarProyectoController=async(req,res)=>{
    const {id_proyecto}=req.body
    const id=req.usuario.id
    try {
        await borrarProyectoService(id_proyecto,id)
        successResponse(res,200,"Proyecto borrado con exito")
    } catch (error) {
        console.log(error)
        errorResponse(res, 500, "Error en el servidor")
    }
}

export const archivarProyectoController=async(req,res)=>{
    const {id_proyecto}=req.body
    try {
        await archivarProyectoService(id_proyecto)
        successResponse(res,200,"Proyecto archivado con exito")
    } catch (error) {
        console.log(error)
        if (error.status) {
            return errorResponse(res,error.status,error.message)
        }
        errorResponse(res,500,"Error en el servidor")
    }
}

export const archivarMyProjectController=async(req,res)=>{
    const id=req.usuario.id
    const {id_proyecto}=req.body
    try {
        await archivarMyProjectService(id_proyecto,id)
        successResponse(res,200,"Proyecto archivado con exito")
    } catch (error) {
        console.log(error)
        if (error.status) {
            return errorResponse(res,error.status,error.message)
        }
        errorResponse(res,500,"Error en el servidor")
    }
}

export const selectAllProjectsController=async(req,res)=>{
    try {
        const proyectos=await selectAllProjectsService()
        successResponse(res,200,"Peticion exitosa",proyectos)
    } catch (error) {
        console.log(error)
        errorResponse(res,500,"Error en el servidor")
    }
}

export const selectMyProjectsController=async(req,res)=>{
    const id=req.usuario.id
    try {
        const proyectos=await selectMyProjectsService(id)
        successResponse(res,200,"Peticion exitosa",proyectos)
    } catch (error) {
        console.log(error)
        errorResponse(res,500,"Error en el servidor")
    }
}

export const editarProyectoController = async (req, res) => {
    const id  = req.usuario.id
    const rol = req.usuario.rol
    try {
        await editarProyectoService(req.body, id, rol)
        successResponse(res, 200, "Proyecto actualizado correctamente")
    } catch (error) {
        console.log(error)
        if (error.status) return errorResponse(res, error.status, error.message)
        errorResponse(res, 500, "Error en el servidor")
    }
}
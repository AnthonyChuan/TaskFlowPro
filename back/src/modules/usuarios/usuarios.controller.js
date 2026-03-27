import { errorResponse, successResponse } from "../../utils/response.js"
import { actualizarUsuarioAdminService, actualizarUsuarioService, buscarUsuariosService, cambiarEstadoService, cambiarRolAdminService, cambiarRolPMService, obtenerUsuariosService, selectMyPerfilService } from "./usuarios.service.js"

export const cambiarRolPMController=async(req,res)=>{
    const id=req.usuario.id
    const{id_usuario}=req.body
    try {
        await cambiarRolPMService(id_usuario,id)
        res.status(200).json({mensaje:"Usuario actualizado correctamente"})
    } catch (error) {
        console.log(error)
        if (error.status) {
            return errorResponse(res,error.status,error.message)
        }
        errorResponse(res,500,"Error en el servidor")
    }
}

export const cambiarRolAdminController=async(req,res)=>{
    const id=req.usuario.id
    const{id_usuario}=req.body
    try {
        await cambiarRolAdminService(id_usuario,id)
        res.status(200).json({mensaje:"Usuario actualizado correctamente"})
    } catch (error) {
        console.log(error)
        if (error.status) {
            return res.status(error.status).json({mensaje:error.message})
        }
        errorResponse(res,500,"Error en el servidor")
    }
}

export const cambiarEstadoController= async(req,res)=>{
    const {id_usuario}=req.body
    try {
        await cambiarEstadoService(id_usuario)
        successResponse(res,200,"Estado cambiado con exito")
    } catch (error) {
        console.log(error)
        if (error.status) {
            errorResponse(res,error.status,error.message)
        }
        errorResponse(res,500,"Error en el servidor")
    }
}

export const actualizarUsuarioController= async(req,res)=>{
    try {
        await actualizarUsuarioService(req.body)
        successResponse(res,200,"Actualizado correctamente")
    } catch (error) {
        console.log(error)
        if (error.status) {
            errorResponse(res,error.status,error.message)
        }
        errorResponse(res,500,"Error en el servidor")
    }
}

export const selectMyPerfilController=async(req,res)=>{
    const id=req.usuario.id
    try {
        const usuario=await selectMyPerfilService(id)
        successResponse(res,200,"Peticion exitosa",usuario)
    } catch (error) {
        console.log(error)
        errorResponse(res,500,"Error en el servidor")
    }
}

export const obtenerUsuariosController = async (req, res) => {
    const page  = parseInt(req.query.page)  || 1
    const limit = parseInt(req.query.limit) || 10

    try {
        const { usuarios, meta } = await obtenerUsuariosService(page, limit)
        successResponse(res, 200, "Usuarios obtenidos", usuarios, meta)
    } catch (error) {
        console.log(error)
        errorResponse(res, 500, "Error en el servidor")
    }
}
export const actualizarUsuarioAdminController = async (req, res) => {
    try {
        await actualizarUsuarioAdminService(req.body)
        successResponse(res, 200, "Usuario actualizado correctamente")
    } catch (error) {
        console.log(error)
        if (error.status) return errorResponse(res, error.status, error.message)
        errorResponse(res, 500, "Error en el servidor")
    }
}

export const buscarUsuariosController = async (req, res) => {
    const { q } = req.query
    try {
        const usuarios = await buscarUsuariosService(q)
        successResponse(res, 200, "Búsqueda exitosa", usuarios)
    } catch (error) {
        console.log(error)
        errorResponse(res, 500, "Error en el servidor")
    }
}

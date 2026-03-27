import pool from "../../config/db.js";
import { validarUserId } from "../tareas/tareas.repository.js";
import { actualizarUsuario, actualizarUsuarioAdmin, buscarUsuarios, cambiarEstado, cambiarRolAdmin, cambiarRolPM, contarUsuarios, obtenerUsuarios, selectMyPerfil } from "./usuarios.repository.js";

export async function cambiarRolPMService(id_usuario,id) {
    const client= await pool.connect()
    try {
        const usuario= await validarUserId(client,id)
        if (!usuario) {
            const error=new Error("Usuario no encontrado")
            error.status=404
            throw error
        }
        await cambiarRolPM(client,id_usuario)
    } finally{
        client.release()
    }
}

export async function cambiarRolAdminService(id_usuario,id) {
    const client= await pool.connect()
    try {
        const usuario= await validarUserId(client,id)
        if (!usuario) {
            const error=new Error("Usuario no encontrado")
            error.status=404
            throw error
        }
        const time=new Date
        await cambiarRolAdmin(client,id_usuario)
    } finally {
        client.release()
    }
}

export async function cambiarEstadoService(id_usuario) {
    const client= await pool.connect()
    try {
        const usuario= await validarUserId(client,id_usuario)
        if (!usuario) {
            const error=new Error("Usuario no encontrado")
            error.status=404
            throw error
        }
        await cambiarEstado(client,id_usuario)
    } finally{
        client.release()
    }
}

export async function actualizarUsuarioService(data) {
    const client= await pool.connect()
    try {
        const usuario=await validarUserId(client,data.id_usuario)
        if (!usuario) {
            const error=new Error("Usuario no encontrado")
            error.status=404
            throw error
        }
        await actualizarUsuario(client,{...data})
    } finally{
        client.release()
    }
}

export async function selectMyPerfilService(id_usuario) {
    const client=await pool.connect()
    try {
        const usuario=await selectMyPerfil(client,id_usuario)
        return usuario
    } finally{
        client.release()
    }
}

export async function obtenerUsuariosService(page, limit) {
    const client = await pool.connect()
    try {
        const offset  = (page - 1) * limit
        const usuarios = await obtenerUsuarios(client, { limit, offset })
        const total    = await contarUsuarios(client)

        return {
            usuarios,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    } finally {
        client.release()
    }
}

export async function actualizarUsuarioAdminService(data) {
    const client = await pool.connect()
    try {
        await actualizarUsuarioAdmin(client, data)
    } finally {
        client.release()
    }
}

export async function buscarUsuariosService(query) {
    const client = await pool.connect()
    try {
        return await buscarUsuarios(client, query)
    } finally {
        client.release()
    }
}
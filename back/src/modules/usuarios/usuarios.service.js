import pool from "../../config/db.js";
import { validarUserId } from "../tareas/tareas.repository.js";
import { cambiarEstado, cambiarRolAdmin, cambiarRolPM } from "./usuarios.repository.js";

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


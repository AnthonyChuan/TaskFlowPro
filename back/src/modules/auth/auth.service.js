import argon2  from "argon2";
import pool from "../../config/db.js";
import { hashPassword } from "../../utils/hash.js";
import { createJWT } from "../../utils/jwt.js";
import { crearUsuario, selectUserPorEmail } from "./auth.repository.js";

export async function crearUsuarioService(data) {
    const client= await pool.connect()
    try {
        const hash= await hashPassword(data.password)
        await crearUsuario(client,{...data,hashpassword:hash})
    } finally{
        client.release()
    }
};

export async function loginService(email,password) {
    const client= await pool.connect()
    try {
        const usuario=await selectUserPorEmail(client,email);
        if (!usuario) {
            const error=new Error("Credenciales invalidas")
            error.status=401;
            throw error
        }

        if (!usuario.activo) {
            const error=new Error("Usuario desactivado, comunicate con el administrador")
            error.status=401
            throw error
        }

        const validatePassword=await argon2.verify(usuario.password,password)
        if (!validatePassword) {
            const error= new Error("Credenciales invalidas")
            error.status=401;
            throw error
        }
        const accessToken= createJWT(usuario.id_usuario,usuario.rol)

        return {
        usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
        rol:usuario.rol
        },
        accessToken}

    } finally{
        client.release()
    }
}
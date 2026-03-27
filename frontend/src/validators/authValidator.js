import { z } from "zod"

export const loginSchema = z.object({
    email:    z.string().email("Email inválido"),
    password: z.string().min(1, "La contraseña es requerida")
})

export const registerSchema = z.object({
    nombre:   z.string().min(1, "El nombre es requerido"),
    email:    z.string().email("Email inválido"),
    password: z.string()
        .min(8,     "Mínimo 8 caracteres")
        .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
        .regex(/[0-9]/, "Debe tener al menos un número")
})
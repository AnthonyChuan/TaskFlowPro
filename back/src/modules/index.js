import { Router } from "express";
import usuariosRouter from "./usuarios/usuarios.routes.js";
import tareasRouter from "./tareas/tareas.routes.js";
import proyectosRoutes from "./proyectos/proyectos.routes.js";
import authRouter from "./auth/auth.routes.js";

const router=Router()

router.use(("/"),usuariosRouter)
router.use(("/"),tareasRouter)
router.use(("/"),proyectosRoutes)
router.use(("/"),authRouter)

export default router
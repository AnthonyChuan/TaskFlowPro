
import argon2 from "argon2"

export async function seed(knex) {

    const [adminHash, mariaHash, carlosHash] = await Promise.all([
        argon2.hash("Admin123!",  { type: argon2.argon2id }),
        argon2.hash("Maria123!",  { type: argon2.argon2id }),
        argon2.hash("Carlos123!", { type: argon2.argon2id }),
    ])

    const [admin, maria, carlos] = await knex("users")
        .insert([
            { nombre: "Admin User",    email: "admin@taskflow.com", password: adminHash,  rol: 3 },
            { nombre: "María García",  email: "maria@taskflow.com", password: mariaHash,  rol: 2 },
            { nombre: "Carlos López",  email: "carlos@taskflow.com", password: carlosHash, rol: 1 },
        ])
        .returning(["id_usuario", "nombre", "rol"])


    const [proyectoA, proyectoB] = await knex("projects")
        .insert([
            {
                nombre:      "TaskFlow Web",
                descripcion: "Desarrollo del frontend de TaskFlow",
                estado:      "ACTIVO",
                owner_id:    maria.id_usuario,
            },
            {
                nombre:      "TaskFlow API",
                descripcion: "Desarrollo del backend de TaskFlow",
                estado:      "ARCHIVADO",
                owner_id:    admin.id_usuario,
            },
        ])
        .returning(["id_proyecto", "nombre"])


    const [tarea1, tarea2, tarea3, tarea4, tarea5] = await knex("tasks")
        .insert([
            {
                titulo:      "Diseñar pantalla de login",
                descripcion: "Crear el diseño responsive del login",
                estado:      "TODO",
                prioridad:   "ALTA",
                project_id:  proyectoA.id_proyecto,
                assigned_to: carlos.id_usuario,
                created_by:  maria.id_usuario,
                due_date:    "2025-04-30",
            },
            {
                titulo:      "Implementar JWT",
                descripcion: "Integrar autenticación JWT en el frontend",
                estado:      "IN_PROGRESS",
                prioridad:   "ALTA",
                project_id:  proyectoA.id_proyecto,
                assigned_to: carlos.id_usuario,
                created_by:  maria.id_usuario,
                due_date:    "2025-04-15",
            },
            {
                titulo:      "Endpoints de usuarios",
                descripcion: "CRUD completo para gestión de usuarios",
                estado:      "DONE",
                prioridad:   "MEDIA",
                project_id:  proyectoB.id_proyecto,
                assigned_to: carlos.id_usuario,
                created_by:  admin.id_usuario,
                due_date:    "2025-03-01",
            },
            {
                titulo:      "Configurar base de datos",
                descripcion: "Crear tablas y relaciones en PostgreSQL",
                estado:      "DONE",
                prioridad:   "ALTA",
                project_id:  proyectoB.id_proyecto,
                assigned_to: admin.id_usuario,
                created_by:  admin.id_usuario,
                due_date:    "2025-02-15",
            },
            {
                titulo:      "Documentar API",
                descripcion: "Documentar todos los endpoints con Swagger",
                estado:      "IN_PROGRESS",
                prioridad:   "BAJA",
                project_id:  proyectoB.id_proyecto,
                assigned_to: maria.id_usuario,
                created_by:  admin.id_usuario,
                due_date:    "2025-05-01",
            },
        ])
        .returning(["id_tarea", "titulo"])


    await knex("comments").insert([
        { contenido: "Recuerda usar Tailwind para el diseño", task_id: tarea1.id_tarea, user_id: maria.id_usuario },
        { contenido: "El token ya se está generando correctamente", task_id: tarea2.id_tarea, user_id: carlos.id_usuario },
        { contenido: "Endpoints listos y testeados en Postman", task_id: tarea3.id_tarea, user_id: carlos.id_usuario },
    ])

    console.log("✅ Seeder ejecutado correctamente")
    console.log(`   👤 Usuarios: ${admin.nombre} (Admin), ${maria.nombre} (PM), ${carlos.nombre} (Dev)`)
    console.log(`   📁 Proyectos: ${proyectoA.nombre}, ${proyectoB.nombre}`)
    console.log(`   📋 Tareas creadas: ${[tarea1, tarea2, tarea3, tarea4, tarea5].map(t => t.titulo).join(", ")}`)
}
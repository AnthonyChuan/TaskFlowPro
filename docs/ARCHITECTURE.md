# Decisiones Técnicas — TaskFlow Pro

## 1. Stack elegido y justificación

### Backend — Node.js + Express + PostgreSQL

**Node.js con Express** fue elegido por su ecosistema maduro para APIs REST.

**PostgreSQL** fue elegido sobre alternativas NoSQL porque el dominio del problema (tareas, proyectos, usuarios con relaciones definidas) es naturalmente relacional. Las foreign keys y constraints garantizan integridad referencial sin lógica adicional en el código.

**Knex.js** se usa exclusivamente para migraciones y seeders, manteniendo el control total del SQL en las queries del repositorio.

**Argon2id** sobre bcrypt porque es el algoritmo recomendado por OWASP como primera opción para hashing de contraseñas, con mayor resistencia a ataques de GPU.

### Frontend — Next.js + shadcn/ui + Zustand

**Next.js 15** con App Router para aprovechar layouts anidados, permitiendo separar el layout de autenticación del layout del dashboard sin configuración adicional.

**shadcn/ui** sobre otras librerías de componentes porque los componentes son propios del proyecto (no una dependencia externa), lo que permite personalización total y elimina problemas de versiones.

**Zustand** sobre Redux por su API minimalista. Para el alcance de este proyecto (estado de autenticación principalmente) no se justifica la complejidad de Redux.

**Zod + React Hook Form** para validaciones del lado cliente, espejando las validaciones del backend y mejorando la experiencia de usuario con errores en tiempo real.

---

## 2. Arquitectura general


---

## 3. Patrones de diseño utilizados

### Repository Pattern
Cada módulo tiene su archivo `.repository.js` que centraliza todas las queries SQL. Esto desacopla la lógica de negocio del acceso a datos, facilitando cambios en la base de datos sin tocar los servicios.

### Service Layer
Los servicios contienen la lógica de negocio: validaciones de dominio, reglas de autorización por entidad (ej: un PM solo puede archivar sus propios proyectos), y orquestación de múltiples queries en una transacción.

### MVC adaptado
Controllers manejan exclusivamente el ciclo request/response. No contienen lógica de negocio, solo llaman al service correspondiente y formatean la respuesta con el helper `successResponse/errorResponse`.

### Módulos por dominio
La estructura no sigue carpetas por tipo (controllers/, services/) sino por dominio (usuarios/, tareas/, proyectos/), agrupando todo lo relacionado a una entidad en un mismo lugar.

---

## 4. Autenticación y autorización

### JWT Bearer Token
Al hacer login el servidor genera un JWT firmado con `TOKEN` que contiene `{ id, rol }` en el payload. El token tiene una expiración de 30 minutos

### Middleware pipeline
Cada ruta protegida pasa por dos middlewares en orden:
1. `authenticateToken` — verifica y decodifica el JWT, adjunta `req.usuario`
2. `authorizeRole([roles])` — verifica que `req.usuario.rol` esté en el array permitido

### Autorización por entidad
Además del middleware de roles, los servicios aplican reglas adicionales. Por ejemplo, un PM solo puede modificar proyectos donde es `owner_id`, validado directamente en el service antes de ejecutar la query.

---

## 5. Base de datos y relaciones
```
USERS ──────────────────────────────────────────────┐
  │ id_usuario (PK)                                  │
  │ nombre, email (UNIQUE), password, rol, activo    │
  │                                                  │
  ├──── PROJECTS (owner_id → USERS)                  │
  │       │ id_proyecto (PK)                         │
  │       │ nombre, descripcion, estado              │
  │       │                                          │
  │       └──── TASKS (project_id → PROJECTS)        │
  │               │ id_tarea (PK)                    │
  │               │ titulo, descripcion, estado      │
  │               │ prioridad, due_date              │
  │               ├── assigned_to → USERS ───────────┘
  │               ├── created_by  → USERS
  │               │
  │               └──── COMMENTS (task_id → TASKS)
  │                       id_comentario (PK)
  │                       contenido
  │                       └── user_id → USERS
```

**Decisiones de diseño:**
- `TASKS.project_id` tiene `ON DELETE CASCADE` para eliminar tareas al borrar un proyecto
- `COMMENTS.task_id` tiene `ON DELETE CASCADE` para limpiar comentarios al eliminar una tarea
- `USERS.activo` implementa soft delete recomendado en los requerimientos
- `estado` en TASKS sigue el flujo: `TODO → IN_PROGRESS → IN_REVIEW → DONE`

---

## 6. Trade-offs y mejoras futuras

### Sacrificado por tiempo

| Área | Estado actual | Mejora ideal |
|---|---|---|
| Filtros de tareas | Sin filtros en el frontend | Filtros por estado, prioridad y proyecto |
| Tests | Sin cobertura | Jest + Supertest para endpoints críticos |
| Refresh token | Token único sin refresh | Access token corto + refresh token |
| Comentarios | Modelo en BD pero sin UI | Vista de detalle de tarea con comentarios |
| Paginación frontend | Parcial | Paginación completa en todas las vistas |

### Decisiones técnicas destacadas

**pg directo sobre ORM completo:** Se eligió usar `pg` con SQL explícito en lugar de Sequelize o Prisma para tener control total de las queries.

**shadcn/ui sobre diseño propio:** Usar componentes de shadcn aceleró el desarrollo del frontend significativamente. El trade-off es una UI más estándar, pero con buena consistencia visual.
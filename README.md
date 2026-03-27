# TaskFlow Pro

Sistema de gestión de tareas y proyectos con control de acceso basado en roles. Permite a equipos de desarrollo organizar su trabajo mediante proyectos, tareas y colaboración entre usuarios con diferentes niveles de acceso.

---

## Stack utilizado

### Backend
| Tecnología | Versión |
|---|---|
| Node.js | 20.x |
| Express | 4.x |
| PostgreSQL | 16.x |
| Knex.js | 3.x |
| Nodemon | 3.1.x |
| Cors | 2.8.x |
| Dotenv | 17.x | 
| Argon2 | 0.31.x |
| JWT (jsonwebtoken) | 9.x |
| Winston | 3.x |
| Swagger (swagger-autogen + swagger-ui-express) | 2.x |

### Frontend
| Tecnología | Versión |
|---|---|
| Next.js | 15.x |
| React | 19.x |
| Tailwind CSS | 3.x |
| shadcn/ui | latest |
| Zustand | 5.x |
| Axios | 1.x |
| Zod | 3.x |
| React Hook Form | 7.x |

---

## Requisitos previos

- Node.js 20 o superior
- PostgreSQL 16 o superior
- npm 10 o superior
- pnpm 9 o superior (frontend)

---

## Instalación paso a paso

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/taskflow-pro.git
cd taskflow-pro
```

### 2. Configurar el Backend
```bash
cd backend
npm install
cp .env.example .env
```

Edita el archivo `.env` con tus datos de conexión.

### 3. Configurar el Frontend
```bash
cd ../frontend
pnpm install
cp .env.example .env
```

---

## Variables de entorno

### Backend `.env`
| Variable | Descripción | Ejemplo |
|---|---|---|
| `HOSTDB` | Host de PostgreSQL | `localhost` |
| `USERDB` | Usuario de PostgreSQL | `postgres` |
| `PASSWORDDB` | Contraseña de PostgreSQL | `tu_password` |
| `DATABASEDB` | Nombre de la base de datos | `gestor` |
| `PORTDB` | Puerto de PostgreSQL | `5432` |
| `TOKEN` | Clave secreta para JWT y argon2 | `clave_secreta_segura` |

### Frontend `.env`
| En el Frontend no se configuran variables de entorno, este hará sus peticiones a la url `http://localhost:3001/api/v1`

---

## Base de datos

### Crear la base de datos

- Crear la base de datos en postgreSQL(PGAdmin) de manera manual con el nombre `gestor`


### Ejecutar migraciones
```bash
cd backend
npx knex migrate:latest
```

### Ejecutar seeders
```bash
npx knex seed:run
```

---

## Levantar el proyecto

### Backend
```bash
cd backend
npm run dev
# Servidor en http://localhost:3001
```

### Frontend
```bash
cd frontend
pnpm run dev
# App en http://localhost:3000
```

---

## Credenciales del seeder

| Nombre | Email | Contraseña | Rol |
|---|---|---|---|
| Admin User | admin@taskflow.com | Admin123! | Admin |
| María García | maria@taskflow.com | Maria123! | Project Manager |
| Carlos López | carlos@taskflow.com | Carlos123! | Developer |

---

## Documentación de la API

Una vez levantado el backend, accede a la documentación interactiva:
```
http://localhost:3001/api-docs
```

### Endpoints principales

| Método | Endpoint | Descripción | Roles |
|---|---|---|---|
| POST | `/api/auth/login` | Iniciar sesión | Todos |
| POST | `/api/usuarios` | Crear usuario | Público |
| GET | `/api/usuario` | Listar usuarios | Admin |
| GET | `/api/usuario/me` | Ver perfil propio | Todos |
| POST | `/api/proyecto` | Crear proyecto | Admin |
| GET | `/api/proyecto` | Listar proyectos | Admin |
| GET | `/api/proyecto/pm` | Mis proyectos | PM |
| POST | `/api/tareas` | Crear tarea | Admin, PM |
| GET | `/api/tareas` | Mis tareas | Todos |
| GET | `/api/tareas/adm` | Todas las tareas | Admin |
| PUT | `/api/tareas/curso/dev` | Iniciar tarea | Developer |
| PUT | `/api/tareas/review/dev` | Enviar a revisión | Developer |
| PUT | `/api/tareas/done` | Completar tarea | Admin, PM |

---

## Estructura del proyecto
```
taskflow-pro/
├── back/
│   ├── migrations/
│   ├── logs/
│   ├── src/
│   ├── seeds/
│   │   ├── config/         # Configuración de BD, Swagger, Logger
│   │   ├── middlewares/    # Auth, roles, validación, logger, errores
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── usuarios/
│   │   │   ├── proyectos/
│   │   │   ├── tareas/
│   │   │   └── dashboard/
│   │   ├── utils/          # response.js, helpers
│   │   └── app.js  
│   ├── .env.example
│   ├── knexfile.js
│   └── package.json
├── docs/
│   └── ARCHITECTURE.md
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   └── (dashboard)/
│   │   │       ├── dashboard/
│   │   │       ├── tasks/
│   │   │       ├── projects/
│   │   │       ├── users/
│   │   │       └── admin/
│   │   ├── components/
│   │   │   ├── ui/         # shadcn components
│   │   │   ├── TareasCard/
│   │   │   ├── Proyectos/
│   │   │   └── sidebar/
│   │   │   └── ColumnasTareas/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   ├── store/
│   │   └── validators/
│   └── package.json
├── .gitignore
└── README.md
```
import { CheckSquare, FolderKanban, ShieldCheck, LayoutDashboard, Users } from "lucide-react"

export const MENU_ITEMS = [
    {
        title: "Dashboard",
        href:  "/dashboard",
        icon:  LayoutDashboard,
        roles: [1, 2, 3],
    },
    {
        title: "Mis Tareas",
        href:  "/tasks",
        icon:  CheckSquare,
        roles: [1, 2, 3],
    },
    {
        title: "Mis Proyectos",
        href:  "/projects",
        icon:  FolderKanban,
        roles: [2, 3],
    },
    {
        title: "Usuarios",
        href:  "/users",
        icon:  Users,
        roles: [3],
    },
    {
        title: "Gestión Global",
        href:  "/admin",
        icon:  ShieldCheck,
        roles: [3],
    },
]
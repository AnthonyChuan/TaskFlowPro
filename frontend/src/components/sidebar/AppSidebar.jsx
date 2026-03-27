"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { MENU_ITEMS } from "@/config/navigation"
import { useAuthStore } from "@/store/authStore"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const ROLES = {
    1: { label: "Developer",        color: "bg-blue-100 text-blue-700" },
    2: { label: "Project Manager",  color: "bg-purple-100 text-purple-700" },
    3: { label: "Admin",            color: "bg-red-100 text-red-700" },
}

const AppSidebar = ({ userRole }) => {
    const logout   = useAuthStore((state) => state.logout)
    const usuario  = useAuthStore((state) => state.usuario)
    const router   = useRouter()
    const pathname = usePathname()

    const handleLogout = () => {
        logout()
        router.push("/login")
    }

    const filteredNav = MENU_ITEMS.filter((item) =>
        item.roles.includes(Number(userRole))
    )

    const rol = ROLES[userRole] || ROLES[1]

    return (
        <Sidebar>
            <SidebarHeader className="border-b px-4 py-3">
                <div className="flex items-center gap-2">
                    
                    <div>
                        <p className="text-sm font-semibold text-slate-900">TaskFlow</p>
                        <p className="text-xs text-slate-500">Panel de gestión</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menú</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {filteredNav.map((item) => {
                                const Icon    = item.icon
                                const isActive = pathname === item.href

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            
                                            isActive={isActive}
                                            className={isActive ? "bg-slate-100 font-medium" : ""}
                                        >
                                            <Link href={item.href} className="flex items-center gap-2">
                                                <Icon className="size-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t p-3">
                <div className="mb-2 flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2">
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900">
                            {usuario?.nombre || "Usuario"}
                        </p>
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${rol.color}`}>
                            {rol.label}
                        </span>
                    </div>
                </div>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            <LogOut className="size-4" />
                            <span>Cerrar sesión</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar
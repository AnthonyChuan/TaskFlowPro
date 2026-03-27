"use client"
import { useState } from "react"
import { useProyectos } from "@/hooks/useProyectos"
import { useAuthStore } from "@/store/authStore"
import {
    archivarProyectoAdminService,
    archivarProyectoPMService,
    eliminarProyectoService,
} from "@/services/proyectos.service"
import { ModalCrearTarea } from "@/components/proyectos/ModalCrearTarea"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Plus, Archive, Trash2 } from "lucide-react"
import { ModalCrearProyecto } from "@/components/Proyectos/ModalCrearProyecto"

const ESTADO_COLOR = {
    ACTIVO:    "bg-green-100 text-green-700",
    ARCHIVADO: "bg-slate-100 text-slate-500",
}

export default function ProjectsPage() {
    const { proyectos, loading, error, refetch } = useProyectos()
    const rol = useAuthStore((state) => state.usuario?.rol)

    const [modalTarea, setModalTarea]       = useState(null)
    const [modalProyecto, setModalProyecto] = useState(false)

    const handleArchivar = async (id_proyecto) => {
        try {
            if (rol === 3) await archivarProyectoAdminService(id_proyecto)
            else           await archivarProyectoPMService(id_proyecto)
            toast.success("Proyecto archivado")
            refetch()
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al archivar")
        }
    }

    const handleEliminar = async (id_proyecto) => {
        try {
            await eliminarProyectoService(id_proyecto)
            toast.success("Proyecto eliminado")
            refetch()
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al eliminar")
        }
    }

    if (loading) return <p className="text-slate-500">Cargando proyectos...</p>
    if (error)   return <p className="text-red-500">{error}</p>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Proyectos</h1>
                    <p className="text-slate-500 text-sm">
                        {rol === 3 ? "Todos los proyectos" : "Tus proyectos"}
                    </p>
                </div>
                <Button onClick={() => setModalProyecto(true)}>
                    <Plus className="size-4 mr-1" /> Nuevo proyecto
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {proyectos.length === 0 ? (
                    <p className="text-slate-400 text-sm">Sin proyectos</p>
                ) : (
                    proyectos.map((proyecto) => (
                        <Card key={proyecto.id_proyecto} className="flex flex-col">
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="text-base">{proyecto.nombre}</CardTitle>
                                    <Badge className={`shrink-0 text-xs ${ESTADO_COLOR[proyecto.estado]}`}>
                                        {proyecto.estado}
                                    </Badge>
                                </div>
                                <p className="text-xs text-slate-400">{proyecto.descripcion}</p>
                            </CardHeader>

                            <CardContent className="flex flex-col gap-2 mt-auto pt-2">
                                <Button size="sm" className="w-full"
                                    onClick={() => setModalTarea(proyecto)}>
                                    <Plus className="size-4 mr-1" /> Nueva tarea
                                </Button>

                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="flex-1"
                                        onClick={() => handleArchivar(proyecto.id_proyecto)}>
                                        <Archive className="size-4 mr-1" /> Archivar
                                    </Button>

                                    {rol === 3 && (
                                        <Button size="sm" variant="outline"
                                            className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                                            onClick={() => handleEliminar(proyecto.id_proyecto)}>
                                            <Trash2 className="size-4 mr-1" /> Eliminar
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {modalTarea && (
                <ModalCrearTarea
                    proyecto={modalTarea}
                    onClose={() => setModalTarea(null)}
                    onSuccess={refetch}
                />
            )}

            {modalProyecto && (
                <ModalCrearProyecto
                    onClose={() => setModalProyecto(false)}
                    onSuccess={refetch}
                />
            )}
        </div>
    )
}
"use client"
import { useTareas } from "@/hooks/useTareas"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Eye, CircleDot } from "lucide-react"

const ESTADOS = [
    { key: "TODO",        label: "Por hacer",    icon: CircleDot,   color: "bg-slate-100 text-slate-700"  },
    { key: "IN_PROGRESS", label: "En progreso",  icon: Clock,       color: "bg-blue-100 text-blue-700"   },
    { key: "IN_REVIEW",   label: "En revisión",  icon: Eye,         color: "bg-yellow-100 text-yellow-700"},
    { key: "DONE",        label: "Completadas",  icon: CheckCircle, color: "bg-green-100 text-green-700" },
]

const dashboard = () => {
 const { tareas, tareasPorEstado, loading, error } = useTareas()

    if (loading) return <p className="text-slate-500">Cargando...</p>
    if (error)   return <p className="text-red-500">{error}</p>

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500 text-sm">Resumen de tus tareas</p>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {ESTADOS.map(({ key, label, icon: Icon, color }) => (
                    <Card key={key}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">
                                {label}
                            </CardTitle>
                            <Icon className="size-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-slate-900">
                                {tareasPorEstado[key].length}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                de {tareas.length} tareas totales
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                {ESTADOS.map(({ key, label, color }) => (
                    <Card key={key}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold text-slate-700">
                                    {label}
                                </CardTitle>
                                <Badge className={color}>
                                    {tareasPorEstado[key].length}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {tareasPorEstado[key].length === 0 ? (
                                <p className="text-sm text-slate-400 text-center py-4">
                                    Sin tareas
                                </p>
                            ) : (
                                tareasPorEstado[key].map((tarea) => (
                                    <div
                                        key={tarea.id_tarea}
                                        className="flex items-center justify-between rounded-lg border p-3 text-sm"
                                    >
                                        <div>
                                            <p className="font-medium text-slate-800">{tarea.titulo}</p>
                                            <p className="text-xs text-slate-400">{tarea.descripcion}</p>
                                        </div>
                                        <Badge variant="outline" className="shrink-0 ml-2 text-xs">
                                            {tarea.prioridad}
                                        </Badge>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default dashboard
"use client"
import { useTareas } from "@/hooks/useTareas"
import { ColumnasTareas } from "@/components/ColumnasTareas/ColumnasTareas"

const ESTADOS = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]

export default function tasks() {
    const { tareasPorEstado, loading, error, refetch } = useTareas()

    if (loading) return <p className="text-slate-500">Cargando tareas...</p>
    if (error)   return <p className="text-red-500">{error}</p>

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Mis Tareas</h1>
                <p className="text-slate-500 text-sm">Gestiona el estado de tus tareas</p>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
                {ESTADOS.map((estado) => (
                    <ColumnasTareas
                        key={estado}
                        estado={estado}
                        tareas={tareasPorEstado[estado]}
                        onUpdate={refetch}
                    />
                ))}
            </div>
        </div>
    )
}
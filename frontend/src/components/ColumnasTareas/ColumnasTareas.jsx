import { TareaCard } from "@/components/TareaCard/TareaCard"

const COLUMNA_STYLES = {
    TODO:        { label: "Por hacer",   header: "bg-slate-100 text-slate-700"   },
    IN_PROGRESS: { label: "En progreso", header: "bg-blue-100 text-blue-700"    },
    IN_REVIEW:   { label: "En revisión", header: "bg-yellow-100 text-yellow-700" },
    DONE:        { label: "Completadas", header: "bg-green-100 text-green-700"  },
}

export const ColumnasTareas = ({ estado, tareas, onUpdate }) => {
    const style = COLUMNA_STYLES[estado]

    return (
        <div className="flex flex-col gap-3 min-w-65">
            <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${style.header}`}>
                <span className="font-semibold text-sm">{style.label}</span>
                <span className="text-xs font-bold">{tareas.length}</span>
            </div>

            <div className="flex flex-col gap-2">
                {tareas.length === 0 ? (
                    <p className="text-center text-xs text-slate-400 py-8 border-2 border-dashed rounded-lg">
                        Sin tareas
                    </p>
                ) : (
                    tareas.map((tarea) => (
                        <TareaCard key={tarea.id_tarea} tarea={tarea} onUpdate={onUpdate} />
                    ))
                )}
            </div>
        </div>
    )
}
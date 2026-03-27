import api from "@/lib/axios"

export const getTareasService = async () => {
    const res = await api.get("/tareas")
    return res.data
}

export const iniciarTareaDevService = async (id_tarea) => {
    const res = await api.put("/tareas/curso/dev", { id_tarea })
    return res.data
}

export const revisarTareaDevService = async (id_tarea) => {
    const res = await api.put("/tareas/review/dev", { id_tarea })
    return res.data
}

export const iniciarTareaService = async (id_tarea) => {
    const res = await api.put("/tareas/curso", { id_tarea })
    return res.data
}
export const revisarTareaService = async (id_tarea) => {
    const res = await api.put("/tareas/review", { id_tarea })
    return res.data
}
export const completarTareaService = async (id_tarea) => {
    const res = await api.put("/tareas/done", { id_tarea })
    return res.data
}
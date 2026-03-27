import api from "@/lib/axios"

export const getAllTareasService = async (page = 1, limit = 10) => {
    const res = await api.get(`/tareas/adm?page=${page}&limit=${limit}`)
    return res.data
}

export const editarTareaService = async (data) => {
    const res = await api.put("/tareas/actualizar", data)
    return res.data
}

export const eliminarTareaService = async (id_tarea) => {
    const res = await api.delete("/tarea", { data: { id_tarea } })
    return res.data
}
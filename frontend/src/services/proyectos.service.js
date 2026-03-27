import api from "@/lib/axios"

export const getProyectosService = async () => {
    const res = await api.get("/proyecto")
    return res.data
}

export const getMyProyectosService = async () => {
    const res = await api.get("/proyecto/pm")
    return res.data
}

export const crearProyectoService = async (data) => {
    const res = await api.post("/proyecto", data)
    return res.data
}

export const editarProyectoService = async (data) => {
    const res = await api.put("/proyecto/editar", data)
    return res.data
}

export const archivarProyectoAdminService = async (id_proyecto) => {
    const res = await api.put("/proyecto", { id_proyecto })
    return res.data
}

export const archivarProyectoPMService = async (id_proyecto) => {
    const res = await api.put("/proyecto/pm", { id_proyecto })
    return res.data
}

export const eliminarProyectoService = async (id_proyecto) => {
    const res = await api.delete("/proyecto", { data: { id_proyecto } })
    return res.data
}

export const buscarUsuariosService = async (q) => {
    const res = await api.get(`/usuario/buscar?q=${q}`)
    return res.data
}

export const crearTareaService = async (data) => {
    const res = await api.post("/tareas", data)
    return res.data
}
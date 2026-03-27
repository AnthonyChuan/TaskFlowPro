import api from "@/lib/axios"

export const getUsuariosService = async (page = 1, limit = 10) => {
    const res = await api.get(`/usuario?page=${page}&limit=${limit}`)
    return res.data
}

export const editarUsuarioAdminService = async (data) => {
    const res = await api.put("/usuario/admin/editar", data)
    return res.data
}

export const cambiarRolPMService = async (id_usuario) => {
    const res = await api.put("/usuario/pm", { id_usuario })
    return res.data
}

export const cambiarRolAdminService = async (id_usuario) => {
    const res = await api.put("/usuario", { id_usuario })
    return res.data
}

export const cambiarEstadoService = async (id_usuario) => {
    const res = await api.put("/usuario/estado", { id_usuario })
    return res.data
}
import api from "@/lib/axios"

export const loginService = async (data) => {
    const res = await api.post("/login", data)
    return res.data
}

export const registerService = async (data) => {
    const res = await api.post("/register", data)
    return res.data
}
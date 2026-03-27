import { useState, useEffect, useCallback } from "react"
import { getProyectosService, getMyProyectosService } from "@/services/proyectos.service"
import { useAuthStore } from "@/store/authStore"

export const useProyectos = () => {
    const [proyectos, setProyectos] = useState([])
    const [loading, setLoading]     = useState(true)
    const [error, setError]         = useState(null)
    const rol = useAuthStore((state) => state.usuario?.rol)

    const fetchProyectos = useCallback(async () => {
        setLoading(true)
        try {
            const res = rol === 3
                ? await getProyectosService()
                : await getMyProyectosService()
            setProyectos(res.data)
        } catch (err) {
            setError(err.response?.data?.message || "Error al obtener proyectos")
        } finally {
            setLoading(false)
        }
    }, [rol])

    useEffect(() => { fetchProyectos() }, [fetchProyectos])

    return { proyectos, loading, error, refetch: fetchProyectos }
}
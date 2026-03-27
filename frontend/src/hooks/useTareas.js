import { useState, useEffect } from "react"
import { getTareasService } from "@/services/tareas.service"

export const useTareas = () => {
    const [tareas, setTareas]   = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

    const fetchTareas = async () => {
        setLoading(true)
        try {
            const res = await getTareasService()
            setTareas(res.data)
        } catch (err) {
            setError(err.response?.data?.message || "Error al obtener tareas")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchTareas() }, [])

    const tareasPorEstado = {
        TODO:        tareas.filter((t) => t.estado === "TODO"),
        IN_PROGRESS: tareas.filter((t) => t.estado === "IN_PROGRESS"),
        IN_REVIEW:   tareas.filter((t) => t.estado === "IN_REVIEW"),
        DONE:        tareas.filter((t) => t.estado === "DONE"),
    }

    return { tareas, tareasPorEstado, loading, error, refetch: fetchTareas }
}
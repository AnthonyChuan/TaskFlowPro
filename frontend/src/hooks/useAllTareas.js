import { useState, useEffect, useCallback } from "react"
import { getAllTareasService } from "@/services/admin.service"

export const useAllTareas = () => {
    const [tareas, setTareas]   = useState([])
    const [meta, setMeta]       = useState(null)
    const [page, setPage]       = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

    const fetchTareas = useCallback(async (p = page) => {
        setLoading(true)
        try {
            const res = await getAllTareasService(p)
            setTareas(res.data)
            setMeta(res.meta)
        } catch (err) {
            setError(err.response?.data?.message || "Error al obtener tareas")
        } finally {
            setLoading(false)
        }
    }, [page])

    useEffect(() => { fetchTareas(page) }, [page])

    return { tareas, meta, page, setPage, loading, error, refetch: fetchTareas }
}
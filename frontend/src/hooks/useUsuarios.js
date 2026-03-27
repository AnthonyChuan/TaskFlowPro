import { useState, useEffect, useCallback } from "react"
import { getUsuariosService } from "@/services/usuarios.service"

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    const [meta, setMeta]         = useState(null)
    const [page, setPage]         = useState(1)
    const [loading, setLoading]   = useState(true)
    const [error, setError]       = useState(null)

    const fetchUsuarios = useCallback(async (p = page) => {
        setLoading(true)
        try {
            const res = await getUsuariosService(p)
            setUsuarios(res.data)
            setMeta(res.meta)
        } catch (err) {
            setError(err.response?.data?.message || "Error al obtener usuarios")
        } finally {
            setLoading(false)
        }
    }, [page])

    useEffect(() => { fetchUsuarios(page) }, [page])

    return { usuarios, meta, page, setPage, loading, error, refetch: fetchUsuarios }
}
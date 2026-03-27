"use client"
import { useState, useEffect } from "react"
import { buscarUsuariosService } from "@/services/proyectos.service"
import { Input } from "@/components/ui/input"

const ROL_LABEL = { 1: "Developer", 2: "PM", 3: "Admin" }

export const BuscarUsuario = ({ onSelect }) => {
    const [query, setQuery]       = useState("")
    const [results, setResults]   = useState([])
    const [selected, setSelected] = useState(null)
    const [loading, setLoading]   = useState(false)

    useEffect(() => {
        if (query.length < 2) { setResults([]); return }
        const timeout = setTimeout(async () => {
            setLoading(true)
            try {
                const res = await buscarUsuariosService(query)
                setResults(res.data)
            } finally {
                setLoading(false)
            }
        }, 400)
        return () => clearTimeout(timeout)
    }, [query])

    const handleSelect = (usuario) => {
        setSelected(usuario)
        setQuery(usuario.nombre)
        setResults([])
        onSelect(usuario.id_usuario)
    }

    return (
        <div className="relative">
            <Input
                placeholder="Buscar por nombre o email..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(null) }}
            />
            {loading && (
                <p className="text-xs text-slate-400 mt-1">Buscando...</p>
            )}
            {results.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg overflow-hidden">
                    {results.map((u) => (
                        <button key={u.id_usuario} onClick={() => handleSelect(u)}
                            className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 text-left">
                            <div>
                                <p className="text-sm font-medium text-slate-800">{u.nombre}</p>
                                <p className="text-xs text-slate-400">{u.email}</p>
                            </div>
                            <span className="text-xs text-slate-500">{ROL_LABEL[u.rol]}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
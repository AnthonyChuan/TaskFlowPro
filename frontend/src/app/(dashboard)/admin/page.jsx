"use client"
import { useState } from "react"
import { useAllTareas } from "@/hooks/useAllTareas"
import { editarTareaService, eliminarTareaService } from "@/services/admin.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Pencil, Trash2, Calendar } from "lucide-react"

const ESTADO_COLOR = {
    TODO:        "bg-slate-100 text-slate-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    IN_REVIEW:   "bg-yellow-100 text-yellow-700",
    DONE:        "bg-green-100 text-green-700",
}

const PRIORIDAD_COLOR = {
    ALTA:  "text-red-600",
    MEDIA: "text-yellow-600",
    BAJA:  "text-green-600",
}

export default function AdminPage() {
    const { tareas, meta, page, setPage, loading, error, refetch } = useAllTareas()

    const [editando, setEditando] = useState(null)
    const [form, setForm]         = useState({})
    const [saving, setSaving]     = useState(false)

    const abrirEditar = (tarea) => {
        setEditando(tarea)
        setForm({
            id_tarea:    tarea.id_tarea,
            titulo:      tarea.titulo,
            descripcion: tarea.descripcion,
            prioridad:   tarea.prioridad,
            due_date:    tarea.due_date?.split("T")[0] || "",
        })
    }

    const handleEditar = async () => {
        setSaving(true)
        try {
            await editarTareaService(form)
            toast.success("Tarea actualizada")
            setEditando(null)
            refetch()
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al editar")
        } finally {
            setSaving(false)
        }
    }

    const handleEliminar = async (id_tarea) => {
        try {
            await eliminarTareaService(id_tarea)
            toast.success("Tarea eliminada")
            refetch()
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al eliminar")
        }
    }

    if (loading) return <p className="text-slate-500">Cargando tareas...</p>
    if (error)   return <p className="text-red-500">{error}</p>

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Gestión Global</h1>
                <p className="text-slate-500 text-sm">Todas las tareas del sistema</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-600">
                        Total: {meta?.total || 0} tareas
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {tareas.map((tarea) => (
                        <div key={tarea.id_tarea}
                            className="flex items-center justify-between rounded-lg border p-3 gap-4">

                
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-slate-800 truncate">
                                        {tarea.titulo}
                                    </p>
                                    <span className={`text-xs font-semibold shrink-0 ${PRIORIDAD_COLOR[tarea.prioridad]}`}>
                                        {tarea.prioridad}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 truncate">{tarea.descripcion}</p>
                                <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                                    <Calendar className="size-3" />
                                    <span>{new Date(tarea.due_date).toLocaleDateString("es-PE")}</span>
                                </div>
                            </div>

                            {/* Estado */}
                            <Badge className={`shrink-0 text-xs ${ESTADO_COLOR[tarea.estado]}`}>
                                {tarea.estado}
                            </Badge>

                            {/* Acciones */}
                            <div className="flex items-center gap-1 shrink-0">
                                <Button size="icon" variant="ghost" onClick={() => abrirEditar(tarea)}>
                                    <Pencil className="size-4" />
                                </Button>
                                <Button size="icon" variant="ghost"
                                    onClick={() => handleEliminar(tarea.id_tarea)}>
                                    <Trash2 className="size-4 text-red-500" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>


            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}>
                        Anterior
                    </Button>
                    <span className="text-sm text-slate-500">
                        {page} / {meta.totalPages}
                    </span>
                    <Button variant="outline" size="sm"
                        disabled={page === meta.totalPages}
                        onClick={() => setPage(page + 1)}>
                        Siguiente
                    </Button>
                </div>
            )}

            <Dialog open={!!editando} onOpenChange={() => setEditando(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Editar tarea</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-1">
                            <Label>Título</Label>
                            <Input value={form.titulo || ""}
                                onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label>Descripción</Label>
                            <Input value={form.descripcion || ""}
                                onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label>Prioridad</Label>
                            <Select value={form.prioridad}
                                onValueChange={(val) => setForm({ ...form, prioridad: val })}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALTA">Alta</SelectItem>
                                    <SelectItem value="MEDIA">Media</SelectItem>
                                    <SelectItem value="BAJA">Baja</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label>Fecha límite</Label>
                            <Input type="date" value={form.due_date || ""}
                                onChange={(e) => setForm({ ...form, due_date: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditando(null)}>Cancelar</Button>
                        <Button onClick={handleEditar} disabled={saving}>
                            {saving ? "Guardando..." : "Guardar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
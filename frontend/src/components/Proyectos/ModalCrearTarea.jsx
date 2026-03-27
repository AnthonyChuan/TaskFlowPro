"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BuscarUsuario } from "./BuscarUsuario"
import { crearTareaService } from "@/services/proyectos.service"
import { toast } from "sonner"

export const ModalCrearTarea = ({ proyecto, onClose, onSuccess }) => {
    const [form, setForm] = useState({
        titulo: "", descripcion: "", prioridad: "", due_date: "", id_usuario: null
    })
    const [saving, setSaving] = useState(false)

    const handleSubmit = async () => {
        if (!form.id_usuario) { toast.error("Debes asignar un usuario"); return }
        setSaving(true)
        try {
            await crearTareaService({ ...form, project_id: proyecto.id_proyecto })
            toast.success("Tarea creada correctamente")
            onSuccess()
            onClose()
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al crear tarea")
        } finally {
            setSaving(false)
        }
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Nueva tarea — {proyecto.nombre}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-1">
                        <Label>Título</Label>
                        <Input placeholder="Título de la tarea"
                            value={form.titulo}
                            onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
                    </div>

                    <div className="space-y-1">
                        <Label>Descripción</Label>
                        <Input placeholder="Descripción"
                            value={form.descripcion}
                            onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
                    </div>

                    <div className="space-y-1">
                        <Label>Prioridad</Label>
                        <Select onValueChange={(val) => setForm({ ...form, prioridad: val })}>
                            <SelectTrigger><SelectValue placeholder="Selecciona prioridad" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALTA">Alta</SelectItem>
                                <SelectItem value="MEDIA">Media</SelectItem>
                                <SelectItem value="BAJA">Baja</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Fecha límite</Label>
                        <Input type="date"
                            value={form.due_date}
                            onChange={(e) => setForm({ ...form, due_date: e.target.value })} />
                    </div>

                    <div className="space-y-1">
                        <Label>Asignar a</Label>
                        <BuscarUsuario onSelect={(id) => setForm({ ...form, id_usuario: id })} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit} disabled={saving}>
                        {saving ? "Creando..." : "Crear tarea"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
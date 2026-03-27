"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { crearProyectoService } from "@/services/proyectos.service"
import { toast } from "sonner"

export const ModalCrearProyecto = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState({ nombre: "", descripcion: "", estado: "ACTIVO" })
    const [saving, setSaving] = useState(false)

    const handleSubmit = async () => {
        if (!form.nombre || !form.descripcion) {
            toast.error("Completa todos los campos")
            return
        }
        setSaving(true)
        try {
            await crearProyectoService(form)
            toast.success("Proyecto creado correctamente")
            onSuccess()
            onClose()
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al crear proyecto")
        } finally {
            setSaving(false)
        }
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Nuevo proyecto</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-1">
                        <Label>Nombre</Label>
                        <Input placeholder="Nombre del proyecto"
                            value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                    </div>

                    <div className="space-y-1">
                        <Label>Descripción</Label>
                        <Input placeholder="Descripción del proyecto"
                            value={form.descripcion}
                            onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit} disabled={saving}>
                        {saving ? "Creando..." : "Crear proyecto"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
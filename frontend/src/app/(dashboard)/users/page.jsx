"use client"
import { useState } from "react"
import { useUsuarios } from "@/hooks/useUsuarios"
import { editarUsuarioAdminService, cambiarRolPMService, cambiarRolAdminService, cambiarEstadoService } from "@/services/usuarios.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Pencil, ShieldCheck, Users, PowerOff } from "lucide-react"

const ROL_INFO = {
    1: { label: "Developer",       color: "bg-blue-100 text-blue-700"   },
    2: { label: "Project Manager", color: "bg-purple-100 text-purple-700"},
    3: { label: "Admin",           color: "bg-red-100 text-red-700"     },
}

export default function Page() {
    const { usuarios, meta, page, setPage, loading, error, refetch } = useUsuarios()

    const [editando, setEditando]   = useState(null)
    const [formData, setFormData]   = useState({ nombre: "", email: "" })
    const [saving, setSaving]       = useState(false)

    const abrirEditar = (usuario) => {
        setEditando(usuario)
        setFormData({ nombre: usuario.nombre, email: usuario.email })
    }

    const handleEditar = async () => {
        setSaving(true)
        try {
            await editarUsuarioAdminService({ ...formData, id_usuario: editando.id_usuario })
            toast.success("Usuario actualizado")
            setEditando(null)
            refetch()
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al actualizar")
        } finally {
            setSaving(false)
        }
    }

    const handleCambiarRol = async (id_usuario, nuevoRol) => {
        try {
            if (nuevoRol === 2) await cambiarRolPMService(id_usuario)
            if (nuevoRol === 3) await cambiarRolAdminService(id_usuario)
            toast.success("Rol actualizado")
            refetch()
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al cambiar rol")
        }
    }

    const handleCambiarEstado = async (id_usuario) => {
        try {
            await cambiarEstadoService(id_usuario)
            toast.success("Estado actualizado")
            refetch()
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al cambiar estado")
        }
    }

    if (loading) return <p className="text-slate-500">Cargando usuarios...</p>
    if (error)   return <p className="text-red-500">{error}</p>

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Gestión de Usuarios</h1>
                <p className="text-slate-500 text-sm">Administra los usuarios del sistema</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-600">
                        Total: {meta?.total || 0} usuarios
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {usuarios.map((usuario) => (
                        <div key={usuario.id_usuario}
                            className="flex items-center justify-between rounded-lg border p-3 gap-4">

                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                                    {usuario.nombre?.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-800 truncate">{usuario.nombre}</p>
                                    <p className="text-xs text-slate-400 truncate">{usuario.email}</p>
                                </div>
                            </div>


                            <div className="flex items-center gap-2 shrink-0">
                                <Badge className={`text-xs ${ROL_INFO[usuario.rol]?.color}`}>
                                    {ROL_INFO[usuario.rol]?.label}
                                </Badge>
                                <Badge className={usuario.activo
                                    ? "bg-green-100 text-green-700"
                                    : "bg-slate-100 text-slate-500"}>
                                    {usuario.activo ? "Activo" : "Inactivo"}
                                </Badge>
                            </div>


                            <div className="flex items-center gap-1 shrink-0">
                                <Button size="icon" variant="ghost" onClick={() => abrirEditar(usuario)}
                                    title="Editar">
                                    <Pencil className="size-4" />
                                </Button>
                                <Button size="icon" variant="ghost"
                                    onClick={() => handleCambiarRol(usuario.id_usuario, 2)}
                                    title="Cambiar a PM">
                                    <Users className="size-4 text-purple-600" />
                                </Button>
                                <Button size="icon" variant="ghost"
                                    onClick={() => handleCambiarRol(usuario.id_usuario, 3)}
                                    title="Cambiar a Admin">
                                    <ShieldCheck className="size-4 text-red-600" />
                                </Button>
                                <Button size="icon" variant="ghost"
                                    onClick={() => handleCambiarEstado(usuario.id_usuario)}
                                    title={usuario.activo ? "Desactivar" : "Activar"}>
                                    <PowerOff className={`size-4 ${usuario.activo ? "text-red-500" : "text-green-500"}`} />
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar usuario</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-1">
                            <Label>Nombre</Label>
                            <Input value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
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
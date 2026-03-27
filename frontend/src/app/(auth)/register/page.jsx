"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/validators/authValidator"
import { registerService } from "@/services/auth.services"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Link from "next/link"

export default function RegisterPage() {
    const router = useRouter()

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data) => {
        try {
            const res = await registerService(data)
            toast.success("Usuario creado correctamente")
            router.push("/login")
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al registrarse")
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl text-center">TaskFlow</CardTitle>
                <p className="text-center text-slate-500">Crea tu cuenta</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-4">
                    <div className="space-y-1">
                        <Label>Nombre</Label>
                        <Input placeholder="Tu nombre" {...register("nombre")} />
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Label>Email</Label>
                        <Input type="email" placeholder="tu@email.com" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Label>Contraseña</Label>
                        <Input type="password" placeholder="••••••••" {...register("password")} />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Registrando..." : "Registrarse"}
                    </Button>

                    <p className="text-center text-sm text-slate-500">
                        ¿Ya tienes cuenta?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/validators/authValidator"
import { loginService } from "@/services/auth.services"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()
    const login  = useAuthStore((state) => state.login)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data) => {
        try {
            const res = await loginService(data)
            login(res.data.usuario, res.data.accessToken)
            toast.success(res.message)
            router.push("/dashboard")
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al iniciar sesión")
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl text-center">TaskFlow</CardTitle>
                <p className="text-center text-slate-500">Inicia sesión en tu cuenta</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-4">
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
                        {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                    </Button>

                    <p className="text-center text-sm text-slate-500">
                        ¿No tienes cuenta?{" "}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Regístrate
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}
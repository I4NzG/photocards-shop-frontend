// components/stateful-login-form.tsx
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginForm } from "@/components/login-form"
import { useNavigate } from "react-router-dom"


const loginSchema = z.object({
  username: z.string().min(3, "El nombre de usuario es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function StatefulLoginForm() {
const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include" // importante si usas sesiones/cookies en Django
      })

      if (!response.ok) {
        throw new Error("Credenciales incorrectas")
      }

      const result = await response.json()
      console.log("Login exitoso:", result)
      navigate("/dashboard") // Redirige al dashboard o a la página deseada
      
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
    }
  }

  return (
    <LoginForm<LoginFormValues>
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      fields={[
        {
          name: "username",
          label: "Usuario",
          type: "text",
          placeholder: "Tu nombre de usuario",
        },
        {
          name: "password",
          label: "Contraseña",
          type: "password",
        },
      ]}
    />
  )
}

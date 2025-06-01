import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form"

type FieldConfig = {
  name: string
  label: string
  type: string
  placeholder?: string
}

interface LoginFormProps<T extends FieldValues> {
  fields: FieldConfig[]
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  isSubmitting: boolean
  className?: string
}

export function LoginForm<T extends FieldValues>({
  className,
  register,
  onSubmit,
  errors,
  isSubmitting,
  fields,
  ...props
}: LoginFormProps<T>) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              {fields.map((field) => (
                <div key={field.name} className="grid gap-3">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name as Path<T>)} 
                  />
                  {errors[field.name as keyof T] && (
                    <p className="text-sm text-red-500">
                      {
                        errors[field.name as keyof T]?.message as
                          | string
                          | undefined
                      }
                    </p>
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  Login with Google
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

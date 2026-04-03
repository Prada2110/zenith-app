"use server"

import { ErrorResponseSchema, LoginSchema } from "@/src/schemas"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type ActionStateType = {
  errors: string[]
  redirectTo?: string
}

export async function authenticate(prevState: ActionStateType, formData: FormData) {
  const loginCredentials = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const auth = LoginSchema.safeParse(loginCredentials)
  if (!auth.success) {
    return {
      errors: auth.error.issues.map(issue => issue.message)
    }
  }

  const url = `${process.env.API_URL}/auth/iniciar-sesion`

  let json
  try {
    const req = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: auth.data.email,
        password: auth.data.password,
      })
    })
    json = await req.json()
  } catch {
    return { errors: ["Error de conexión con el servidor"] }
  }

  const result = ErrorResponseSchema.safeParse(json)
  if (!result.success) {
    return { errors: ["Respuesta inválida del servidor"] }
  }

  const data = result.data
  if (data.statusCode !== 200) {
    return { errors: [data.message] }
  }

  const cookieStore = await cookies()
  cookieStore.set('zenith_token', data.objectResponse.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })

//   console.log("=== Cookie guardada ===")
// console.log("todas las cookies:", cookieStore.getAll().map(c => c.name))

return {
  errors: [],
  redirectTo: '/'
}
}
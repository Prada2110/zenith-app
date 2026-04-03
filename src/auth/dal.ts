import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SessionSchema } from "../schemas"

export async function verifySession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('zenith_token')?.value

  // console.log("=== verifySession ===")
  // console.log("token encontrado:", !!token)

  if (!token) {
    console.log("❌ redirigiendo por falta de token")
    redirect('/autenticacion/login')
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/me`
  const req = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  })

  // console.log("auth/me status:", req.status)

  const session = await req.json()
  // console.log("session response:", session)

  const result = SessionSchema.safeParse(session)
  // console.log("schema válido:", result.success)

  if (!result.success) {
    // console.log("❌ redirigiendo por schema inválido")
    redirect('/autenticacion/login')
  }

return {
  user: {
    name: result.data.objectResponse.name,
    email: result.data.objectResponse.email
  },
  isAuth: true
}
}
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rutasPublicas = [
  '/autenticacion/login',
  '/autenticacion/registro',
  '/autenticacion/confirmar-cuenta',
  '/autenticacion/olvide-mi-contrasena',
  '/autenticacion/nueva-contrasena',
  '/autenticacion/terminos',
  '/autenticacion/privacidad',
]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('zenith_token')?.value

  const esRutaPublica = rutasPublicas.some(ruta => pathname.startsWith(ruta))

  if (!token && !esRutaPublica) {
    return NextResponse.redirect(new URL('/autenticacion/login', request.url))
  }

  if (token && esRutaPublica) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
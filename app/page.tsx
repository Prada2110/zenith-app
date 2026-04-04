import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/autenticacion/login')
}

import ForgotPasswordForm from '@/components/autenticacion/ForgotPasswordForm';
import type { Metadata } from 'next'
import Link from 'next/link';


export const metadata: Metadata = {
  title: "olvide mi contraseña - zenithApp",
  description: "olvide mi contraseña - zenithApp"
}



export default function OlvidePage() {
  return (
    <>
      <h1 className='font-black text-6xl text-purple-950'>¿olvidaste tu contraseña? </h1>
      <p className='text-3xl font-bold'>aquí puedes<span className='text-amber-500'>reestablecer</span></p>
    
      <ForgotPasswordForm />

      <nav className='mt-10 flex flex-col space-y-4'>
        <Link 
        href='/autenticacion/login'
        className='text-center text-gray-500'
        >
          ¿Ya tiene cuenta? Iniciar Sesión
        </Link>

        <Link 
        href='/autenticacion/registro'
        className='text-center text-gray-500'
        >
          ¿No tiene cuenta? Crea una
        </Link>
      </nav>
    </>
  );
} 
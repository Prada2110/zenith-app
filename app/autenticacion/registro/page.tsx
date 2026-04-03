import RegistroFormulario from '@/components/autenticacion/Registro';
import ResgistroForm from '@/components/autenticacion/RegistroForm';
import type { Metadata } from 'next'
import Link from 'next/link';


export const metadata: Metadata = {
  title: "Regitro - zenithApp",
  description: "Registro - zenithApp"
}



export default function RegistroPage() {


  
  return (
    <>
      <RegistroFormulario />

    </>
  );
}
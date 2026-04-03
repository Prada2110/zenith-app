"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Shield, Database, Eye, Lock, Users, Globe, Bell, Trash2, Scale, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const sections = [
  { id: "introduccion", title: "Introducción", icon: Shield },
  { id: "datos-recopilados", title: "Datos que Recopilamos", icon: Database },
  { id: "uso-datos", title: "Uso de los Datos", icon: Eye },
  { id: "almacenamiento", title: "Almacenamiento y Seguridad", icon: Lock },
  { id: "compartir-datos", title: "Compartir Datos", icon: Users },
  { id: "cookies", title: "Cookies y Tecnologías", icon: Globe },
  { id: "derechos", title: "Tus Derechos", icon: Scale },
  { id: "retencion", title: "Retención de Datos", icon: Trash2 },
  { id: "cambios", title: "Cambios en la Política", icon: Bell },
  { id: "contacto", title: "Contacto", icon: Mail },
]

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = React.useState("introduccion")

  React.useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }))

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="login">
                <ArrowLeft className="size-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="size-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">ZenithApp</span>
            </div>
          </div>
          <Badge variant="outline">Actualizado: Marzo 2026</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Contenido
              </h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${activeSection === section.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                  >
                    <section.icon className="size-4" />
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="max-w-3xl mx-auto">
            {/* Hero */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Politica de Privacidad
              </h1>
              <p className="mt-2 text-muted-foreground">
                Tu privacidad es importante para nosotros. Esta politica explica como recopilamos,
                usamos y protegemos tu información personal.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* 1. Introducción */}
              <section id="introduccion">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <Shield className="size-5 text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">1. Introducción</h2>
                    </div>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        En ZenithApp, nos comprometemos a proteger la privacidad y seguridad de los datos
                        personales de nuestros usuarios. Esta Politica de Privacidad describe como recopilamos,
                        utilizamos, almacenamos y protegemos la información que nos proporcionas al utilizar
                        nuestra plataforma de gestion de productos e inventario.
                      </p>
                      <p>
                        Al utilizar nuestros servicios, aceptas las practicas descritas en esta politica.
                        Te recomendamos leer este documento detenidamente para entender como manejamos tu
                        información.
                      </p>
                      <div className="rounded-lg bg-secondary/50 p-4">
                        <p className="text-sm font-medium text-foreground mb-2">Esta politica aplica a:</p>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li>Usuarios registrados de la plataforma</li>
                          <li>Visitantes de nuestro sitio web</li>
                          <li>Clientes y proveedores cuyos datos se procesen en la plataforma</li>
                          <li>Empleados de empresas que utilizan nuestros servicios</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 2. Datos que Recopilamos */}
              <section id="datos-recopilados">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
                        <Database className="size-5 text-blue-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">2. Datos que Recopilamos</h2>
                    </div>
                    <div className="space-y-6 text-muted-foreground">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">2.1 Datos de Registro y Cuenta</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Nombre completo y nombre de usuario</li>
                          <li>Direccion de correo electronico</li>
                          <li>Numero de telefono</li>
                          <li>Contraseña (almacenada de forma encriptada)</li>
                          <li>Foto de perfil (opcional)</li>
                          <li>Cargo y departamento dentro de la empresa</li>
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">2.2 Datos de la Empresa</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Nombre comercial y razon social</li>
                          <li>RFC/NIF y datos fiscales</li>
                          <li>Direccion fiscal y de operaciones</li>
                          <li>Informacion de contacto empresarial</li>
                          <li>Logotipo y elementos de marca</li>
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">2.3 Datos Operativos</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Información de productos (nombres, descripciones, precios, SKU)</li>
                          <li>Datos de inventario y movimientos de stock</li>
                          <li>Información de pedidos y transacciones</li>
                          <li>Datos de clientes y proveedores</li>
                          <li>Reportes y estadisticas generadas</li>
                          <li>Historial de actividades en la plataforma</li>
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">2.4 Datos Tecnicos</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Direccion IP y ubicacion aproximada</li>
                          <li>Tipo de navegador y sistema operativo</li>
                          <li>Dispositivo utilizado para acceder al servicio</li>
                          <li>Paginas visitadas y tiempo de sesion</li>
                          <li>Registros de acceso y errores del sistema</li>
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">2.5 Datos Financieros</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Información de metodos de pago (tokenizada, no almacenamos numeros completos)</li>
                          <li>Historial de facturacion y pagos</li>
                          <li>Datos bancarios para transferencias (si aplica)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 3. Uso de los Datos */}
              <section id="uso-datos">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
                        <Eye className="size-5 text-green-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">3. Uso de los Datos</h2>
                    </div>
                    <div className="space-y-6 text-muted-foreground">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">3.1 Provision del Servicio</h3>
                        <p className="mb-2">Utilizamos tus datos para:</p>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Crear y administrar tu cuenta de usuario</li>
                          <li>Procesar y gestionar el inventario de productos</li>
                          <li>Gestionar pedidos, ventas y compras</li>
                          <li>Generar reportes y estadisticas de negocio</li>
                          <li>Facilitar la comunicacion con clientes y proveedores</li>
                          <li>Procesar pagos y facturacion</li>
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">3.2 Mejora del Servicio</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Analizar patrones de uso para mejorar la experiencia</li>
                          <li>Desarrollar nuevas funcionalidades basadas en necesidades</li>
                          <li>Optimizar el rendimiento de la plataforma</li>
                          <li>Personalizar la interfaz segun tus preferencias</li>
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">3.3 Comunicaciones</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Enviar notificaciones sobre tu cuenta y actividad</li>
                          <li>Alertas de stock bajo, pedidos y eventos importantes</li>
                          <li>Actualizaciones del servicio y nuevas funcionalidades</li>
                          <li>Responder a consultas de soporte tecnico</li>
                          <li>Informacion sobre cambios en terminos o politicas</li>
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">3.4 Seguridad y Cumplimiento</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Detectar y prevenir fraudes o accesos no autorizados</li>
                          <li>Cumplir con obligaciones legales y regulatorias</li>
                          <li>Resolver disputas y hacer cumplir nuestros terminos</li>
                          <li>Mantener registros de auditoria requeridos por ley</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 4. Almacenamiento y Seguridad */}
              <section id="almacenamiento">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-orange-500/10">
                        <Lock className="size-5 text-orange-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">4. Almacenamiento y Seguridad</h2>
                    </div>
                    <div className="space-y-6 text-muted-foreground">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">4.1 Ubicacion de los Datos</h3>
                        <p>
                          Tus datos se almacenan en servidores seguros ubicados en centros de datos
                          certificados. Utilizamos proveedores de infraestructura en la nube que cumplen
                          con estandares internacionales de seguridad como ISO 27001, SOC 2 y GDPR.
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">4.2 Medidas de Seguridad</h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-lg bg-secondary/50 p-3">
                            <p className="font-medium text-foreground text-sm">Encriptacion</p>
                            <p className="text-xs">SSL/TLS para datos en transito, AES-256 para datos en reposo</p>
                          </div>
                          <div className="rounded-lg bg-secondary/50 p-3">
                            <p className="font-medium text-foreground text-sm">Autenticacion</p>
                            <p className="text-xs">Contraseñas hasheadas, 2FA disponible, tokens seguros</p>
                          </div>
                          <div className="rounded-lg bg-secondary/50 p-3">
                            <p className="font-medium text-foreground text-sm">Monitoreo</p>
                            <p className="text-xs">Deteccion de intrusiones 24/7, alertas automaticas</p>
                          </div>
                          <div className="rounded-lg bg-secondary/50 p-3">
                            <p className="font-medium text-foreground text-sm">Respaldos</p>
                            <p className="text-xs">Copias de seguridad diarias, recuperacion ante desastres</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">4.3 Control de Acceso</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Acceso basado en roles y permisos granulares</li>
                          <li>Principio de minimo privilegio para empleados</li>
                          <li>Registro de todos los accesos a datos sensibles</li>
                          <li>Revision periodica de permisos y accesos</li>
                        </ul>
                      </div>

                      <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                          <strong>Nota:</strong> Aunque implementamos medidas de seguridad robustas,
                          ninguna transmision por Internet es 100% segura. Te recomendamos usar
                          contraseñas fuertes y habilitar la autenticacion de dos factores.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 5. Compartir Datos */}
              <section id="compartir-datos">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10">
                        <Users className="size-5 text-purple-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">5. Compartir Datos con Terceros</h2>
                    </div>
                    <div className="space-y-6 text-muted-foreground">
                      <p>
                        No vendemos, alquilamos ni comercializamos tu informacion personal. Solo
                        compartimos datos en las siguientes circunstancias:
                      </p>

                      <div>
                        <h3 className="font-medium text-foreground mb-2">5.1 Proveedores de Servicios</h3>
                        <p className="mb-2">Compartimos datos con terceros que nos ayudan a operar:</p>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Procesadores de pago (Stripe, PayPal, Mercado Pago)</li>
                          <li>Servicios de almacenamiento en la nube</li>
                          <li>Proveedores de correo electronico transaccional</li>
                          <li>Herramientas de analisis y monitoreo</li>
                          <li>Servicios de atencion al cliente</li>
                        </ul>
                        <p className="mt-2 text-sm">
                          Todos nuestros proveedores estan obligados contractualmente a proteger tus datos
                          y usarlos solo para los fines especificados.
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">5.2 Requisitos Legales</h3>
                        <p>Podemos divulgar informacion cuando sea requerido por:</p>
                        <ul className="space-y-2 list-disc list-inside mt-2">
                          <li>Ordenes judiciales o citaciones legales</li>
                          <li>Solicitudes de autoridades gubernamentales</li>
                          <li>Cumplimiento de obligaciones fiscales o regulatorias</li>
                          <li>Proteccion de derechos, propiedad o seguridad</li>
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">5.3 Consentimiento</h3>
                        <p>
                          Podemos compartir tu informacion con terceros si nos das tu consentimiento
                          expreso para hacerlo, por ejemplo, al integrar servicios externos o al
                          participar en promociones conjuntas.
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">5.4 Transferencias Empresariales</h3>
                        <p>
                          En caso de fusion, adquisicion o venta de activos, tus datos podrian ser
                          transferidos. Te notificaremos antes de que tus datos esten sujetos a una
                          politica de privacidad diferente.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 6. Cookies y Tecnologías */}
              <section id="cookies">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-cyan-500/10">
                        <Globe className="size-5 text-cyan-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">6. Cookies y Tecnologias de Seguimiento</h2>
                    </div>
                    <div className="space-y-6 text-muted-foreground">
                      <p>
                        Utilizamos cookies y tecnologias similares para mejorar tu experiencia en
                        nuestra plataforma.
                      </p>

                      <div>
                        <h3 className="font-medium text-foreground mb-3">6.1 Tipos de Cookies</h3>
                        <div className="space-y-3">
                          <div className="rounded-lg border border-border p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-foreground">Cookies Esenciales</p>
                              <Badge variant="secondary">Requeridas</Badge>
                            </div>
                            <p className="text-sm">
                              Necesarias para el funcionamiento basico: autenticacion, preferencias de
                              sesion, seguridad.
                            </p>
                          </div>
                          <div className="rounded-lg border border-border p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-foreground">Cookies de Rendimiento</p>
                              <Badge variant="outline">Opcionales</Badge>
                            </div>
                            <p className="text-sm">
                              Nos ayudan a entender como usas la plataforma para mejorar el rendimiento.
                            </p>
                          </div>
                          <div className="rounded-lg border border-border p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-foreground">Cookies de Funcionalidad</p>
                              <Badge variant="outline">Opcionales</Badge>
                            </div>
                            <p className="text-sm">
                              Recuerdan tus preferencias como idioma, zona horaria y personalizaciones.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-foreground mb-2">6.2 Control de Cookies</h3>
                        <p>
                          Puedes gestionar tus preferencias de cookies en cualquier momento desde la
                          configuracion de tu cuenta o a traves de la configuracion de tu navegador.
                          Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad
                          de la plataforma.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 7. Tus Derechos */}
              <section id="derechos">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-pink-500/10">
                        <Scale className="size-5 text-pink-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">7. Tus Derechos</h2>
                    </div>
                    <div className="space-y-6 text-muted-foreground">
                      <p>
                        Tienes derechos sobre tus datos personales de acuerdo con las leyes de
                        proteccion de datos aplicables:
                      </p>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-secondary/50 p-4">
                          <h4 className="font-medium text-foreground mb-1">Derecho de Acceso</h4>
                          <p className="text-sm">Solicitar una copia de los datos personales que tenemos sobre ti.</p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-4">
                          <h4 className="font-medium text-foreground mb-1">Derecho de Rectificacion</h4>
                          <p className="text-sm">Corregir datos inexactos o incompletos en tu cuenta.</p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-4">
                          <h4 className="font-medium text-foreground mb-1">Derecho de Eliminacion</h4>
                          <p className="text-sm">Solicitar la eliminacion de tus datos personales.</p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-4">
                          <h4 className="font-medium text-foreground mb-1">Derecho de Portabilidad</h4>
                          <p className="text-sm">Recibir tus datos en un formato estructurado y transferible.</p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-4">
                          <h4 className="font-medium text-foreground mb-1">Derecho de Oposicion</h4>
                          <p className="text-sm">Oponerte al procesamiento de tus datos para ciertos fines.</p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-4">
                          <h4 className="font-medium text-foreground mb-1">Derecho de Limitacion</h4>
                          <p className="text-sm">Restringir el procesamiento de tus datos en ciertas circunstancias.</p>
                        </div>
                      </div>

                      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                        <p className="text-sm">
                          <strong className="text-foreground">Como ejercer tus derechos:</strong> Puedes
                          ejercer estos derechos desde la seccion de configuracion de tu cuenta o
                          contactandonos directamente a <span className="text-primary">privacidad@zenithApp.com</span>.
                          Responderemos a tu solicitud en un plazo maximo de 30 dias.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 8. Retención de Datos */}
              <section id="retencion">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/10">
                        <Trash2 className="size-5 text-red-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">8. Retencion de Datos</h2>
                    </div>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Conservamos tus datos personales solo durante el tiempo necesario para cumplir
                        con los fines para los que fueron recopilados:
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                          <div className="font-mono text-sm font-bold text-primary">5 años</div>
                          <div>
                            <p className="font-medium text-foreground">Datos de cuenta activa</p>
                            <p className="text-sm">Mientras tu cuenta este activa y durante 5 años despues de la cancelacion.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                          <div className="font-mono text-sm font-bold text-primary">10 años</div>
                          <div>
                            <p className="font-medium text-foreground">Registros fiscales y contables</p>
                            <p className="text-sm">Facturas, transacciones y documentos contables segun requisitos legales.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                          <div className="font-mono text-sm font-bold text-primary">90 dias</div>
                          <div>
                            <p className="font-medium text-foreground">Registros de acceso y logs</p>
                            <p className="text-sm">Logs tecnicos de seguridad y acceso al sistema.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                          <div className="font-mono text-sm font-bold text-primary">30 dias</div>
                          <div>
                            <p className="font-medium text-foreground">Datos eliminados</p>
                            <p className="text-sm">Tiempo maximo para eliminar completamente datos tras solicitud.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 9. Cambios en la Política */}
              <section id="cambios">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-yellow-500/10">
                        <Bell className="size-5 text-yellow-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">9. Cambios en la Politica</h2>
                    </div>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Podemos actualizar esta Politica de Privacidad periodicamente para reflejar
                        cambios en nuestras practicas, servicios o requisitos legales.
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Te notificaremos por correo electronico sobre cambios significativos</li>
                        <li>Publicaremos un aviso destacado en la plataforma</li>
                        <li>La fecha de &quot;ultima actualizacion&quot; se modificara al inicio del documento</li>
                        <li>Para cambios materiales, solicitaremos tu consentimiento nuevamente si es necesario</li>
                      </ul>
                      <p>
                        Te recomendamos revisar esta politica periodicamente para estar informado sobre
                        como protegemos tu informacion.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 10. Contacto */}
              <section id="contacto">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-500/10">
                        <Mail className="size-5 text-indigo-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">10. Contacto</h2>
                    </div>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Si tienes preguntas, comentarios o inquietudes sobre esta Politica de Privacidad
                        o el manejo de tus datos personales, puedes contactarnos:
                      </p>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-secondary/50 p-4">
                          <p className="font-medium text-foreground mb-1">Oficial de Privacidad</p>
                          <p className="text-sm">privacidad@zenithApp.com</p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-4">
                          <p className="font-medium text-foreground mb-1">Soporte General</p>
                          <p className="text-sm">soporte@ZenithApp.com</p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-4">
                          <p className="font-medium text-foreground mb-1">Telefono</p>
                          <p className="text-sm">+52 (55) 1234-5678</p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-4">
                          <p className="font-medium text-foreground mb-1">Direccion</p>
                          <p className="text-sm">Av. Reforma 123, CDMX, Mexico</p>
                        </div>
                      </div>

                      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                        <p className="text-sm">
                          Si consideras que no hemos atendido adecuadamente tu solicitud, tienes derecho
                          a presentar una queja ante la autoridad de proteccion de datos de tu
                          jurisdiccion (INAI en Mexico, AEPD en Espana, etc.).
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-sm text-muted-foreground">
              <p>Ultima actualizacion: 29 de Marzo de 2026</p>
              <p className="mt-2">
                <Link href="terminos" className="text-primary hover:underline">
                  Ver Terminos de Servicio
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

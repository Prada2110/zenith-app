"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Package, 
  ArrowLeft,
  FileText,
  Shield,
  Users,
  CreditCard,
  AlertTriangle,
  Scale,
  Globe,
  Mail,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const sections = [
  { id: "introduccion", title: "1. Introducción", icon: FileText },
  { id: "definiciones", title: "2. Definiciones", icon: FileText },
  { id: "uso-servicio", title: "3. Uso del Servicio", icon: Users },
  { id: "cuentas", title: "4. Cuentas de Usuario", icon: Shield },
  { id: "datos", title: "5. Datos e Información", icon: Globe },
  { id: "pagos", title: "6. Pagos y Facturación", icon: CreditCard },
  { id: "propiedad", title: "7. Propiedad Intelectual", icon: Scale },
  { id: "limitaciones", title: "8. Limitaciones", icon: AlertTriangle },
  { id: "terminacion", title: "9. Terminación", icon: FileText },
  { id: "contacto", title: "10. Contacto", icon: Mail },
]

export default function TerminosPage() {
  const [activeSection, setActiveSection] = React.useState("introduccion")

  React.useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id))
      const scrollPosition = window.scrollY + 150

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.offsetTop - offset
      window.scrollTo({ top: elementPosition, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="login">
                <ArrowLeft className="size-5" />
              </Link>
            </Button>

              <div className="size-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
                <Package className="size-4 text-white" />
              </div>
              <span className="font-bold text-lg">ZenithApp</span>
   
          </div>
          <div className="text-sm text-muted-foreground">
            Ultima actualización: Marzo 2026
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                    Contenido
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`cursor-pointer w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                          activeSection === section.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <section.icon className="size-4 shrink-0" />
                        <span className="truncate">{section.title}</span>
                        {activeSection === section.id && (
                          <ChevronRight className="size-4 ml-auto shrink-0" />
                        )}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="max-w-3xl mx-auto">
            {/* Hero */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                  <Scale className="size-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Terminos de Servicio</h1>
                  <p className="text-muted-foreground">Condiciones de uso de ZenithApp</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Por favor, lee detenidamente estos terminos de servicio antes de utilizar nuestra plataforma. 
                Al acceder o usar ZenithApp, aceptas estar sujeto a estos terminos.
              </p>
            </div>

            {/* Section 1 */}
            <section id="introduccion" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
                Introducción
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Bienvenido a zenithApp, una plataforma de gestión empresarial que proporciona herramientas para 
                  administrar inventarios, pedidos, clientes, proveedores y más. Estos Terminos de Servicio 
                  (&quot;Terminos&quot;) rigen tu acceso y uso de los servicios, sitio web y aplicaciones de zenithApp 
                  (colectivamente, el &quot;Servicio&quot;).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Al crear una cuenta, acceder o utilizar el Servicio, confirmas que:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Has leido y comprendido estos Terminos</li>
                  <li>Aceptas estar legalmente vinculado por estos Terminos</li>
                  <li>Tienes al menos 18 años de edad o la mayoria de edad legal en tu jurisdiccion</li>
                  <li>Tienes la autoridad para aceptar estos Terminos en nombre de tu organización, si aplica</li>
                </ul>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Section 2 */}
            <section id="definiciones" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
                Definiciones
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-semibold text-foreground mb-1">&quot;Servicio&quot;</h4>
                  <p className="text-sm text-muted-foreground">
                    Se refiere a la plataforma ZenithApp, incluyendo todas las funcionalidades, aplicaciones, 
                    APIS y servicios relacionados.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-semibold text-foreground mb-1">&quot;Usuario&quot;</h4>
                  <p className="text-sm text-muted-foreground">
                    Cualquier persona o entidad que acceda o utilice el Servicio, ya sea como titular de cuenta, 
                    administrador o usuario autorizado.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-semibold text-foreground mb-1">&quot;Cuenta&quot;</h4>
                  <p className="text-sm text-muted-foreground">
                    El registro unico creado por un Usuario para acceder al Servicio, protegido por credenciales 
                    de autenticación.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-semibold text-foreground mb-1">&quot;Datos del Usuario&quot;</h4>
                  <p className="text-sm text-muted-foreground">
                    Toda la información, archivos, contenido y datos que el Usuario sube, almacena o procesa 
                    a través del Servicio, incluyendo inventarios, pedidos, información de clientes y proveedores.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-semibold text-foreground mb-1">&quot;Suscripcion&quot;</h4>
                  <p className="text-sm text-muted-foreground">
                    El plan de pago seleccionado por el Usuario que determina las funcionalidades, limites y 
                    costos del Servicio.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Section 3 */}
            <section id="uso-servicio" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
                Uso del Servicio
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.1 Uso Permitido</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ZenitApp te otorga una licencia limitada, no exclusiva, no transferible y revocable para 
                  acceder y utilizar el Servicio de acuerdo con estos Terminos. El Servicio esta disenado para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
                  <li>Gestion de inventarios y control de stock</li>
                  <li>Procesamiento y seguimiento de pedidos</li>
                  <li>Administracion de clientes y proveedores</li>
                  <li>Generacion de reportes y estadisticas empresariales</li>
                  <li>Facturacion y gestion financiera basica</li>
                  <li>Coordinacion de equipos y usuarios</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.2 Uso Prohíbido</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Al utilizar el Servicio, te comprometes a NO:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Violar cualquier ley, regulacion o derechos de terceros</li>
                  <li>Usar el Servicio para actividades fraudulentas, ilegales o dañinas</li>
                  <li>Intentar acceder sin autorizacion a sistemas, cuentas o datos</li>
                  <li>Distribuir malware, virus o codigo dañino</li>
                  <li>Realizar ingenieria inversa, descompilar o desensamblar el Servicio</li>
                  <li>Revender, sublicenciar o redistribuir el Servicio sin autorizacion</li>
                  <li>Sobrecargar intencionalmente los servidores o infraestructura</li>
                  <li>Recopilar datos de otros usuarios sin su consentimiento</li>
                  <li>Usar el Servicio para enviar spam o comunicaciones no solicitadas</li>
                  <li>Almacenar contenido ilegal, ofensivo o que infrinja derechos de autor</li>
                </ul>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Section 4 */}
            <section id="cuentas" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">4</span>
                Cuentas de Usuario
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.1 Registro de Cuenta</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Para acceder al Servicio, debes crear una cuenta proporcionando informacion precisa, completa 
                  y actualizada. Eres responsable de mantener la confidencialidad de tus credenciales y de todas 
                  las actividades que ocurran bajo tu cuenta.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.2 Seguridad de la Cuenta</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Te comprometes a:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
                  <li>Utilizar contraseñas seguras y unicas</li>
                  <li>Habilitar autenticacion de dos factores cuando este disponible</li>
                  <li>No compartir tus credenciales de acceso con terceros</li>
                  <li>Notificarnos inmediatamente de cualquier uso no autorizado</li>
                  <li>Cerrar sesion en dispositivos compartidos o publicos</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.3 Tipos de Usuarios</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El Servicio permite diferentes roles de usuario con distintos niveles de acceso:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>Administrador:</strong> Control total sobre la cuenta, usuarios y configuración</li>
                  <li><strong>Gerente:</strong> Acceso a reportes, gestion de inventario y pedidos</li>
                  <li><strong>Empleado:</strong> Acceso limitado segun permisos asignados</li>
                  <li><strong>Solo lectura:</strong> Visualizacion de datos sin capacidad de modificacion</li>
                </ul>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Section 5 */}
            <section id="datos" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">5</span>
                Datos e Información
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.1 Propiedad de los Datos</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Tu conservas todos los derechos de propiedad sobre los Datos del Usuario que subas al Servicio. 
                  zenithApp no reclama propiedad sobre tu contenido, incluyendo:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
                  <li>Información de productos e inventario</li>
                  <li>Datos de clientes y proveedores</li>
                  <li>Registros de pedidos y transacciones</li>
                  <li>Reportes y analisis generados</li>
                  <li>Documentos y archivos adjuntos</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.2 Licencia sobre los Datos</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Al usar el Servicio, nos otorgas una licencia limitada para procesar, almacenar y mostrar tus 
                  datos unicamente con el proposito de proporcionar el Servicio. Esta licencia termina cuando 
                  eliminas tus datos o cancelas tu cuenta.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.3 Respaldos y Recuperación</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  zenithApp realiza respaldos automaticos de los datos, pero te recomendamos mantener copias 
                  de seguridad independientes. Proporcionamos herramientas de exportacion para facilitar la 
                  portabilidad de tus datos.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.4 Confidencialidad</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nos comprometemos a mantener la confidencialidad de tus datos y a no divulgarlos a terceros, 
                  excepto cuando sea requerido por ley o con tu consentimiento expreso.
                </p>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Section 6 */}
            <section id="pagos" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">6</span>
                Pagos y Facturación
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.1 Planes y Precios</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  zenithApp ofrece diferentes planes de suscripción. Los precios estan sujetos a cambios con 
                  previo aviso de 30 dias. Los cambios de precio no afectaran el periodo de facturación actual.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.2 Facturación</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
                  <li>Las suscripciones se facturan por adelantado de forma mensual o anual</li>
                  <li>El pago se carga automaticamente al metodo de pago registrado</li>
                  <li>Las facturas estan disponibles en el panel de configuración</li>
                  <li>Los impuestos aplicables se calculan segun tu ubicacion</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.3 Reembolsos</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ofrecemos reembolso completo dentro de los primeros 14 dias de la suscripcion inicial. 
                  Despues de este periodo, los pagos no son reembolsables, excepto donde lo requiera la ley.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.4 Impago</h3>
                <p className="text-muted-foreground leading-relaxed">
                  En caso de fallo en el pago, intentaremos procesar el cargo nuevamente. Si el pago no se 
                  completa despues de 7 dias, tu cuenta puede ser suspendida o degradada a un plan gratuito 
                  con funcionalidad limitada.
                </p>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Section 7 */}
            <section id="propiedad" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">7</span>
                Propiedad Intelectual
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">7.1 Derechos de ZenithApp</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ZenithApp y sus licenciantes poseen todos los derechos sobre el Servicio, incluyendo:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
                  <li>Codigo fuente, algoritmos y tecnologia subyacente</li>
                  <li>Diseño, interfaz de usuario y experiencia de usuario</li>
                  <li>Marcas comerciales, logos y elementos de marca</li>
                  <li>Documentación, tutoriales y materiales de soporte</li>
                  <li>APIs y herramientas de desarrollo</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">7.2 Restricciones</h3>
                <p className="text-muted-foreground leading-relaxed">
                  No puedes copiar, modificar, distribuir, vender o arrendar ninguna parte del Servicio sin 
                  autorizacion escrita. El uso de nuestras marcas requiere permiso previo.
                </p>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Section 8 */}
            <section id="limitaciones" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">8</span>
                Limitaciones y Exenciones
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">8.1 Disponibilidad del Servicio</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nos esforzamos por mantener el Servicio disponible 24/7, pero no garantizamos disponibilidad 
                  ininterrumpida. Pueden ocurrir interrupciones por mantenimiento, actualizaciones o 
                  circunstancias fuera de nuestro control.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">8.2 Limitacion de Responsabilidad</h3>
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
                  <p className="text-sm text-muted-foreground">
                    EN LA MAXIMA MEDIDA PERMITIDA POR LA LEY, ZENITHAPP NO SERA RESPONSABLE POR DAÑOS INDIRECTOS, 
                    INCIDENTALES, ESPECIALES, CONSECUENTES O PUNITIVOS, INCLUYENDO PERDIDA DE BENEFICIOS, DATOS, 
                    USO O FONDO DE COMERCIO.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">8.3 Indemnizacion</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Aceptas indemnizar y mantener indemne a zenithApp de cualquier reclamo, daño o gasto 
                  derivado de tu uso del Servicio o violación de estos Terminos.
                </p>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Section 9 */}
            <section id="terminacion" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">9</span>
                Terminación
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">9.1 Cancelación por el Usuario</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Puedes cancelar tu cuenta en cualquier momento desde la configuracion. Al cancelar:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
                  <li>Tu acceso continuara hasta el final del periodo de facturación actual</li>
                  <li>Tendras 30 dias para exportar tus datos</li>
                  <li>Despues de 30 dias, tus datos seran eliminados permanentemente</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">9.2 Terminacion por ZenithApp</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Podemos suspender o terminar tu cuenta si:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Violas estos Terminos de Servicio</li>
                  <li>Realizas actividades fraudulentas o ilegales</li>
                  <li>No pagas las tarifas correspondientes</li>
                  <li>Tu uso pone en riesgo la seguridad del Servicio o otros usuarios</li>
                </ul>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Section 10 */}
            <section id="contacto" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">10</span>
                Contacto
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Si tienes preguntas sobre estos Terminos de Servicio, puedes contactarnos:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium text-foreground">ZenitthApp@gmail.com</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/50 border-border">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Centro de Ayuda</p>
                        <p className="font-medium text-foreground">help.ZenithApp.com</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Footer Note */}
            <Card className="bg-secondary/50 border-border mt-12">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  Estos Terminos de Servicio fueron actualizados por ultima vez el 15 de Marzo de 2026. 
                  Te notificaremos sobre cualquier cambio material a traves del correo electronico registrado 
                  en tu cuenta o mediante un aviso destacado en el Servicio.
                </p>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
              <Button variant="outline" asChild>
                <Link href="login">
                  <ArrowLeft className="size-4 mr-2" />
                  Volver al inicio
                </Link>
              </Button>
              <Button asChild>
                <Link href="privacidad">
                  Politica de Privacidad
                  <ChevronRight className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

"use client"

import { 
  BookOpen, 
  Play, 
  FileText, 
  Download,
  ExternalLink,
  Clock,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const guides = [
  {
    id: "1",
    title: "Guía de inicio rápido",
    description: "Aprende los conceptos básicos para comenzar a usar el sistema",
    type: "documento",
    duration: "10 min",
    isNew: true,
  },
  {
    id: "2",
    title: "Configuración inicial del sistema",
    description: "Configura tu empresa, usuarios y preferencias básicas",
    type: "video",
    duration: "15 min",
    isNew: true,
  },
  {
    id: "3",
    title: "Gestión de productos e inventario",
    description: "Domina la creación, edición y control de stock de productos",
    type: "documento",
    duration: "20 min",
    isNew: false,
  },
  {
    id: "4",
    title: "Procesamiento de pedidos",
    description: "Aprende a crear y gestionar pedidos de principio a fin",
    type: "video",
    duration: "12 min",
    isNew: false,
  },
  {
    id: "5",
    title: "Reportes y análisis de datos",
    description: "Genera reportes personalizados y analiza el rendimiento",
    type: "documento",
    duration: "15 min",
    isNew: false,
  },
  {
    id: "6",
    title: "Gestión de clientes y proveedores",
    description: "Administra tu base de clientes y relaciones con proveedores",
    type: "video",
    duration: "18 min",
    isNew: false,
  },
]

const resources = [
  {
    title: "Manual de usuario completo",
    description: "Documentación detallada de todas las funcionalidades",
    icon: FileText,
    action: "Descargar PDF",
  },
  {
    title: "Plantillas de importación",
    description: "Archivos Excel para importar productos, clientes y más",
    icon: Download,
    action: "Descargar",
  },
  {
    title: "API Documentation",
    description: "Documentación técnica para integraciones",
    icon: ExternalLink,
    action: "Ver docs",
  },
]

export function GuidesSection() {
  return (
    <div className="space-y-6">
      {/* Guías y Tutoriales */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Guías y Tutoriales</CardTitle>
          <CardDescription className="text-muted-foreground">
            Aprende a usar todas las funcionalidades del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="group flex items-start gap-4 p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${
                  guide.type === "video" ? "bg-pink-500/20 text-pink-500" : "bg-blue-500/20 text-blue-500"
                }`}>
                  {guide.type === "video" ? (
                    <Play className="size-5" />
                  ) : (
                    <BookOpen className="size-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {guide.title}
                    </h4>
                    {guide.isNew && (
                      <Badge variant="default" className="text-[10px] px-1.5 py-0">
                        Nuevo
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {guide.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="size-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{guide.duration}</span>
                    <Badge variant="outline" className="text-[10px] ml-auto">
                      {guide.type === "video" ? "Video" : "Documento"}
                    </Badge>
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recursos Descargables */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recursos Descargables</CardTitle>
          <CardDescription className="text-muted-foreground">
            Documentos y plantillas útiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-secondary/30"
              >
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <resource.icon className="size-6 text-primary" />
                </div>
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {resource.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  {resource.description}
                </p>
                <Button variant="outline" size="sm">
                  {resource.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

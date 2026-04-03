"use client"

import * as React from "react"
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const contactMethods = [
  {
    title: "Chat en vivo",
    description: "Respuesta inmediata de nuestro equipo",
    icon: MessageSquare,
    availability: "Lun-Vie 9:00-18:00",
    action: "Iniciar chat",
    status: "online",
  },
  {
    title: "Correo electrónico",
    description: "soporte@producthub.com",
    icon: Mail,
    availability: "Respuesta en 24 horas",
    action: "Enviar correo",
    status: "available",
  },
  {
    title: "Teléfono",
    description: "+52 55 1234 5678",
    icon: Phone,
    availability: "Lun-Vie 9:00-18:00",
    action: "Llamar ahora",
    status: "online",
  },
]

const ticketCategories = [
  { value: "technical", label: "Problema técnico" },
  { value: "billing", label: "Facturación y pagos" },
  { value: "feature", label: "Solicitud de función" },
  { value: "account", label: "Cuenta y acceso" },
  { value: "other", label: "Otro" },
]

const ticketPriorities = [
  { value: "low", label: "Baja" },
  { value: "medium", label: "Media" },
  { value: "high", label: "Alta" },
  { value: "urgent", label: "Urgente" },
]

export function SupportSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [formData, setFormData] = React.useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset despues de mostrar mensaje
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        subject: "",
        category: "",
        priority: "medium",
        description: "",
      })
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Metodos de contacto */}
      <div className="grid gap-4 md:grid-cols-3">
        {contactMethods.map((method) => (
          <Card key={method.title} className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <method.icon className="size-7 text-primary" />
                  </div>
                  {method.status === "online" && (
                    <span className="absolute bottom-3 right-0 size-3 rounded-full bg-green-500 border-2 border-card" />
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                  <Clock className="size-3" />
                  {method.availability}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {method.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Formulario de ticket */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Crear Ticket de Soporte</CardTitle>
          <CardDescription className="text-muted-foreground">
            Describe tu problema y te responderemos lo antes posible
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="size-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ticket enviado correctamente
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Hemos recibido tu solicitud. Te responderemos por correo electrónico en un plazo de 24 horas.
              </p>
              <Badge variant="outline" className="mt-4">
                Ticket #SUP-2024-001
              </Badge>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input
                    id="subject"
                    placeholder="Resumen breve del problema"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ticketPriorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <div className="flex items-center gap-2">
                          <span className={`size-2 rounded-full ${
                            priority.value === "urgent" ? "bg-red-500" :
                            priority.value === "high" ? "bg-orange-500" :
                            priority.value === "medium" ? "bg-yellow-500" :
                            "bg-green-500"
                          }`} />
                          {priority.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción del problema</Label>
                <Textarea
                  id="description"
                  placeholder="Describe detalladamente tu problema o solicitud. Incluye pasos para reproducir el error si aplica."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 border border-border">
                <AlertCircle className="size-4 text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Para una respuesta más rápida, incluye capturas de pantalla o información adicional que nos ayude a entender el problema.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline">
                  Adjuntar archivo
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Enviar ticket
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

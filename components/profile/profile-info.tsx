"use client"

import * as React from "react"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building2, 
  Shield, 
  Edit, 
  Camera,
  Copy,
  Check,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ProfileInfoProps {
  onEdit: () => void
}

const user = {
  id: "1",
  firstName: "Carlos",
  lastName: "Administrador",
  email: "admin@empresa.com",
  phone: "+52 555 123 4567",
  role: "Administrador",
  department: "Gerencia",
  location: "Ciudad de México, México",
  joinDate: "15 de Enero, 2023",
  lastLogin: "Hace 2 horas",
  avatar: "/placeholder-user.jpg",
  bio: "Administrador del sistema con más de 5 años de experiencia en gestión de productos y operaciones empresariales.",
  status: "active",
}

export function ProfileInfo({ onEdit }: ProfileInfoProps) {
  const [copiedField, setCopiedField] = React.useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header del perfil */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20" />
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
            <div className="relative">
              <Avatar className="size-32 border-4 border-background shadow-lg">
                <AvatarImage src={user.avatar} alt={user.firstName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="secondary" 
                className="absolute bottom-0 right-0 size-8 rounded-full shadow-md"
              >
                <Camera className="size-4" />
              </Button>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {user.firstName} {user.lastName}
                </h2>
                <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                  Activo
                </Badge>
              </div>
              <p className="text-muted-foreground">{user.role} - {user.department}</p>
            </div>
            <Button onClick={onEdit} className="gap-2">
              <Edit className="size-4" />
              Editar Perfil
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información de contacto */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">Información de Contacto</CardTitle>
            <CardDescription>Tu información personal y de contacto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Correo electrónico</p>
                  <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="size-8"
                  onClick={() => copyToClipboard(user.email, "email")}
                >
                  {copiedField === "email" ? (
                    <Check className="size-4 text-green-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Teléfono</p>
                  <p className="text-sm font-medium text-foreground">{user.phone}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="size-8"
                  onClick={() => copyToClipboard(user.phone, "phone")}
                >
                  {copiedField === "phone" ? (
                    <Check className="size-4 text-green-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Ubicación</p>
                  <p className="text-sm font-medium text-foreground">{user.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Departamento</p>
                  <p className="text-sm font-medium text-foreground">{user.department}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium text-foreground mb-2">Biografía</p>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </div>
          </CardContent>
        </Card>

        {/* Información de cuenta */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Cuenta</CardTitle>
            <CardDescription>Información de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rol</p>
                <p className="text-sm font-medium text-foreground">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Miembro desde</p>
                <p className="text-sm font-medium text-foreground">{user.joinDate}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Último acceso</p>
              <p className="text-sm font-medium text-foreground">{user.lastLogin}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

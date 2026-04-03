"use client"

import * as React from "react"
import { 
  Shield, 
  Key, 
  Smartphone, 
  History, 
  AlertTriangle,
  Check,
  X,
  Monitor,
  Globe,
  Clock,
  Save,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const loginHistory = [
  { 
    id: "1", 
    device: "Chrome en Windows", 
    location: "Ciudad de México, MX", 
    time: "Hace 5 minutos",
    current: true,
  },
  { 
    id: "2", 
    device: "Safari en iPhone", 
    location: "Ciudad de México, MX", 
    time: "Hace 2 horas",
    current: false,
  },
  { 
    id: "3", 
    device: "Firefox en macOS", 
    location: "Guadalajara, MX", 
    time: "Ayer a las 14:30",
    current: false,
  },
]

export function SecuritySettings() {
  const [twoFactor, setTwoFactor] = React.useState(false)
  const [sessionTimeout, setSessionTimeout] = React.useState("60")
  const [passwordStrength, setPasswordStrength] = React.useState(75)

  return (
    <div className="space-y-6">
      {/* Cambiar Contraseña */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Key className="size-5" />
            Cambiar Contraseña
          </CardTitle>
          <CardDescription>
            Actualiza tu contraseña regularmente para mantener tu cuenta segura
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Contraseña Actual</Label>
            <Input
              id="currentPassword"
              type="password"
              className="bg-secondary border-0 max-w-md"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nueva Contraseña</Label>
            <Input
              id="newPassword"
              type="password"
              className="bg-secondary border-0 max-w-md"
            />
            <div className="max-w-md space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fortaleza de la contraseña</span>
                <span className="text-yellow-500">Media</span>
              </div>
              <Progress value={passwordStrength} className="h-2" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              className="bg-secondary border-0 max-w-md"
            />
          </div>
          <Button className="gap-2">
            <Key className="size-4" />
            Actualizar Contraseña
          </Button>
        </CardContent>
      </Card>

      {/* Autenticación de Dos Factores */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Smartphone className="size-5" />
            Autenticación de Dos Factores (2FA)
          </CardTitle>
          <CardDescription>
            Añade una capa extra de seguridad a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-4">
              <div className={`size-12 rounded-lg flex items-center justify-center ${
                twoFactor ? "bg-green-500/20" : "bg-yellow-500/20"
              }`}>
                <Shield className={`size-6 ${twoFactor ? "text-green-500" : "text-yellow-500"}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">
                    Autenticación de Dos Factores
                  </p>
                  {twoFactor ? (
                    <Badge variant="secondary" className="bg-green-500/20 text-green-500 gap-1">
                      <Check className="size-3" />
                      Activado
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 gap-1">
                      <AlertTriangle className="size-3" />
                      Desactivado
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {twoFactor 
                    ? "Tu cuenta está protegida con autenticación de dos factores"
                    : "Protege tu cuenta con un código adicional al iniciar sesión"
                  }
                </p>
              </div>
            </div>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>
        </CardContent>
      </Card>

      {/* Sesiones Activas */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <History className="size-5" />
                Sesiones Activas
              </CardTitle>
              <CardDescription>
                Dispositivos donde has iniciado sesión
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="text-destructive">
              Cerrar Todas las Sesiones
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {loginHistory.map((session) => (
            <div 
              key={session.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Monitor className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{session.device}</p>
                    {session.current && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                        Sesión actual
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Globe className="size-3" />
                      {session.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {session.time}
                    </span>
                  </div>
                </div>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" className="text-destructive">
                  <X className="size-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Configuración de Sesión */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Clock className="size-5" />
            Configuración de Sesión
          </CardTitle>
          <CardDescription>
            Personaliza el comportamiento de tu sesión
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Tiempo de inactividad (minutos)</Label>
              <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                <SelectTrigger className="bg-secondary border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                  <SelectItem value="120">2 horas</SelectItem>
                  <SelectItem value="480">8 horas</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Tu sesión se cerrará automáticamente después de este tiempo de inactividad
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón Guardar */}
      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="size-4" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  )
}

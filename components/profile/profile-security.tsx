"use client"

import * as React from "react"
import { 
  Shield, 
  Key, 
  Smartphone, 
  Monitor, 
  MapPin, 
  Clock,
  AlertTriangle,
  Check,
  X,
  Eye,
  EyeOff,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const sessions = [
  {
    id: "1",
    device: "MacBook Pro",
    browser: "Chrome 120",
    location: "Ciudad de México, MX",
    ip: "192.168.1.100",
    lastActive: "Ahora (sesión actual)",
    isCurrent: true,
  },
  {
    id: "2",
    device: "iPhone 15",
    browser: "Safari Mobile",
    location: "Ciudad de México, MX",
    ip: "192.168.1.105",
    lastActive: "Hace 2 horas",
    isCurrent: false,
  },
  {
    id: "3",
    device: "Windows PC",
    browser: "Firefox 121",
    location: "Guadalajara, MX",
    ip: "201.140.25.80",
    lastActive: "Hace 1 día",
    isCurrent: false,
  },
]

export function ProfileSecurity() {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(true)
  const [passwordStrength, setPasswordStrength] = React.useState(0)
  const [newPassword, setNewPassword] = React.useState("")

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    setPasswordStrength(strength)
    setNewPassword(password)
  }

  const getStrengthLabel = () => {
    if (passwordStrength <= 25) return { label: "Débil", color: "text-red-500" }
    if (passwordStrength <= 50) return { label: "Regular", color: "text-orange-500" }
    if (passwordStrength <= 75) return { label: "Buena", color: "text-yellow-500" }
    return { label: "Fuerte", color: "text-green-500" }
  }

  return (
    <div className="space-y-6">
      {/* Cambiar contraseña */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Key className="size-5" />
            Cambiar Contraseña
          </CardTitle>
          <CardDescription>Actualiza tu contraseña de acceso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Contraseña Actual</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                className="bg-secondary border-0 pr-10"
                placeholder="Ingresa tu contraseña actual"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="size-4 text-muted-foreground" />
                ) : (
                  <Eye className="size-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">Nueva Contraseña</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                className="bg-secondary border-0 pr-10"
                placeholder="Ingresa tu nueva contraseña"
                onChange={(e) => checkPasswordStrength(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="size-4 text-muted-foreground" />
                ) : (
                  <Eye className="size-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {newPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Fortaleza:</span>
                  <span className={`text-xs font-medium ${getStrengthLabel().color}`}>
                    {getStrengthLabel().label}
                  </span>
                </div>
                <Progress value={passwordStrength} className="h-1" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="bg-secondary border-0 pr-10"
                placeholder="Confirma tu nueva contraseña"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4 text-muted-foreground" />
                ) : (
                  <Eye className="size-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-2">La contraseña debe tener:</p>
            <ul className="space-y-1 text-xs">
              <li className="flex items-center gap-2">
                {newPassword.length >= 8 ? (
                  <Check className="size-3 text-green-500" />
                ) : (
                  <X className="size-3 text-muted-foreground" />
                )}
                Mínimo 8 caracteres
              </li>
              <li className="flex items-center gap-2">
                {/[A-Z]/.test(newPassword) ? (
                  <Check className="size-3 text-green-500" />
                ) : (
                  <X className="size-3 text-muted-foreground" />
                )}
                Al menos una mayúscula
              </li>
              <li className="flex items-center gap-2">
                {/[0-9]/.test(newPassword) ? (
                  <Check className="size-3 text-green-500" />
                ) : (
                  <X className="size-3 text-muted-foreground" />
                )}
                Al menos un número
              </li>
              <li className="flex items-center gap-2">
                {/[^A-Za-z0-9]/.test(newPassword) ? (
                  <Check className="size-3 text-green-500" />
                ) : (
                  <X className="size-3 text-muted-foreground" />
                )}
                Al menos un carácter especial
              </li>
            </ul>
          </div>

          <Button className="w-full">Actualizar Contraseña</Button>
        </CardContent>
      </Card>

      {/* Autenticación de dos factores */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="size-5" />
            Autenticación de Dos Factores
          </CardTitle>
          <CardDescription>Añade una capa extra de seguridad a tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Smartphone className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Autenticación por App</p>
                <p className="text-xs text-muted-foreground">
                  Usa una app como Google Authenticator
                </p>
              </div>
            </div>
            <Switch 
              checked={twoFactorEnabled} 
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          {twoFactorEnabled && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">
                  2FA está activado
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Tu cuenta está protegida con autenticación de dos factores.
              </p>
            </div>
          )}

          <Button variant="outline" className="w-full">
            Configurar Códigos de Respaldo
          </Button>
        </CardContent>
      </Card>

      {/* Sesiones activas */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Monitor className="size-5" />
            Sesiones Activas
          </CardTitle>
          <CardDescription>Dispositivos donde tu cuenta está conectada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessions.map((session) => (
            <div 
              key={session.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Monitor className="size-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {session.device} - {session.browser}
                    </p>
                    {session.isCurrent && (
                      <Badge variant="default" className="text-xs">Actual</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {session.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {session.lastActive}
                    </span>
                  </div>
                </div>
              </div>
              {!session.isCurrent && (
                <Button variant="ghost" size="sm" className="text-destructive">
                  Cerrar
                </Button>
              )}
            </div>
          ))}

          <Separator />

          <Button variant="outline" className="w-full text-destructive">
            Cerrar Todas las Otras Sesiones
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

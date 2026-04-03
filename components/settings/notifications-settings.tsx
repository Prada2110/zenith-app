"use client"

import * as React from "react"
import { Bell, Mail, Smartphone, MessageSquare, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface NotificationSetting {
  id: string
  title: string
  description: string
  email: boolean
  push: boolean
  sms: boolean
}

const defaultSettings: NotificationSetting[] = [
  {
    id: "new_order",
    title: "Nuevos pedidos",
    description: "Notificación cuando se recibe un nuevo pedido",
    email: true,
    push: true,
    sms: false,
  },
  {
    id: "order_status",
    title: "Cambios de estado en pedidos",
    description: "Actualización cuando un pedido cambia de estado",
    email: true,
    push: true,
    sms: false,
  },
  {
    id: "low_stock",
    title: "Stock bajo",
    description: "Alerta cuando un producto alcanza el stock mínimo",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "out_of_stock",
    title: "Producto agotado",
    description: "Alerta cuando un producto se agota completamente",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "new_customer",
    title: "Nuevos clientes",
    description: "Notificación cuando se registra un nuevo cliente",
    email: true,
    push: false,
    sms: false,
  },
  {
    id: "payment_received",
    title: "Pagos recibidos",
    description: "Confirmación cuando se recibe un pago",
    email: true,
    push: true,
    sms: false,
  },
  {
    id: "payment_failed",
    title: "Pagos fallidos",
    description: "Alerta cuando un pago no se procesa correctamente",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "daily_summary",
    title: "Resumen diario",
    description: "Resumen de ventas y actividad del día",
    email: true,
    push: false,
    sms: false,
  },
  {
    id: "weekly_report",
    title: "Reporte semanal",
    description: "Informe semanal de rendimiento",
    email: true,
    push: false,
    sms: false,
  },
]

export function NotificationsSettings() {
  const [settings, setSettings] = React.useState<NotificationSetting[]>(defaultSettings)
  const [globalEmail, setGlobalEmail] = React.useState(true)
  const [globalPush, setGlobalPush] = React.useState(true)
  const [globalSms, setGlobalSms] = React.useState(false)

  const updateSetting = (id: string, field: "email" | "push" | "sms", value: boolean) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, [field]: value } : setting
    ))
  }

  return (
    <div className="space-y-6">
      {/* Canales de notificación */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Bell className="size-5" />
            Canales de Notificación
          </CardTitle>
          <CardDescription>
            Activa o desactiva los canales de notificación globalmente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Mail className="size-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-foreground">Correo Electrónico</p>
                <p className="text-sm text-muted-foreground">Recibe notificaciones por email</p>
              </div>
            </div>
            <Switch checked={globalEmail} onCheckedChange={setGlobalEmail} />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Bell className="size-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium text-foreground">Notificaciones Push</p>
                <p className="text-sm text-muted-foreground">Notificaciones en el navegador</p>
              </div>
            </div>
            <Switch checked={globalPush} onCheckedChange={setGlobalPush} />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Smartphone className="size-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-foreground">SMS</p>
                <p className="text-sm text-muted-foreground">Mensajes de texto a tu teléfono</p>
              </div>
            </div>
            <Switch checked={globalSms} onCheckedChange={setGlobalSms} />
          </div>
        </CardContent>
      </Card>

      {/* Configuración detallada */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <MessageSquare className="size-5" />
            Preferencias de Notificación
          </CardTitle>
          <CardDescription>
            Configura qué notificaciones deseas recibir por cada canal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-[1fr,80px,80px,80px] gap-4 pb-3 border-b border-border">
              <div className="text-sm font-medium text-muted-foreground">Notificación</div>
              <div className="text-center">
                <Mail className="size-4 mx-auto text-muted-foreground" />
              </div>
              <div className="text-center">
                <Bell className="size-4 mx-auto text-muted-foreground" />
              </div>
              <div className="text-center">
                <Smartphone className="size-4 mx-auto text-muted-foreground" />
              </div>
            </div>

            {/* Settings rows */}
            {settings.map((setting, index) => (
              <div key={setting.id}>
                <div className="grid grid-cols-[1fr,80px,80px,80px] gap-4 py-4 items-center">
                  <div>
                    <p className="font-medium text-foreground">{setting.title}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <div className="flex justify-center">
                    <Switch
                      checked={setting.email && globalEmail}
                      disabled={!globalEmail}
                      onCheckedChange={(v) => updateSetting(setting.id, "email", v)}
                    />
                  </div>
                  <div className="flex justify-center">
                    <Switch
                      checked={setting.push && globalPush}
                      disabled={!globalPush}
                      onCheckedChange={(v) => updateSetting(setting.id, "push", v)}
                    />
                  </div>
                  <div className="flex justify-center">
                    <Switch
                      checked={setting.sms && globalSms}
                      disabled={!globalSms}
                      onCheckedChange={(v) => updateSetting(setting.id, "sms", v)}
                    />
                  </div>
                </div>
                {index < settings.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Botón Guardar */}
      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="size-4" />
          Guardar Preferencias
        </Button>
      </div>
    </div>
  )
}

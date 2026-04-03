"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, AlertTriangle, CheckCircle, Truck } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "order",
    title: "Nuevo pedido #12458",
    description: "María García realizó un pedido por $1,250",
    time: "Hace 5 min",
    icon: ShoppingCart,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    id: 2,
    type: "stock",
    title: "Stock bajo - MacBook Pro",
    description: "Solo quedan 5 unidades en inventario",
    time: "Hace 15 min",
    icon: AlertTriangle,
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-500",
  },
  {
    id: 3,
    type: "product",
    title: "Producto actualizado",
    description: "iPhone 15 Pro - Precio actualizado a $1,199",
    time: "Hace 32 min",
    icon: Package,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    id: 4,
    type: "delivery",
    title: "Pedido enviado #12445",
    description: "El pedido de Carlos López ha sido despachado",
    time: "Hace 1 hora",
    icon: Truck,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-500",
  },
  {
    id: 5,
    type: "complete",
    title: "Pedido completado #12440",
    description: "Ana Martínez recibió su pedido",
    time: "Hace 2 horas",
    icon: CheckCircle,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
]

export function RecentActivity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Actividad Reciente</CardTitle>
        <CardDescription className="text-muted-foreground">
          Últimas acciones en el sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className={`rounded-full p-2 ${activity.iconBg}`}>
                <activity.icon className={`size-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

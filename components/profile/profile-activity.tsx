"use client"

import { 
  Package, 
  ShoppingCart, 
  FileText, 
  Settings, 
  UserPlus,
  Edit,
  Trash2,
  LogIn,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: "1",
    type: "product",
    action: "Creó un nuevo producto",
    target: "MacBook Pro 14\"",
    time: "Hace 2 horas",
    icon: Package,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "2",
    type: "order",
    action: "Procesó el pedido",
    target: "#ORD-2024-001",
    time: "Hace 3 horas",
    icon: ShoppingCart,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "3",
    type: "report",
    action: "Generó reporte de",
    target: "Ventas Mensuales",
    time: "Hace 5 horas",
    icon: FileText,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "4",
    type: "settings",
    action: "Actualizó configuración de",
    target: "Notificaciones",
    time: "Ayer",
    icon: Settings,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    id: "5",
    type: "user",
    action: "Agregó nuevo usuario",
    target: "María López",
    time: "Hace 2 días",
    icon: UserPlus,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
  {
    id: "6",
    type: "edit",
    action: "Editó el producto",
    target: "iPhone 15 Pro",
    time: "Hace 2 días",
    icon: Edit,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: "7",
    type: "delete",
    action: "Eliminó categoría",
    target: "Accesorios Antiguos",
    time: "Hace 3 días",
    icon: Trash2,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: "8",
    type: "login",
    action: "Inició sesión desde",
    target: "Ciudad de México",
    time: "Hace 3 días",
    icon: LogIn,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
]

const stats = [
  { label: "Productos creados", value: "128", change: "+12 este mes" },
  { label: "Pedidos procesados", value: "456", change: "+34 este mes" },
  { label: "Reportes generados", value: "23", change: "+5 este mes" },
  { label: "Horas activo", value: "186", change: "Este mes" },
]

export function ProfileActivity() {
  return (
    <div className="space-y-6">
      {/* Estadísticas de actividad */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-primary mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Historial de actividad */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Actividad Reciente</CardTitle>
          <CardDescription>Tu historial de actividad en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-0">
            {activities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="relative flex gap-4 pb-6 last:pb-0"
              >
                {/* Línea de tiempo */}
                {index !== activities.length - 1 && (
                  <div className="absolute left-5 top-10 h-full w-px bg-border" />
                )}
                
                {/* Icono */}
                <div className={`size-10 rounded-full ${activity.bgColor} flex items-center justify-center shrink-0 z-10`}>
                  <activity.icon className={`size-5 ${activity.color}`} />
                </div>
                
                {/* Contenido */}
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-sm text-foreground">
                    {activity.action}{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

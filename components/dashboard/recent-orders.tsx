"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const orders = [
  {
    id: "#12458",
    customer: "María García",
    initials: "MG",
    email: "maria@ejemplo.com",
    amount: 1250.00,
    status: "procesando",
    date: "Hoy, 14:32",
  },
  {
    id: "#12457",
    customer: "Carlos López",
    initials: "CL",
    email: "carlos@ejemplo.com",
    amount: 890.50,
    status: "enviado",
    date: "Hoy, 12:15",
  },
  {
    id: "#12456",
    customer: "Ana Martínez",
    initials: "AM",
    email: "ana@ejemplo.com",
    amount: 2340.00,
    status: "completado",
    date: "Hoy, 10:45",
  },
  {
    id: "#12455",
    customer: "Pedro Sánchez",
    initials: "PS",
    email: "pedro@ejemplo.com",
    amount: 560.75,
    status: "completado",
    date: "Ayer, 18:20",
  },
  {
    id: "#12454",
    customer: "Laura Fernández",
    initials: "LF",
    email: "laura@ejemplo.com",
    amount: 1890.00,
    status: "enviado",
    date: "Ayer, 15:00",
  },
]

const statusStyles = {
  procesando: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  enviado: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  completado: "bg-primary/20 text-primary border-primary/30",
}

const statusLabels = {
  procesando: "Procesando",
  enviado: "Enviado",
  completado: "Completado",
}

export function RecentOrders() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Pedidos Recientes</CardTitle>
        <CardDescription className="text-muted-foreground">
          Últimos pedidos realizados en la tienda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    {order.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge 
                  variant="outline" 
                  className={statusStyles[order.status as keyof typeof statusStyles]}
                >
                  {statusLabels[order.status as keyof typeof statusLabels]}
                </Badge>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    ${order.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

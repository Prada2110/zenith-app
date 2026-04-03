"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Users, UserPlus, UserCheck, Repeat } from "lucide-react"

const customerGrowth = [
  { month: "Ene", nuevos: 145, activos: 1250, recurrentes: 890 },
  { month: "Feb", nuevos: 168, activos: 1380, recurrentes: 920 },
  { month: "Mar", nuevos: 189, activos: 1520, recurrentes: 980 },
  { month: "Abr", nuevos: 215, activos: 1680, recurrentes: 1050 },
  { month: "May", nuevos: 242, activos: 1850, recurrentes: 1120 },
  { month: "Jun", nuevos: 278, activos: 2050, recurrentes: 1200 },
  { month: "Jul", nuevos: 256, activos: 2180, recurrentes: 1280 },
  { month: "Ago", nuevos: 289, activos: 2350, recurrentes: 1350 },
  { month: "Sep", nuevos: 312, activos: 2580, recurrentes: 1420 },
  { month: "Oct", nuevos: 345, activos: 2820, recurrentes: 1500 },
  { month: "Nov", nuevos: 378, activos: 3050, recurrentes: 1580 },
  { month: "Dic", nuevos: 402, activos: 3284, recurrentes: 1650 },
]

const topCustomers = [
  { name: "Maria Garcia", email: "maria@email.com", orders: 45, spent: 125800, since: "2022" },
  { name: "Juan Rodriguez", email: "juan@email.com", orders: 38, spent: 98500, since: "2023" },
  { name: "Ana Martinez", email: "ana@email.com", orders: 32, spent: 87200, since: "2022" },
  { name: "Carlos Lopez", email: "carlos@email.com", orders: 28, spent: 76400, since: "2023" },
  { name: "Sofia Hernandez", email: "sofia@email.com", orders: 25, spent: 68900, since: "2023" },
]

const customerStats = [
  { title: "Total Clientes", value: "3,284", icon: Users, change: "+15.7%" },
  { title: "Nuevos este mes", value: "402", icon: UserPlus, change: "+6.3%" },
  { title: "Clientes Activos", value: "2,156", icon: UserCheck, change: "+12.1%" },
  { title: "Tasa Retencion", value: "78.5%", icon: Repeat, change: "+2.4%" },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function CustomersStatistics() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {customerStats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                    <Badge variant="secondary" className="text-xs text-green-600 bg-green-500/10">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Grafico de crecimiento */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">Crecimiento de Clientes</CardTitle>
            <CardDescription className="text-muted-foreground">
              Evolucion mensual de la base de clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="activos" 
                    name="Activos"
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="nuevos" 
                    name="Nuevos"
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="recurrentes" 
                    name="Recurrentes"
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top clientes */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Mejores Clientes</CardTitle>
            <CardDescription className="text-muted-foreground">
              Por total de compras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.email} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-4">
                    {index + 1}
                  </span>
                  <Avatar className="size-8">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {customer.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {customer.orders} pedidos
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      ${mounted ? formatCurrency(customer.spent) : "---"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      desde {customer.since}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

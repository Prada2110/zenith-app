"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const stats = [
  {
    title: "Ingresos Totales",
    value: 2845750,
    change: 12.5,
    trend: "up",
    icon: DollarSign,
    prefix: "$",
    description: "vs mes anterior",
  },
  {
    title: "Pedidos Completados",
    value: 1847,
    change: 8.2,
    trend: "up",
    icon: ShoppingCart,
    prefix: "",
    description: "vs mes anterior",
  },
  {
    title: "Productos Vendidos",
    value: 12458,
    change: -3.1,
    trend: "down",
    icon: Package,
    prefix: "",
    description: "vs mes anterior",
  },
  {
    title: "Clientes Activos",
    value: 3284,
    change: 15.7,
    trend: "up",
    icon: Users,
    prefix: "",
    description: "vs mes anterior",
  },
]

export function StatsOverview() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <stat.icon className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stat.prefix}{mounted ? formatCurrency(stat.value) : "---"}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {stat.trend === "up" ? (
                <>
                  <ArrowUpRight className="size-4 text-green-500" />
                  <span className="text-xs text-green-500">+{stat.change}%</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="size-4 text-red-500" />
                  <span className="text-xs text-red-500">{stat.change}%</span>
                </>
              )}
              <span className="text-xs text-muted-foreground ml-1">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
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
    value: 2458750,
    change: 12.5,
    trend: "up",
    icon: DollarSign,
    prefix: "$",
  },
  {
    title: "Pedidos",
    value: 1847,
    change: 8.2,
    trend: "up",
    icon: ShoppingCart,
    prefix: "",
  },
  {
    title: "Productos Vendidos",
    value: 4562,
    change: -2.4,
    trend: "down",
    icon: Package,
    prefix: "",
  },
  {
    title: "Clientes Nuevos",
    value: 328,
    change: 15.3,
    trend: "up",
    icon: Users,
    prefix: "",
  },
]

export function ReportsStats() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="size-5 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="size-4" />
                ) : (
                  <ArrowDownRight className="size-4" />
                )}
                {Math.abs(stat.change)}%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">
                {stat.prefix}{mounted ? formatCurrency(stat.value) : "---"}
              </p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

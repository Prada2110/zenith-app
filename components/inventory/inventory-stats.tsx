"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Package, AlertTriangle, XCircle, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const stats = [
  {
    title: "Total Productos",
    value: 1248,
    change: "+12",
    changeType: "positive" as const,
    description: "productos en inventario",
    icon: Package,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Valor del Inventario",
    value: 2450000,
    isCurrency: true,
    change: "+8.2%",
    changeType: "positive" as const,
    description: "valor total",
    icon: DollarSign,
    iconBg: "bg-chart-4/10",
    iconColor: "text-chart-4",
  },
  {
    title: "Stock Bajo",
    value: 23,
    change: "+5",
    changeType: "negative" as const,
    description: "productos con alerta",
    icon: AlertTriangle,
    iconBg: "bg-chart-4/10",
    iconColor: "text-chart-4",
  },
  {
    title: "Agotados",
    value: 8,
    change: "-2",
    changeType: "positive" as const,
    description: "productos sin stock",
    icon: XCircle,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
]

export function InventoryStats() {
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
              <div className={`flex size-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`size-5 ${stat.iconColor}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                stat.changeType === "positive" ? "text-primary" : "text-destructive"
              }`}>
                {stat.changeType === "positive" ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">
                {stat.isCurrency && "$"}
                {mounted ? formatCurrency(stat.value) : "---"}
              </p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

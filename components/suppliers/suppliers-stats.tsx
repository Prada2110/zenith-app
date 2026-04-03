"use client"

import * as React from "react"
import { Truck, CheckCircle, AlertTriangle, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SuppliersStatsProps {
  totalSuppliers: number
  activeSuppliers: number
  pendingOrders: number
  totalPurchases: number
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function SuppliersStats({ 
  totalSuppliers, 
  activeSuppliers, 
  pendingOrders, 
  totalPurchases 
}: SuppliersStatsProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    {
      title: "Total Proveedores",
      value: totalSuppliers.toString(),
      icon: Truck,
      change: "+3",
      trend: "up" as const,
      description: "vs mes anterior",
    },
    {
      title: "Proveedores Activos",
      value: activeSuppliers.toString(),
      icon: CheckCircle,
      change: "+2",
      trend: "up" as const,
      description: "actualmente",
    },
    {
      title: "Pedidos Pendientes",
      value: pendingOrders.toString(),
      icon: AlertTriangle,
      change: "-5",
      trend: "down" as const,
      description: "por recibir",
    },
    {
      title: "Total Compras",
      value: mounted ? `$${formatCurrency(totalPurchases)}` : "$---",
      icon: DollarSign,
      change: "+12%",
      trend: "up" as const,
      description: "este mes",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs">
              {stat.trend === "up" ? (
                <TrendingUp className="size-3 text-green-500" />
              ) : (
                <TrendingDown className="size-3 text-red-500" />
              )}
              <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                {stat.change}
              </span>
              <span className="text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

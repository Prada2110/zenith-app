"use client"

import { Package, TrendingUp, ShoppingCart, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Productos",
    value: "1,284",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Package,
  },
  {
    title: "Ventas del Mes",
    value: "$45,231",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Pedidos Pendientes",
    value: "24",
    change: "-4.5%",
    changeType: "negative" as const,
    icon: ShoppingCart,
  },
  {
    title: "Stock Bajo",
    value: "8",
    change: "+2",
    changeType: "warning" as const,
    icon: AlertTriangle,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <p
              className={`text-xs ${
                stat.changeType === "positive"
                  ? "text-primary"
                  : stat.changeType === "negative"
                    ? "text-destructive"
                    : "text-yellow-500"
              }`}
            >
              {stat.change} desde el mes pasado
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

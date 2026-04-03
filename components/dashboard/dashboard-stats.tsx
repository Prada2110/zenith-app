"use client"

import { 
  Package, 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Ingresos Totales",
    value: "$485,231",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "vs. mes anterior",
  },
  {
    title: "Pedidos",
    value: "2,350",
    change: "+15.3%",
    changeType: "positive" as const,
    icon: ShoppingCart,
    description: "vs. mes anterior",
  },
  {
    title: "Productos Activos",
    value: "1,284",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Package,
    description: "vs. mes anterior",
  },
  {
    title: "Clientes Nuevos",
    value: "573",
    change: "-4.5%",
    changeType: "negative" as const,
    icon: Users,
    description: "vs. mes anterior",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <stat.icon className="size-5 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                stat.changeType === "positive" ? "text-primary" : "text-destructive"
              }`}>
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="size-3" />
                ) : (
                  <ArrowDownRight className="size-3" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

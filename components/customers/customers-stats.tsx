"use client"

import * as React from "react"
import { Users, UserCheck, Crown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomersStatsProps {
  totalCustomers: number
  activeCustomers: number
  vipCustomers: number
  totalRevenue: number
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function CustomersStats({ 
  totalCustomers, 
  activeCustomers, 
  vipCustomers, 
  totalRevenue 
}: CustomersStatsProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    {
      title: "Total Clientes",
      value: totalCustomers,
      icon: Users,
      description: "Clientes registrados",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Clientes Activos",
      value: activeCustomers,
      icon: UserCheck,
      description: "Con compras recientes",
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Clientes VIP",
      value: vipCustomers,
      icon: Crown,
      description: "Alto valor",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Ingresos Totales",
      value: totalRevenue,
      icon: TrendingUp,
      description: "De todos los clientes",
      trend: "+15%",
      trendUp: true,
      isCurrency: true,
    },
  ]

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
            <div className="text-2xl font-bold text-foreground">
              {stat.isCurrency ? "$" : ""}
              {mounted ? formatCurrency(stat.value) : "---"}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-medium ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>
                {stat.trend}
              </span>
              <span className="text-xs text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

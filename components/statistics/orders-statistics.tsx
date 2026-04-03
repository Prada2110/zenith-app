"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Badge } from "@/components/ui/badge"

const ordersByStatus = [
  { status: "Completados", count: 1245, color: "#22c55e" },
  { status: "Procesando", count: 342, color: "#3b82f6" },
  { status: "Enviados", count: 187, color: "#8b5cf6" },
  { status: "Pendientes", count: 89, color: "#f59e0b" },
  { status: "Cancelados", count: 45, color: "#ef4444" },
]

const ordersByDay = [
  { day: "Lun", pedidos: 145, promedio: 2450 },
  { day: "Mar", pedidos: 168, promedio: 2680 },
  { day: "Mie", pedidos: 132, promedio: 2180 },
  { day: "Jue", pedidos: 189, promedio: 3120 },
  { day: "Vie", pedidos: 245, promedio: 4250 },
  { day: "Sab", pedidos: 312, promedio: 5680 },
  { day: "Dom", pedidos: 198, promedio: 3450 },
]

export function OrdersStatistics() {
  const totalOrders = ordersByStatus.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Pedidos por estado */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Pedidos por Estado</CardTitle>
          <CardDescription className="text-muted-foreground">
            Distribucion de {totalOrders.toLocaleString()} pedidos totales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersByStatus} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                <XAxis type="number" className="text-xs fill-muted-foreground" />
                <YAxis 
                  type="category" 
                  dataKey="status" 
                  className="text-xs fill-muted-foreground" 
                  width={90}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {ordersByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {ordersByStatus.map((item) => (
              <Badge 
                key={item.status} 
                variant="outline" 
                className="gap-2"
                style={{ borderColor: item.color }}
              >
                <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.status}: {item.count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pedidos por dia */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Pedidos por Dia</CardTitle>
          <CardDescription className="text-muted-foreground">
            Actividad semanal de pedidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersByDay}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis dataKey="day" className="text-xs fill-muted-foreground" />
                <YAxis className="text-xs fill-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value: number, name: string) => [
                    name === "pedidos" ? value : `$${value.toLocaleString()}`,
                    name === "pedidos" ? "Pedidos" : "Promedio"
                  ]}
                />
                <Bar dataKey="pedidos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">1,389</p>
              <p className="text-xs text-muted-foreground">Total semanal</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">198</p>
              <p className="text-xs text-muted-foreground">Promedio diario</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">Sab</p>
              <p className="text-xs text-muted-foreground">Dia mas activo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

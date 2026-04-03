"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { day: "Lun", completados: 45, pendientes: 12 },
  { day: "Mar", completados: 52, pendientes: 8 },
  { day: "Mié", completados: 38, pendientes: 15 },
  { day: "Jue", completados: 65, pendientes: 10 },
  { day: "Vie", completados: 78, pendientes: 18 },
  { day: "Sáb", completados: 42, pendientes: 6 },
  { day: "Dom", completados: 28, pendientes: 4 },
]

export function OrdersChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Pedidos de la Semana</CardTitle>
        <CardDescription className="text-muted-foreground">
          Estado de pedidos completados vs pendientes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.005 250)" vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke="oklch(0.60 0 0)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="oklch(0.60 0 0)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.17 0.005 250)",
                  border: "1px solid oklch(0.28 0.005 250)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
                labelStyle={{ color: "oklch(0.60 0 0)" }}
              />
              <Bar 
                dataKey="completados" 
                fill="oklch(0.65 0.15 160)" 
                radius={[4, 4, 0, 0]}
                name="Completados"
              />
              <Bar 
                dataKey="pendientes" 
                fill="oklch(0.60 0.12 200)" 
                radius={[4, 4, 0, 0]}
                name="Pendientes"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

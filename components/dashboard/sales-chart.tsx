"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { month: "Ene", ventas: 18600, pedidos: 120 },
  { month: "Feb", ventas: 22400, pedidos: 145 },
  { month: "Mar", ventas: 19800, pedidos: 132 },
  { month: "Abr", ventas: 28700, pedidos: 178 },
  { month: "May", ventas: 32100, pedidos: 195 },
  { month: "Jun", ventas: 35400, pedidos: 210 },
  { month: "Jul", ventas: 29800, pedidos: 185 },
  { month: "Ago", ventas: 38200, pedidos: 228 },
  { month: "Sep", ventas: 42100, pedidos: 256 },
  { month: "Oct", ventas: 39500, pedidos: 242 },
  { month: "Nov", ventas: 45200, pedidos: 275 },
  { month: "Dic", ventas: 48900, pedidos: 298 },
]

export function SalesChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Resumen de Ventas</CardTitle>
        <CardDescription className="text-muted-foreground">
          Ventas mensuales del año actual
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.15 160)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.65 0.15 160)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.005 250)" vertical={false} />
              <XAxis 
                dataKey="month" 
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
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.17 0.005 250)",
                  border: "1px solid oklch(0.28 0.005 250)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Ventas"]}
                labelStyle={{ color: "oklch(0.60 0 0)" }}
              />
              <Area
                type="monotone"
                dataKey="ventas"
                stroke="oklch(0.65 0.15 160)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorVentas)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

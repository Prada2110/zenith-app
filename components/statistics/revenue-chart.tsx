"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const monthlyData = [
  { name: "Ene", ingresos: 185000, gastos: 120000, beneficio: 65000 },
  { name: "Feb", ingresos: 210000, gastos: 135000, beneficio: 75000 },
  { name: "Mar", ingresos: 195000, gastos: 125000, beneficio: 70000 },
  { name: "Abr", ingresos: 245000, gastos: 150000, beneficio: 95000 },
  { name: "May", ingresos: 280000, gastos: 165000, beneficio: 115000 },
  { name: "Jun", ingresos: 320000, gastos: 180000, beneficio: 140000 },
  { name: "Jul", ingresos: 290000, gastos: 170000, beneficio: 120000 },
  { name: "Ago", ingresos: 310000, gastos: 175000, beneficio: 135000 },
  { name: "Sep", ingresos: 340000, gastos: 190000, beneficio: 150000 },
  { name: "Oct", ingresos: 380000, gastos: 210000, beneficio: 170000 },
  { name: "Nov", ingresos: 420000, gastos: 230000, beneficio: 190000 },
  { name: "Dic", ingresos: 450000, gastos: 250000, beneficio: 200000 },
]

const weeklyData = [
  { name: "Sem 1", ingresos: 85000, gastos: 50000, beneficio: 35000 },
  { name: "Sem 2", ingresos: 92000, gastos: 55000, beneficio: 37000 },
  { name: "Sem 3", ingresos: 78000, gastos: 48000, beneficio: 30000 },
  { name: "Sem 4", ingresos: 95000, gastos: 58000, beneficio: 37000 },
]

export function RevenueChart() {
  const [period, setPeriod] = React.useState("monthly")
  const data = period === "monthly" ? monthlyData : weeklyData

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground">Ingresos vs Gastos</CardTitle>
          <CardDescription className="text-muted-foreground">
            Comparativa financiera del periodo
          </CardDescription>
        </div>
        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="weekly">Semanal</TabsTrigger>
            <TabsTrigger value="monthly">Mensual</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBeneficio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
              <YAxis 
                className="text-xs fill-muted-foreground" 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value, name) => [
    `$${Number(value ?? 0).toLocaleString()}`,
    name
  ]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="ingresos"
                name="Ingresos"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorIngresos)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="gastos"
                name="Gastos"
                stroke="hsl(var(--destructive))"
                fillOpacity={1}
                fill="url(#colorGastos)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="beneficio"
                name="Beneficio"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorBeneficio)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

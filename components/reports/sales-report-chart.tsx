"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const monthlyData = [
  { month: "Ene", ventas: 185000, costos: 120000, ganancias: 65000 },
  { month: "Feb", ventas: 215000, costos: 135000, ganancias: 80000 },
  { month: "Mar", ventas: 245000, costos: 150000, ganancias: 95000 },
  { month: "Abr", ventas: 198000, costos: 125000, ganancias: 73000 },
  { month: "May", ventas: 278000, costos: 165000, ganancias: 113000 },
  { month: "Jun", ventas: 312000, costos: 185000, ganancias: 127000 },
  { month: "Jul", ventas: 295000, costos: 175000, ganancias: 120000 },
  { month: "Ago", ventas: 342000, costos: 195000, ganancias: 147000 },
  { month: "Sep", ventas: 318000, costos: 188000, ganancias: 130000 },
  { month: "Oct", ventas: 385000, costos: 215000, ganancias: 170000 },
  { month: "Nov", ventas: 425000, costos: 235000, ganancias: 190000 },
  { month: "Dic", ventas: 478000, costos: 265000, ganancias: 213000 },
]

const weeklyData = [
  { day: "Lun", ventas: 45000, costos: 28000, ganancias: 17000 },
  { day: "Mar", ventas: 52000, costos: 32000, ganancias: 20000 },
  { day: "Mié", ventas: 48000, costos: 30000, ganancias: 18000 },
  { day: "Jue", ventas: 61000, costos: 38000, ganancias: 23000 },
  { day: "Vie", ventas: 72000, costos: 42000, ganancias: 30000 },
  { day: "Sáb", ventas: 85000, costos: 48000, ganancias: 37000 },
  { day: "Dom", ventas: 38000, costos: 24000, ganancias: 14000 },
]

type ChartType = "area" | "bar" | "line"
type Period = "weekly" | "monthly"

type ChartData = {
  label: string
  ventas: number
  costos: number
  ganancias: number
}



export function SalesReportChart() {
  const [chartType, setChartType] = React.useState<ChartType>("area")
  const [period, setPeriod] = React.useState<Period>("monthly")

  const data: ChartData[] =
  period === "monthly"
    ? monthlyData.map(item => ({
        label: item.month,
        ventas: item.ventas,
        costos: item.costos,
        ganancias: item.ganancias,
      }))
    : weeklyData.map(item => ({
        label: item.day,
        ventas: item.ventas,
        costos: item.costos,
        ganancias: item.ganancias,
      }))


  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    }

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="label" />
            <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Bar dataKey="ventas" name="Ventas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="costos" name="Costos" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ganancias" name="Ganancias" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
          </BarChart>
        )
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="label" />
            <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Line type="monotone" dataKey="ventas" name="Ventas" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
            <Line type="monotone" dataKey="costos" name="Costos" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Line type="monotone" dataKey="ganancias" name="Ganancias" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-2))' }} />
          </LineChart>
        )
      default:
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="label" />
            <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Area type="monotone" dataKey="ventas" name="Ventas" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
            <Area type="monotone" dataKey="ganancias" name="Ganancias" stackId="2" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.6} />
          </AreaChart>
        )
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-foreground">Reporte de Ventas</CardTitle>
          <CardDescription className="text-muted-foreground">
            Comparativa de ventas, costos y ganancias
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <TabsList className="h-8">
              <TabsTrigger value="weekly" className="text-xs px-3">Semanal</TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs px-3">Mensual</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs value={chartType} onValueChange={(v) => setChartType(v as ChartType)}>
            <TabsList className="h-8">
              <TabsTrigger value="area" className="text-xs px-3">Área</TabsTrigger>
              <TabsTrigger value="bar" className="text-xs px-3">Barras</TabsTrigger>
              <TabsTrigger value="line" className="text-xs px-3">Líneas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

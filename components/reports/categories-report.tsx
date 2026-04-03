"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const categories = [
  { name: "Electrónicos", value: 1252050, color: "hsl(var(--primary))", percentage: 51 },
  { name: "Audio", value: 209300, color: "hsl(var(--chart-2))", percentage: 9 },
  { name: "Wearables", value: 280800, color: "hsl(var(--chart-3))", percentage: 11 },
  { name: "Accesorios", value: 358400, color: "hsl(var(--chart-4))", percentage: 15 },
  { name: "Monitores", value: 187200, color: "hsl(var(--chart-5))", percentage: 8 },
  { name: "Otros", value: 170000, color: "hsl(var(--muted-foreground))", percentage: 6 },
]

export function CategoriesReport() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const total = categories.reduce((sum, cat) => sum + cat.value, 0)

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Ventas por Categoría</CardTitle>
        <CardDescription className="text-muted-foreground">
          Distribución de ingresos por categoría de productos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Gráfico de dona */}
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${formatCurrency(value)}`, "Ingresos"]}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Lista de categorías */}
          <div className="space-y-4">
            <div className="text-center lg:text-left">
              <p className="text-sm text-muted-foreground">Total de ventas</p>
              <p className="text-2xl font-bold text-foreground">
                ${mounted ? formatCurrency(total) : "---"}
              </p>
            </div>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="size-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-foreground">{category.name}</span>
                    </div>
                    <span className="font-medium text-foreground">
                      {category.percentage}%
                    </span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

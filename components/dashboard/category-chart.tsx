"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Electrónica", value: 35, color: "oklch(0.65 0.15 160)" },
  { name: "Ropa", value: 25, color: "oklch(0.60 0.12 200)" },
  { name: "Hogar", value: 20, color: "oklch(0.55 0.14 280)" },
  { name: "Deportes", value: 12, color: "oklch(0.70 0.16 60)" },
  { name: "Otros", value: 8, color: "oklch(0.58 0.18 350)" },
]

export function CategoryChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Ventas por Categoría</CardTitle>
        <CardDescription className="text-muted-foreground">
          Distribución de ventas por categoría de producto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.17 0.005 250)",
                  border: "1px solid oklch(0.28 0.005 250)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
                formatter={(value: number) => [`${value}%`, "Porcentaje"]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span style={{ color: "oklch(0.85 0 0)" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

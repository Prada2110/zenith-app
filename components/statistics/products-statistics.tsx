"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const categoryData = [
  { name: "Electronica", value: 35, color: "#8b5cf6" },
  { name: "Ropa", value: 25, color: "#3b82f6" },
  { name: "Hogar", value: 18, color: "#22c55e" },
  { name: "Deportes", value: 12, color: "#f59e0b" },
  { name: "Otros", value: 10, color: "#6b7280" },
]

const topProducts = [
  { 
    name: "iPhone 15 Pro Max", 
    category: "Electronica", 
    sales: 458, 
    revenue: 687000, 
    trend: "up",
    change: 12.5,
    stock: 85,
  },
  { 
    name: "MacBook Pro 14", 
    category: "Electronica", 
    sales: 312, 
    revenue: 780000, 
    trend: "up",
    change: 8.3,
    stock: 42,
  },
  { 
    name: "AirPods Pro 2", 
    category: "Electronica", 
    sales: 567, 
    revenue: 141750, 
    trend: "down",
    change: -2.1,
    stock: 156,
  },
  { 
    name: "Nike Air Max", 
    category: "Deportes", 
    sales: 423, 
    revenue: 63450, 
    trend: "up",
    change: 15.8,
    stock: 234,
  },
  { 
    name: "Samsung TV 65", 
    category: "Electronica", 
    sales: 189, 
    revenue: 283500, 
    trend: "stable",
    change: 0.5,
    stock: 28,
  },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function ProductsStatistics() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const maxSales = Math.max(...topProducts.map(p => p.sales))

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Ventas por categoria */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Ventas por Categoria</CardTitle>
          <CardDescription className="text-muted-foreground">
            Distribucion porcentual de ventas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Porcentaje"]}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top productos */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Productos Mas Vendidos</CardTitle>
          <CardDescription className="text-muted-foreground">
            Top 5 productos por unidades vendidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground w-6">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{product.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{product.category}</span>
                        <span className="text-xs text-muted-foreground">|</span>
                        <span className="text-xs text-muted-foreground">
                          ${mounted ? formatCurrency(product.revenue) : "---"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.sales} uds
                    </Badge>
                    <div className="flex items-center gap-1">
                      {product.trend === "up" ? (
                        <TrendingUp className="size-3 text-green-500" />
                      ) : product.trend === "down" ? (
                        <TrendingDown className="size-3 text-red-500" />
                      ) : (
                        <Minus className="size-3 text-muted-foreground" />
                      )}
                      <span className={`text-xs ${
                        product.trend === "up" ? "text-green-500" : 
                        product.trend === "down" ? "text-red-500" : 
                        "text-muted-foreground"
                      }`}>
                        {product.change > 0 ? "+" : ""}{product.change}%
                      </span>
                    </div>
                  </div>
                </div>
                <Progress value={(product.sales / maxSales) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

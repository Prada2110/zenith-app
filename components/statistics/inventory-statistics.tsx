"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Package, AlertTriangle, TrendingDown, CheckCircle } from "lucide-react"

const inventoryByCategory = [
  { category: "Electronica", items: 458, value: 2850000, turnover: 4.2 },
  { category: "Ropa", items: 1245, value: 450000, turnover: 6.8 },
  { category: "Hogar", items: 687, value: 380000, turnover: 3.5 },
  { category: "Deportes", items: 423, value: 290000, turnover: 5.1 },
  { category: "Belleza", items: 312, value: 180000, turnover: 7.2 },
]

const stockStatus = [
  { status: "Stock Normal", count: 1856, percentage: 72, color: "#22c55e", icon: CheckCircle },
  { status: "Stock Bajo", count: 423, percentage: 16, color: "#f59e0b", icon: TrendingDown },
  { status: "Critico", count: 189, percentage: 7, color: "#ef4444", icon: AlertTriangle },
  { status: "Agotado", count: 124, percentage: 5, color: "#6b7280", icon: Package },
]

const warehouseData = [
  { name: "Almacen A", capacity: 85, items: 1250 },
  { name: "Almacen B", capacity: 62, items: 890 },
  { name: "Almacen C", capacity: 45, items: 650 },
  { name: "Almacen D", capacity: 78, items: 1100 },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function InventoryStatistics() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const totalValue = inventoryByCategory.reduce((acc, curr) => acc + curr.value, 0)

  return (
    <div className="space-y-6">
      {/* Estado del inventario */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stockStatus.map((item) => (
          <Card key={item.status} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.status}</p>
                  <p className="text-2xl font-bold text-foreground">{item.count}</p>
                  <p className="text-xs text-muted-foreground">{item.percentage}% del total</p>
                </div>
                <div 
                  className="size-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon className="size-6" style={{ color: item.color }} />
                </div>
              </div>
              <Progress 
                value={item.percentage} 
                className="h-1.5 mt-3" 
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inventario por categoria */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Inventario por Categoria</CardTitle>
            <CardDescription className="text-muted-foreground">
              Valor total: ${mounted ? formatCurrency(totalValue) : "---"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryByCategory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                  <XAxis 
                    dataKey="category" 
                    className="text-xs fill-muted-foreground" 
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    className="text-xs fill-muted-foreground"
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`$${formatCurrency(value)}`, "Valor"]}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-5 gap-2 text-center">
                {inventoryByCategory.map((cat) => (
                  <div key={cat.category}>
                    <p className="text-xs font-medium text-foreground">{cat.items}</p>
                    <p className="text-xs text-muted-foreground">items</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capacidad de almacenes */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Capacidad de Almacenes</CardTitle>
            <CardDescription className="text-muted-foreground">
              Uso actual de espacio de almacenamiento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {warehouseData.map((warehouse) => (
                <div key={warehouse.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Package className="size-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{warehouse.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {warehouse.items.toLocaleString()} items almacenados
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={warehouse.capacity > 80 ? "destructive" : warehouse.capacity > 60 ? "secondary" : "default"}
                    >
                      {warehouse.capacity}%
                    </Badge>
                  </div>
                  <Progress 
                    value={warehouse.capacity} 
                    className={`h-2 ${
                      warehouse.capacity > 80 ? "[&>div]:bg-red-500" : 
                      warehouse.capacity > 60 ? "[&>div]:bg-yellow-500" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-foreground">67.5%</p>
                <p className="text-xs text-muted-foreground">Uso promedio</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">3,890</p>
                <p className="text-xs text-muted-foreground">Total items</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Almacenes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

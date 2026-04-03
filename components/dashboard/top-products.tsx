"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "Electrónica",
    sales: 245,
    revenue: 293755,
    progress: 100,
  },
  {
    id: 2,
    name: "MacBook Pro 14\"",
    category: "Electrónica",
    sales: 189,
    revenue: 378811,
    progress: 77,
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    category: "Electrónica",
    sales: 312,
    revenue: 77688,
    progress: 65,
  },
  {
    id: 4,
    name: "iPad Air M2",
    category: "Electrónica",
    sales: 156,
    revenue: 108264,
    progress: 54,
  },
  {
    id: 5,
    name: "Apple Watch Ultra 2",
    category: "Electrónica",
    sales: 134,
    revenue: 107066,
    progress: 45,
  },
]

export function TopProducts() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Productos Más Vendidos</CardTitle>
        <CardDescription className="text-muted-foreground">
          Top 5 productos por número de ventas este mes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    ${product.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{product.sales} ventas</p>
                </div>
              </div>
              <Progress value={product.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

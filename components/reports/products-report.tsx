"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const products = [
  {
    id: "1",
    name: "MacBook Pro 14\"",
    sku: "MBP-14-M3",
    category: "Electrónicos",
    unitsSold: 245,
    revenue: 587550,
    margin: 32,
    trend: "up",
    change: 12.5,
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    sku: "IPH-15P-256",
    category: "Electrónicos",
    unitsSold: 412,
    revenue: 494400,
    margin: 28,
    trend: "up",
    change: 8.3,
  },
  {
    id: "3",
    name: "AirPods Pro 2",
    sku: "APP-2-USB",
    category: "Audio",
    unitsSold: 628,
    revenue: 157000,
    margin: 45,
    trend: "up",
    change: 15.2,
  },
  {
    id: "4",
    name: "iPad Air",
    sku: "IPA-M2-256",
    category: "Electrónicos",
    unitsSold: 189,
    revenue: 170100,
    margin: 30,
    trend: "down",
    change: -3.4,
  },
  {
    id: "5",
    name: "Apple Watch Ultra",
    sku: "AWU-2-49",
    category: "Wearables",
    unitsSold: 156,
    revenue: 140400,
    margin: 35,
    trend: "stable",
    change: 0.5,
  },
  {
    id: "6",
    name: "Magic Keyboard",
    sku: "MK-ESP-BT",
    category: "Accesorios",
    unitsSold: 342,
    revenue: 51300,
    margin: 52,
    trend: "up",
    change: 6.8,
  },
  {
    id: "7",
    name: "Studio Display",
    sku: "SD-27-5K",
    category: "Monitores",
    unitsSold: 78,
    revenue: 124800,
    margin: 25,
    trend: "down",
    change: -8.2,
  },
  {
    id: "8",
    name: "HomePod Mini",
    sku: "HPM-2-BLK",
    category: "Audio",
    unitsSold: 523,
    revenue: 52300,
    margin: 40,
    trend: "up",
    change: 22.1,
  },
]

export function ProductsReport() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const maxRevenue = Math.max(...products.map(p => p.revenue))

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Rendimiento de Productos</CardTitle>
        <CardDescription className="text-muted-foreground">
          Productos con mejor y peor rendimiento del periodo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Producto</TableHead>
              <TableHead className="text-muted-foreground">Categoría</TableHead>
              <TableHead className="text-muted-foreground text-right">Unidades</TableHead>
              <TableHead className="text-muted-foreground">Ingresos</TableHead>
              <TableHead className="text-muted-foreground text-right">Margen</TableHead>
              <TableHead className="text-muted-foreground text-right">Tendencia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-border">
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sku}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.category}</Badge>
                </TableCell>
                <TableCell className="text-right text-foreground">
                  {product.unitsSold}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      ${mounted ? formatCurrency(product.revenue) : "---"}
                    </p>
                    <Progress 
                      value={(product.revenue / maxRevenue) * 100} 
                      className="h-1.5" 
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge 
                    variant={product.margin >= 40 ? "default" : product.margin >= 30 ? "secondary" : "outline"}
                  >
                    {product.margin}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className={`flex items-center justify-end gap-1 text-sm font-medium ${
                    product.trend === "up" ? "text-green-500" : 
                    product.trend === "down" ? "text-red-500" : "text-muted-foreground"
                  }`}>
                    {product.trend === "up" ? (
                      <TrendingUp className="size-4" />
                    ) : product.trend === "down" ? (
                      <TrendingDown className="size-4" />
                    ) : (
                      <Minus className="size-4" />
                    )}
                    {Math.abs(product.change)}%
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

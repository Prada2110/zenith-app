"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, XCircle, ShoppingCart, Package } from "lucide-react"

const alerts = [
  {
    id: "1",
    product: "iPhone 15 Pro",
    sku: "ELEC-002",
    currentStock: 8,
    minStock: 15,
    maxStock: 80,
    status: "low",
    daysToStockout: 3,
    suggestedOrder: 50,
  },
  {
    id: "2",
    product: "Magic Keyboard",
    sku: "ACCS-002",
    currentStock: 5,
    minStock: 10,
    maxStock: 40,
    status: "low",
    daysToStockout: 2,
    suggestedOrder: 30,
  },
  {
    id: "3",
    product: "iPad Air",
    sku: "ELEC-003",
    currentStock: 0,
    minStock: 10,
    maxStock: 50,
    status: "out",
    daysToStockout: 0,
    suggestedOrder: 40,
  },
  {
    id: "4",
    product: "Cargador USB-C 65W",
    sku: "ACCS-003",
    currentStock: 0,
    minStock: 25,
    maxStock: 150,
    status: "out",
    daysToStockout: 0,
    suggestedOrder: 100,
  },
]

export function LowStockAlerts() {
  const lowStockItems = alerts.filter(a => a.status === "low")
  const outOfStockItems = alerts.filter(a => a.status === "out")

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Stock Bajo */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-chart-4/10">
              <AlertTriangle className="size-4 text-chart-4" />
            </div>
            <div>
              <CardTitle className="text-foreground">Stock Bajo</CardTitle>
              <CardDescription className="text-muted-foreground">
                {lowStockItems.length} productos requieren reabastecimiento
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowStockItems.map((item) => {
              const stockPercentage = (item.currentStock / item.maxStock) * 100
              
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border border-chart-4/30 bg-chart-4/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                        <Package className="size-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.product}</p>
                        <p className="text-xs text-muted-foreground font-mono">{item.sku}</p>
                      </div>
                    </div>
                    <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">
                      {item.daysToStockout} días
                    </Badge>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        Stock: <span className="font-semibold text-chart-4">{item.currentStock}</span> / {item.maxStock}
                      </span>
                      <span className="text-muted-foreground">
                        Mín: {item.minStock}
                      </span>
                    </div>
                    <Progress value={stockPercentage} className="h-2" />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Pedido sugerido: <span className="font-semibold text-foreground">{item.suggestedOrder} uds</span>
                    </span>
                    <Button size="sm" variant="outline" className="gap-1">
                      <ShoppingCart className="size-3" />
                      Pedir
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Agotados */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-destructive/10">
              <XCircle className="size-4 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-foreground">Productos Agotados</CardTitle>
              <CardDescription className="text-muted-foreground">
                {outOfStockItems.length} productos sin stock disponible
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {outOfStockItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg border border-destructive/30 bg-destructive/5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                      <Package className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.product}</p>
                      <p className="text-xs text-muted-foreground font-mono">{item.sku}</p>
                    </div>
                  </div>
                  <Badge variant="destructive">Agotado</Badge>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">
                      Stock: <span className="font-semibold text-destructive">0</span> / {item.maxStock}
                    </span>
                    <span className="text-muted-foreground">
                      Mín: {item.minStock}
                    </span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Pedido sugerido: <span className="font-semibold text-foreground">{item.suggestedOrder} uds</span>
                  </span>
                  <Button size="sm" className="gap-1">
                    <ShoppingCart className="size-3" />
                    Pedir Urgente
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Package, RefreshCw } from "lucide-react"

const alerts = [
  {
    id: 1,
    product: "MacBook Pro 14\"",
    sku: "MBP-14-M3",
    currentStock: 5,
    minStock: 10,
    severity: "critical",
  },
  {
    id: 2,
    product: "AirPods Pro 2",
    sku: "APP-2-USB",
    currentStock: 12,
    minStock: 20,
    severity: "warning",
  },
  {
    id: 3,
    product: "iPhone 15 Pro - Negro",
    sku: "IP15P-BLK-256",
    currentStock: 8,
    minStock: 15,
    severity: "warning",
  },
  {
    id: 4,
    product: "Apple Watch Ultra 2",
    sku: "AWU2-49MM",
    currentStock: 3,
    minStock: 10,
    severity: "critical",
  },
]

const severityStyles = {
  critical: "bg-destructive/20 text-destructive border-destructive/30",
  warning: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
}

export function InventoryAlerts() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="size-5 text-yellow-500" />
            Alertas de Inventario
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Productos que requieren reabastecimiento
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="size-4" />
          Actualizar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Package className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{alert.product}</p>
                  <p className="text-xs text-muted-foreground">SKU: {alert.sku}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {alert.currentStock} / {alert.minStock}
                  </p>
                  <p className="text-xs text-muted-foreground">Stock actual / mínimo</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={severityStyles[alert.severity as keyof typeof severityStyles]}
                >
                  {alert.severity === "critical" ? "Crítico" : "Bajo"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

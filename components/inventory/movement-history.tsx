"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Minus, RotateCcw, ArrowRightLeft, Package } from "lucide-react"

const movements = [
  {
    id: "MOV-001",
    type: "entrada",
    product: "MacBook Pro 14\"",
    sku: "ELEC-001",
    quantity: 20,
    previousStock: 25,
    newStock: 45,
    reason: "Compra a proveedor",
    user: "Carlos Admin",
    date: "Hoy, 14:30",
    location: "Almacén A",
  },
  {
    id: "MOV-002",
    type: "salida",
    product: "iPhone 15 Pro",
    sku: "ELEC-002",
    quantity: 5,
    previousStock: 13,
    newStock: 8,
    reason: "Venta",
    user: "María Ventas",
    date: "Hoy, 12:15",
    location: "Tienda Principal",
  },
  {
    id: "MOV-003",
    type: "ajuste",
    product: "AirPods Pro",
    sku: "ACCS-001",
    quantity: 120,
    previousStock: 115,
    newStock: 120,
    reason: "Ajuste por conteo físico",
    user: "Carlos Admin",
    date: "Hoy, 10:00",
    location: "Almacén B",
  },
  {
    id: "MOV-004",
    type: "transferencia",
    product: "Magic Keyboard",
    sku: "ACCS-002",
    quantity: 10,
    previousStock: 15,
    newStock: 5,
    reason: "Transferencia a sucursal",
    user: "Juan Logística",
    date: "Ayer, 16:45",
    location: "Almacén B → Tienda Sucursal",
  },
  {
    id: "MOV-005",
    type: "salida",
    product: "Cargador USB-C 65W",
    sku: "ACCS-003",
    quantity: 25,
    previousStock: 25,
    newStock: 0,
    reason: "Venta",
    user: "María Ventas",
    date: "Ayer, 14:20",
    location: "Tienda Principal",
  },
  {
    id: "MOV-006",
    type: "entrada",
    product: "Samsung Galaxy S24",
    sku: "ELEC-004",
    quantity: 15,
    previousStock: 17,
    newStock: 32,
    reason: "Compra a proveedor",
    user: "Carlos Admin",
    date: "Hace 2 días",
    location: "Almacén A",
  },
]

const getTypeConfig = (type: string) => {
  switch (type) {
    case "entrada":
      return {
        icon: Plus,
        color: "text-primary",
        bgColor: "bg-primary/10",
        label: "Entrada",
        badgeClass: "bg-primary/20 text-primary border-primary/30",
      }
    case "salida":
      return {
        icon: Minus,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        label: "Salida",
        badgeClass: "bg-destructive/20 text-destructive border-destructive/30",
      }
    case "ajuste":
      return {
        icon: RotateCcw,
        color: "text-chart-4",
        bgColor: "bg-chart-4/10",
        label: "Ajuste",
        badgeClass: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      }
    case "transferencia":
      return {
        icon: ArrowRightLeft,
        color: "text-chart-2",
        bgColor: "bg-chart-2/10",
        label: "Transferencia",
        badgeClass: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      }
    default:
      return {
        icon: Package,
        color: "text-muted-foreground",
        bgColor: "bg-muted",
        label: "Otro",
        badgeClass: "",
      }
  }
}

export function MovementHistory() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Historial de Movimientos</CardTitle>
        <CardDescription className="text-muted-foreground">
          Últimos movimientos de inventario registrados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {movements.map((movement) => {
              const config = getTypeConfig(movement.type)
              const Icon = config.icon
              
              return (
                <div
                  key={movement.id}
                  className="flex gap-4 p-4 rounded-lg border border-border bg-secondary/30"
                >
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.bgColor}`}>
                    <Icon className={`size-5 ${config.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-foreground">{movement.product}</p>
                        <p className="text-xs text-muted-foreground font-mono">{movement.sku}</p>
                      </div>
                      <Badge className={config.badgeClass}>{config.label}</Badge>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <span className="text-muted-foreground">
                        Cantidad: <span className={`font-semibold ${config.color}`}>
                          {movement.type === "entrada" ? "+" : movement.type === "salida" ? "-" : ""}{movement.quantity}
                        </span>
                      </span>
                      <span className="text-muted-foreground">
                        Stock: {movement.previousStock} → <span className="font-semibold text-foreground">{movement.newStock}</span>
                      </span>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>{movement.reason}</span>
                      <span>•</span>
                      <span>{movement.location}</span>
                      <span>•</span>
                      <span>{movement.user}</span>
                      <span>•</span>
                      <span>{movement.date}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

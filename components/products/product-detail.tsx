"use client"

import * as React from "react"
import { 
  Package, 
  Pencil, 
  Trash2, 
  ArrowLeft,
  Tag,
  DollarSign,
  Boxes,
  TrendingUp,
  Calendar,
  MapPin,
  Barcode,
  Building2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import type { Product } from "./product-form"

interface ProductDetailProps {
  product: Product
  onEdit: () => void
  onDelete: () => void
  onBack: () => void
}

export function ProductDetail({ product, onEdit, onDelete, onBack }: ProductDetailProps) {
  const profit = product.salePrice - product.costPrice
  const margin = ((profit / product.salePrice) * 100).toFixed(1)
  const stockPercentage = (product.stock / product.maxStock) * 100

  const getStockStatus = () => {
    if (product.stock === 0) return { label: "Agotado", variant: "destructive" as const, color: "bg-destructive" }
    if (product.stock <= product.minStock) return { label: "Stock Bajo", variant: "secondary" as const, color: "bg-yellow-500" }
    return { label: "En Stock", variant: "default" as const, color: "bg-primary" }
  }

  const stockStatus = getStockStatus()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
              <Badge variant={product.isActive ? "default" : "secondary"}>
                {product.isActive ? "Activo" : "Inactivo"}
              </Badge>
              {product.isFeatured && (
                <Badge variant="outline" className="border-primary text-primary">
                  Destacado
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{product.id} | SKU: {product.sku}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Pencil className="size-4 mr-1" />
            Editar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="size-4 mr-1" />
            Eliminar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información principal */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Package className="size-5" />
              Información del Producto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Descripción</h4>
              <p className="text-foreground">
                {product.description || "Sin descripción disponible"}
              </p>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                  <Tag className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categoría</p>
                  <p className="font-medium text-foreground">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                  <Building2 className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Proveedor</p>
                  <p className="font-medium text-foreground">{product.supplier || "No asignado"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                  <Barcode className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Código de barras</p>
                  <p className="font-medium text-foreground">{product.barcode || "No registrado"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="font-medium text-foreground">{product.location || "No asignada"}</p>
                </div>
              </div>
            </div>

            {(product.weight > 0 || product.dimensions) && (
              <>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                  {product.weight > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Peso</p>
                      <p className="font-medium text-foreground">{product.weight} kg</p>
                    </div>
                  )}
                  {product.dimensions && (
                    <div>
                      <p className="text-sm text-muted-foreground">Dimensiones</p>
                      <p className="font-medium text-foreground">{product.dimensions} cm</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Precios */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <DollarSign className="size-5" />
                Precios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Costo:</span>
                <span className="font-medium text-foreground">${product.costPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Venta:</span>
                <span className="text-xl font-bold text-foreground">${product.salePrice.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="rounded-lg bg-primary/10 p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Ganancia: ${profit.toFixed(2)} ({margin}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventario */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Boxes className="size-5" />
                Inventario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <Badge 
                  variant={stockStatus.variant}
                  className={stockStatus.variant === "secondary" ? "bg-yellow-500/20 text-yellow-500" : ""}
                >
                  {stockStatus.label}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Stock actual</span>
                  <span className="font-medium text-foreground">{product.stock} unidades</span>
                </div>
                <Progress 
                  value={stockPercentage} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Mín: {product.minStock}</span>
                  <span>Máx: {product.maxStock}</span>
                </div>
              </div>

              <Separator />

              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor en inventario:</span>
                  <span className="font-medium text-foreground">
                    ${(product.stock * product.costPrice).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor potencial:</span>
                  <span className="font-medium text-primary">
                    ${(product.stock * product.salePrice).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

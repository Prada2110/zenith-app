"use client"
// este es el editar producto completo, aqui esta toda la informacion completa

import * as React from "react"
import { useEffect } from "react"
import { useActionState } from "react"
import { 
  Package, 
  DollarSign, 
  Hash, 
  Tag,
  Boxes,
  ImagePlus,
  X,
  Save,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import ErrorMessage from "../AuthUi/ErrorMessage"
import { createProducto } from "@/actions/create-product-action"
import { updateProducto } from "@/actions/update-product-action"
import { Category } from "@/src/types/category"

const categories = [
  "Electrónica", "Móviles", "Audio", "Tablets", "Wearables",
  "Accesorios", "Monitores", "Computadoras", "Gaming", "Fotografía",
]

const suppliers = [
  "TechSupply Inc.", "Global Electronics", "Digital World",
  "Prime Distributors", "MegaTech Corp.",
]

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

export interface Product {
  id: string
  name: string
  description: string
  sku: string
  barcode: string
  category: string
  supplier: string
  costPrice: number
  salePrice: number
  stock: number
  minStock: number
  maxStock: number
  location: string
  weight: number
  dimensions: string
  isActive: boolean
  isFeatured: boolean
  images: string[]
}

interface ProductFormProps {
  product?: Product | null
  categories?: Category[]
  onSave: (product: Partial<Product>) => void
  onCancel: () => void
}

export function ProductForm({ product, categories = [], onSave, onCancel }: ProductFormProps) {
  const isEditing = !!product

  const [createState, createDispatch, isCreating] = useActionState(createProducto, {
    errors: [],
    success: ""
  })

  const [updateState, updateDispatch, isUpdating] = useActionState(updateProducto, {
    errors: [],
    success: ""
  })

  const isPending = isCreating || isUpdating
  const state = isEditing ? updateState : createState
  const dispatch = isEditing ? updateDispatch : createDispatch

  const [formData, setFormData] = React.useState<Partial<Product>>({
    name: product?.name || "",
    description: product?.description || "",
    sku: product?.sku || "",
    barcode: product?.barcode || "",
    category: product?.category || "",
    supplier: product?.supplier || "",
    costPrice: product?.costPrice || 0,
    salePrice: product?.salePrice || 0,
    stock: product?.stock || 0,
    minStock: product?.minStock || 10,
    maxStock: product?.maxStock || 100,
    location: product?.location || "",
    weight: product?.weight || 0,
    dimensions: product?.dimensions || "",
    isActive: product?.isActive ?? true,
    isFeatured: product?.isFeatured ?? false,
    images: product?.images || [],
  })

useEffect(() => {
  if (state.success) {
    onSave({}) // ← llama onSave para que ProductosPage haga el refresh
  }
}, [state])

  const updateField = (field: keyof Product, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const profit = (formData.salePrice || 0) - (formData.costPrice || 0)
  const margin = formData.salePrice ? ((profit / formData.salePrice) * 100).toFixed(1) : "0"

  return (
    <form action={dispatch} className="space-y-6">
      {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}

      {/* campos ocultos */}
      {isEditing && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="isActive" value={String(formData.isActive)} />
      <input type="hidden" name="isFeatured" value={String(formData.isFeatured)} />
      <input type="hidden" name="category" value={formData.category ?? ""} />
      <input type="hidden" name="supplier" value={formData.supplier ?? ""} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información básica */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Package className="size-5" />
              Información del Producto
            </CardTitle>
            <CardDescription>Datos principales del producto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del producto *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ej: iPhone 15 Pro"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label  htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => updateField("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>  {/* ← value es el id */}
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> 
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descripción detallada del producto..."
                rows={4}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <div className="relative">
                  <Hash className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="sku"
                    name="sku"
                    placeholder="SKU-0001"
                    className="pl-8"
                    value={formData.sku}
                    onChange={(e) => updateField("sku", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="barcode">Código de barras</Label>
                <Input
                  id="barcode"
                  name="barcode"
                  placeholder="7501234567890"
                  value={formData.barcode}
                  onChange={(e) => updateField("barcode", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Proveedor</Label>
                <Select
                  value={formData.supplier}
                  onValueChange={(value) => updateField("supplier", value)}
                >
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((sup) => (
                      <SelectItem className="cursor-pointer" key={sup} value={sup}>{sup}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Panel lateral */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Tag className="size-5" />
                Estado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Producto activo</Label>
                  <p className="text-xs text-muted-foreground">Visible en el catálogo</p>
                </div>
                <Switch
                className="cursor-pointer"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => updateField("isActive", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Producto destacado</Label>
                  <p className="text-xs text-muted-foreground">Mostrar en inicio</p>
                </div>
                <Switch
                className="cursor-pointer"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => updateField("isFeatured", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <ImagePlus className="size-5" />
                Imágenes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors">
                <div className="text-center">
                  <ImagePlus className="mx-auto size-6 text-muted-foreground" />
                  <span className="mt-1 text-xs text-muted-foreground">Agregar</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Precios e inventario */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <DollarSign className="size-5" />
              Precios
            </CardTitle>
            <CardDescription>Configura los precios de compra y venta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                  <Label htmlFor="costPrice">Precio de costo *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="costPrice"
                      name="costPrice"
                      type="text"
                      placeholder="0"
                      className="pl-8"
                      value={formData.costPrice ? new Intl.NumberFormat("es-CO").format(formData.costPrice) : ""}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, "")
                        updateField("costPrice", parseFloat(raw) || 0)
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salePrice">Precio de venta *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="salePrice"
                      name="salePrice"
                      type="text"
                      placeholder="0"
                      className="pl-8"
                      value={formData.salePrice ? new Intl.NumberFormat("es-CO").format(formData.salePrice) : ""}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, "")
                        updateField("salePrice", parseFloat(raw) || 0)
                      }}
                    />
                  </div>
                </div>
            </div>

            <div className="rounded-lg bg-secondary/50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ganancia por unidad:</span>
                <span className={`font-medium ${profit >= 0 ? "text-primary" : "text-destructive"}`}>
                  {formatCOP(profit)}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Margen de ganancia:</span>
                <span className={`font-medium ${parseFloat(margin) >= 0 ? "text-primary" : "text-destructive"}`}>
                  {margin}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Boxes className="size-5" />
              Inventario
            </CardTitle>
            <CardDescription>Control de stock y ubicación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock actual</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.stock || ""}
                  onChange={(e) => updateField("stock", parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">Stock mínimo</Label>
                <Input
                  id="minStock"
                  name="minStock"
                  type="number"
                  min="0"
                  placeholder="10"
                  value={formData.minStock || ""}
                  onChange={(e) => updateField("minStock", parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStock">Stock máximo</Label>
                <Input
                  id="maxStock"
                  name="maxStock"
                  type="number"
                  min="0"
                  placeholder="100"
                  value={formData.maxStock || ""}
                  onChange={(e) => updateField("maxStock", parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación en almacén</Label>
              <Input
                id="location"
                name="location"
                placeholder="Ej: Pasillo A, Estante 3"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.weight || ""}
                  onChange={(e) => updateField("weight", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensiones (cm)</Label>
                <Input
                  id="dimensions"
                  name="dimensions"
                  placeholder="Ej: 30x20x10"
                  value={formData.dimensions}
                  onChange={(e) => updateField("dimensions", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones */}
      <div className="flex items-center justify-end gap-3">
        <Button className="cursor-pointer hover:bg-red-500 hover:text-white" type="button" variant="outline" onClick={onCancel}>
          <X className="size-4 mr-1 " />
          Cancelar
        </Button>
        <Button className="cursor-pointer" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 mr-1 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="size-4 mr-1" />
              {isEditing ? "Actualizar Producto" : "Crear Producto"}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
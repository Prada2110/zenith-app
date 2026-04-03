'use client'

// este es el editar producto, el form de editar producto solo la informacion del cuadro princiapl

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Hash, Package } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Category } from "@/src/types/category"

const suppliers = [
  "TechSupply Inc.",
  "Global Electronics",
  "Digital World",
  "Prime Distributors",
  "MegaTech Corp.",
]



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


export default function ProductInfomation({ product, categories = [] }: ProductFormProps) {
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

    const updateField = (field: keyof Product, value: string | number | boolean) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  


  return (

    <>
    <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Package className="size-5" />
              Información del Producto
            </CardTitle>
            <CardDescription>
              Datos principales del producto
            </CardDescription>
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
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => updateField("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
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
                placeholder="Descripción detallada del producto..."
                rows={4}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="sku">SKUUUUUUUUU</Label>
                <div className="relative">
                  <Hash className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="sku"
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
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((sup) => (
                      <SelectItem key={sup} value={sup}>
                        {sup}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
    
    
    </>
     
  )
}

"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Package, Barcode, MapPin, DollarSign, AlertTriangle, Save, X } from "lucide-react"

const categories = [
  { value: "electronica", label: "Electronica" },
  { value: "accesorios", label: "Accesorios" },
  { value: "software", label: "Software" },
  { value: "ropa", label: "Ropa" },
  { value: "hogar", label: "Hogar" },
  { value: "otros", label: "Otros" },
]

const locations = [
  { value: "almacen-a", label: "Almacen A" },
  { value: "almacen-b", label: "Almacen B" },
  { value: "tienda-1", label: "Tienda Principal" },
  { value: "tienda-2", label: "Tienda Sucursal" },
  { value: "bodega", label: "Bodega Central" },
]

const suppliers = [
  { value: "tech-supply", label: "TechSupply Inc." },
  { value: "global-dist", label: "Global Distributors" },
  { value: "import-mx", label: "Import MX" },
  { value: "local-vendor", label: "Proveedor Local" },
]

interface AddInventoryItemProps {
  onSave?: (data: InventoryItemData) => void
}

interface InventoryItemData {
  sku: string
  barcode: string
  name: string
  description: string
  category: string
  supplier: string
  unitCost: string
  salePrice: string
  initialStock: string
  minStock: string
  maxStock: string
  reorderPoint: string
  location: string
  shelf: string
  weight: string
  dimensions: string
  notes: string
}

export function AddInventoryItem({ onSave }: AddInventoryItemProps) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState<InventoryItemData>({
    sku: "",
    barcode: "",
    name: "",
    description: "",
    category: "",
    supplier: "",
    unitCost: "",
    salePrice: "",
    initialStock: "",
    minStock: "",
    maxStock: "",
    reorderPoint: "",
    location: "",
    shelf: "",
    weight: "",
    dimensions: "",
    notes: "",
  })

  const generateSKU = () => {
    const prefix = formData.category ? formData.category.substring(0, 3).toUpperCase() : "PRD"
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
    setFormData(prev => ({ ...prev, sku: `${prefix}-${random}` }))
  }

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData)
    }
    setOpen(false)
    setFormData({
      sku: "",
      barcode: "",
      name: "",
      description: "",
      category: "",
      supplier: "",
      unitCost: "",
      salePrice: "",
      initialStock: "",
      minStock: "",
      maxStock: "",
      reorderPoint: "",
      location: "",
      shelf: "",
      weight: "",
      dimensions: "",
      notes: "",
    })
  }

  const calculateMargin = () => {
    const cost = parseFloat(formData.unitCost) || 0
    const price = parseFloat(formData.salePrice) || 0
    if (cost > 0 && price > 0) {
      return (((price - cost) / cost) * 100).toFixed(1)
    }
    return "0"
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Agregar Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="size-5 text-primary" />
            Agregar Nuevo Producto al Inventario
          </DialogTitle>
          <DialogDescription>
            Completa la informacion del producto para agregarlo al inventario
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="precios">Precios</TabsTrigger>
            <TabsTrigger value="stock">Stock</TabsTrigger>
            <TabsTrigger value="ubicacion">Ubicacion</TabsTrigger>
          </TabsList>

          {/* Tab General */}
          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <div className="flex gap-2">
                  <Input
                    id="sku"
                    placeholder="EJ: ELEC-0001"
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    className="font-mono"
                  />
                  <Button type="button" variant="outline" size="icon" onClick={generateSKU}>
                    <Barcode className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="barcode">Codigo de Barras</Label>
                <Input
                  id="barcode"
                  placeholder="EJ: 7501234567890"
                  value={formData.barcode}
                  onChange={(e) => setFormData(prev => ({ ...prev, barcode: e.target.value }))}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input
                id="name"
                placeholder="Ingresa el nombre del producto"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripcion</Label>
              <Textarea
                id="description"
                placeholder="Descripcion detallada del producto..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Proveedor</Label>
                <Select 
                  value={formData.supplier} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, supplier: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((sup) => (
                      <SelectItem key={sup.value} value={sup.value}>
                        {sup.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Tab Precios */}
          <TabsContent value="precios" className="space-y-4 mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="unitCost">Costo Unitario *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="unitCost"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-9"
                    value={formData.unitCost}
                    onChange={(e) => setFormData(prev => ({ ...prev, unitCost: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salePrice">Precio de Venta *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="salePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-9"
                    value={formData.salePrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, salePrice: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Resumen de margen */}
            {formData.unitCost && formData.salePrice && (
              <Card className="bg-secondary/50 border-border">
                <CardContent className="p-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Costo</p>
                      <p className="text-lg font-semibold text-foreground">
                        ${parseFloat(formData.unitCost || "0").toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Precio</p>
                      <p className="text-lg font-semibold text-foreground">
                        ${parseFloat(formData.salePrice || "0").toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Margen</p>
                      <p className="text-lg font-semibold text-primary">
                        {calculateMargin()}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tab Stock */}
          <TabsContent value="stock" className="space-y-4 mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="initialStock">Stock Inicial *</Label>
                <Input
                  id="initialStock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.initialStock}
                  onChange={(e) => setFormData(prev => ({ ...prev, initialStock: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reorderPoint">Punto de Reorden</Label>
                <Input
                  id="reorderPoint"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.reorderPoint}
                  onChange={(e) => setFormData(prev => ({ ...prev, reorderPoint: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="minStock">Stock Minimo</Label>
                <Input
                  id="minStock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.minStock}
                  onChange={(e) => setFormData(prev => ({ ...prev, minStock: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStock">Stock Maximo</Label>
                <Input
                  id="maxStock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.maxStock}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxStock: e.target.value }))}
                />
              </div>
            </div>

            {/* Alerta de configuracion */}
            <Card className="bg-chart-4/10 border-chart-4/20">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertTriangle className="size-5 text-chart-4 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Configuracion de alertas</p>
                  <p className="text-sm text-muted-foreground">
                    Recibiras notificaciones cuando el stock llegue al punto de reorden o caiga por debajo del stock minimo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Ubicacion */}
          <TabsContent value="ubicacion" className="space-y-4 mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Ubicacion / Almacen *</Label>
                <Select 
                  value={formData.location} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona ubicacion" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.value} value={loc.value}>
                        {loc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shelf">Estante / Pasillo</Label>
                <Input
                  id="shelf"
                  placeholder="Ej: Estante A-3"
                  value={formData.shelf}
                  onChange={(e) => setFormData(prev => ({ ...prev, shelf: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensiones (cm)</Label>
                <Input
                  id="dimensions"
                  placeholder="Largo x Ancho x Alto"
                  value={formData.dimensions}
                  onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Notas sobre almacenamiento, manejo especial, etc..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>

            {formData.location && (
              <Card className="bg-secondary/50 border-border">
                <CardContent className="p-4 flex items-start gap-3">
                  <MapPin className="size-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Ubicacion seleccionada</p>
                    <p className="text-sm text-muted-foreground">
                      {locations.find(l => l.value === formData.location)?.label}
                      {formData.shelf && ` - ${formData.shelf}`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)} className="gap-2">
            <X className="size-4" />
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.category || !formData.unitCost || !formData.salePrice || !formData.initialStock || !formData.location}
            className="gap-2"
          >
            <Save className="size-4" />
            Guardar Producto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

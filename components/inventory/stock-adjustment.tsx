"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, Minus, RotateCcw, Package, ArrowRightLeft } from "lucide-react"

const adjustmentTypes = [
  { value: "entrada", label: "Entrada de Stock", icon: Plus, color: "text-primary" },
  { value: "salida", label: "Salida de Stock", icon: Minus, color: "text-destructive" },
  { value: "ajuste", label: "Ajuste de Inventario", icon: RotateCcw, color: "text-chart-4" },
  { value: "transferencia", label: "Transferencia", icon: ArrowRightLeft, color: "text-chart-2" },
]

const reasons = [
  { value: "compra", label: "Compra a proveedor" },
  { value: "devolucion_cliente", label: "Devolución de cliente" },
  { value: "devolucion_proveedor", label: "Devolución a proveedor" },
  { value: "venta", label: "Venta" },
  { value: "dano", label: "Producto dañado" },
  { value: "perdida", label: "Pérdida / Robo" },
  { value: "conteo", label: "Ajuste por conteo físico" },
  { value: "otro", label: "Otro" },
]

const products = [
  { value: "ELEC-001", label: "MacBook Pro 14\"", stock: 45 },
  { value: "ELEC-002", label: "iPhone 15 Pro", stock: 8 },
  { value: "ACCS-001", label: "AirPods Pro", stock: 120 },
  { value: "ELEC-003", label: "iPad Air", stock: 0 },
  { value: "ACCS-002", label: "Magic Keyboard", stock: 5 },
]

const locations = [
  { value: "almacen-a", label: "Almacén A" },
  { value: "almacen-b", label: "Almacén B" },
  { value: "tienda-1", label: "Tienda Principal" },
  { value: "tienda-2", label: "Tienda Sucursal" },
]

export function StockAdjustment() {
  const [adjustmentType, setAdjustmentType] = React.useState("")
  const [selectedProduct, setSelectedProduct] = React.useState("")
  const [quantity, setQuantity] = React.useState("")
  const [reason, setReason] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const selectedProductData = products.find(p => p.value === selectedProduct)

  const handleSubmit = () => {
    // Aquí iría la lógica para guardar el ajuste
    console.log({
      adjustmentType,
      selectedProduct,
      quantity,
      reason,
      location,
      notes,
    })
    setOpen(false)
    // Reset form
    setAdjustmentType("")
    setSelectedProduct("")
    setQuantity("")
    setReason("")
    setLocation("")
    setNotes("")
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Ajuste Rápido de Stock</CardTitle>
        <CardDescription className="text-muted-foreground">
          Realiza entradas, salidas o ajustes de inventario
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {adjustmentTypes.map((type) => (
            <Dialog key={type.value} open={open && adjustmentType === type.value} onOpenChange={(isOpen) => {
              setOpen(isOpen)
              if (isOpen) setAdjustmentType(type.value)
            }}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2 border-border hover:bg-secondary"
                >
                  <type.icon className={`size-6 ${type.color}`} />
                  <span className="text-sm">{type.label}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <type.icon className={`size-5 ${type.color}`} />
                    {type.label}
                  </DialogTitle>
                  <DialogDescription>
                    Ingresa los detalles del movimiento de inventario
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="product">Producto</Label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un producto" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.value} value={product.value}>
                            <div className="flex items-center justify-between w-full">
                              <span>{product.label}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                Stock: {product.stock}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedProductData && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-background">
                        <Package className="size-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{selectedProductData.label}</p>
                        <p className="text-sm text-muted-foreground">
                          Stock actual: <span className="font-semibold text-foreground">{selectedProductData.stock}</span> unidades
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Cantidad</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        placeholder="0"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Motivo</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        {reasons.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas (opcional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Agrega notas adicionales sobre este movimiento..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {selectedProduct && quantity && (
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Resultado:</span>{" "}
                        {type.value === "entrada" && (
                          <>Stock pasará de {selectedProductData?.stock} a {(selectedProductData?.stock || 0) + parseInt(quantity || "0")} unidades</>
                        )}
                        {type.value === "salida" && (
                          <>Stock pasará de {selectedProductData?.stock} a {(selectedProductData?.stock || 0) - parseInt(quantity || "0")} unidades</>
                        )}
                        {type.value === "ajuste" && (
                          <>Stock se ajustará a {quantity} unidades</>
                        )}
                        {type.value === "transferencia" && (
                          <>Se transferirán {quantity} unidades</>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!selectedProduct || !quantity || !reason}
                  >
                    Confirmar {type.label}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

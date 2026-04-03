"use client"

import * as React from "react"
import { Plus, Trash2, Search } from "lucide-react"
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  discount: number
  total: number
}

const availableProducts = [
  { id: "1", name: "MacBook Pro 14\"", price: 1999.00, stock: 25 },
  { id: "2", name: "iPhone 15 Pro", price: 999.00, stock: 50 },
  { id: "3", name: "AirPods Pro", price: 249.00, stock: 100 },
  { id: "4", name: "iPad Air", price: 599.00, stock: 35 },
  { id: "5", name: "Apple Watch Series 9", price: 399.00, stock: 45 },
  { id: "6", name: "Magic Keyboard", price: 299.00, stock: 60 },
  { id: "7", name: "Studio Display", price: 1599.00, stock: 15 },
  { id: "8", name: "Mac Mini M2", price: 799.00, stock: 30 },
]

export function OrderForm() {
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>([])
  const [selectedProduct, setSelectedProduct] = React.useState("")
  const [quantity, setQuantity] = React.useState(1)

  const addItem = () => {
    if (!selectedProduct) return
    
    const product = availableProducts.find(p => p.id === selectedProduct)
    if (!product) return

    const existingItem = orderItems.find(item => item.productId === selectedProduct)
    
    if (existingItem) {
      setOrderItems(orderItems.map(item => 
        item.productId === selectedProduct 
          ? { 
              ...item, 
              quantity: item.quantity + quantity,
              total: (item.quantity + quantity) * item.unitPrice * (1 - item.discount / 100)
            }
          : item
      ))
    } else {
      const newItem: OrderItem = {
        id: Date.now().toString(),
        productId: product.id,
        productName: product.name,
        quantity: quantity,
        unitPrice: product.price,
        discount: 0,
        total: quantity * product.price,
      }
      setOrderItems([...orderItems, newItem])
    }
    
    setSelectedProduct("")
    setQuantity(1)
  }

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id))
  }

  const updateItemDiscount = (id: string, discount: number) => {
    setOrderItems(orderItems.map(item => 
      item.id === id 
        ? { 
            ...item, 
            discount,
            total: item.quantity * item.unitPrice * (1 - discount / 100)
          }
        : item
    ))
  }

  const updateItemQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setOrderItems(orderItems.map(item => 
      item.id === id 
        ? { 
            ...item, 
            quantity: newQuantity,
            total: newQuantity * item.unitPrice * (1 - item.discount / 100)
          }
        : item
    ))
  }

  const subtotal = orderItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0)
  const totalDiscount = orderItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice * item.discount / 100), 0)
  const tax = (subtotal - totalDiscount) * 0.16
  const total = subtotal - totalDiscount + tax

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Formulario principal */}
      <div className="lg:col-span-2 space-y-6">
        {/* Datos del cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Datos del Cliente</CardTitle>
            <CardDescription>Información del cliente para este pedido</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerName">Nombre completo</Label>
                <Input id="customerName" placeholder="Juan Pérez García" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Correo electrónico</Label>
                <Input id="customerEmail" type="email" placeholder="juan@ejemplo.com" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Teléfono</Label>
                <Input id="customerPhone" type="tel" placeholder="+52 555 123 4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerId">RFC / ID Cliente</Label>
                <Input id="customerId" placeholder="XAXX010101000" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dirección de envío */}
        <Card>
          <CardHeader>
            <CardTitle>Dirección de Envío</CardTitle>
            <CardDescription>Dirección donde se entregará el pedido</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="street">Calle y número</Label>
              <Input id="street" placeholder="Av. Reforma 123, Int. 4B" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="colony">Colonia</Label>
                <Input id="colony" placeholder="Centro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" placeholder="Ciudad de México" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Código Postal</Label>
                <Input id="postalCode" placeholder="06000" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cdmx">Ciudad de México</SelectItem>
                    <SelectItem value="jalisco">Jalisco</SelectItem>
                    <SelectItem value="nuevo-leon">Nuevo León</SelectItem>
                    <SelectItem value="puebla">Puebla</SelectItem>
                    <SelectItem value="queretaro">Querétaro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Select defaultValue="mexico">
                  <SelectTrigger id="country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mexico">México</SelectItem>
                    <SelectItem value="usa">Estados Unidos</SelectItem>
                    <SelectItem value="canada">Canadá</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Productos del pedido */}
        <Card>
          <CardHeader>
            <CardTitle>Productos</CardTitle>
            <CardDescription>Agregar productos al pedido</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - ${product.price.toFixed(2)} ({product.stock} en stock)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input 
                type="number" 
                min={1} 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-20"
                placeholder="Cant."
              />
              <Button onClick={addItem} size="icon">
                <Plus className="size-4" />
              </Button>
            </div>

            {orderItems.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="w-24 text-center">Cantidad</TableHead>
                      <TableHead className="w-28 text-right">Precio Unit.</TableHead>
                      <TableHead className="w-24 text-center">Desc. %</TableHead>
                      <TableHead className="w-28 text-right">Total</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.productName}</TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            min={1}
                            value={item.quantity}
                            onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-20 text-center"
                          />
                        </TableCell>
                        <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            min={0}
                            max={100}
                            value={item.discount}
                            onChange={(e) => updateItemDiscount(item.id, parseInt(e.target.value) || 0)}
                            className="w-20 text-center"
                          />
                        </TableCell>
                        <TableCell className="text-right font-medium">${item.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Search className="size-8 mb-2 opacity-50" />
                <p>No hay productos agregados</p>
                <p className="text-sm">Selecciona un producto y haz clic en + para agregarlo</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notas del pedido */}
        <Card>
          <CardHeader>
            <CardTitle>Notas Adicionales</CardTitle>
            <CardDescription>Instrucciones especiales o comentarios</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Ej: Entregar en horario de oficina, llamar antes de entregar, etc."
              rows={3}
            />
          </CardContent>
        </Card>
      </div>

      {/* Resumen del pedido */}
      <div className="space-y-6">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Número de Pedido</Label>
              <Input id="orderNumber" value="#PED-2024-0458" disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderDate">Fecha del Pedido</Label>
              <Input id="orderDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Fecha de Entrega Estimada</Label>
              <Input id="deliveryDate" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Método de Pago</Label>
              <Select>
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Seleccionar método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Tarjeta de Crédito</SelectItem>
                  <SelectItem value="debit">Tarjeta de Débito</SelectItem>
                  <SelectItem value="transfer">Transferencia Bancaria</SelectItem>
                  <SelectItem value="cash">Efectivo</SelectItem>
                  <SelectItem value="credit-store">Crédito Tienda</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingMethod">Método de Envío</Label>
              <Select>
                <SelectTrigger id="shippingMethod">
                  <SelectValue placeholder="Seleccionar envío" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Estándar (3-5 días) - $99</SelectItem>
                  <SelectItem value="express">Express (1-2 días) - $199</SelectItem>
                  <SelectItem value="same-day">Mismo día - $299</SelectItem>
                  <SelectItem value="pickup">Recoger en tienda - Gratis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-primary">
                <span className="text-muted-foreground">Descuento</span>
                <span>-${totalDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IVA (16%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span>$99.00</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${(total + 99).toFixed(2)}</span>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <Button className="w-full" size="lg">
                Crear Pedido
              </Button>
              <Button variant="outline" className="w-full">
                Guardar Borrador
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

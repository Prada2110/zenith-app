"use client"

import * as React from "react"
import { useActionState } from "react"
import { Trash2, UtensilsCrossed, ShoppingBag } from "lucide-react"
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
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { createVenta } from "@/actions/create-venta-action"
import { toast } from "react-toastify"

interface MenuItem {
  id: string
  name: string
  price: number
  category: string
}

interface OrderItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  notes: string
  total: number
}

interface Props {
  products: MenuItem[]
}

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

export function RestaurantOrderForm({ products }: Props) {
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>([])
  const [tableNumber, setTableNumber] = React.useState("")
  const [customerCount, setCustomerCount] = React.useState("2")
  const [waiter, setWaiter] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [paymentMethod, setPaymentMethod] = React.useState("EFECTIVO")
  const [itemNotes, setItemNotes] = React.useState("")
  const [search, setSearch] = React.useState("")

  const [state, dispatch, isPending] = useActionState(createVenta, {
    errors: [],
    success: ""
  })

  React.useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      setOrderItems([])
      setTableNumber("")
      setCustomerCount("2")
      setWaiter("")
      setNotes("")
      setPaymentMethod("EFECTIVO")
    }
    if (state.errors?.length > 0) {
      state.errors.forEach(error => toast.error(error))
    }
  }, [state])

  const filteredProducts = search
    ? products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : products

  const addItem = (item: MenuItem) => {
    const existingItem = orderItems.find(i => i.id === item.id && i.notes === itemNotes)

    if (existingItem) {
      setOrderItems(orderItems.map(i =>
        i.id === item.id && i.notes === itemNotes
          ? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * i.unitPrice }
          : i
      ))
    } else {
      const newItem: OrderItem = {
        id: itemNotes ? `${item.id}-${Date.now()}` : item.id,
        name: item.name,
        quantity: 1,
        unitPrice: item.price,
        notes: itemNotes,
        total: item.price,
      }
      setOrderItems([...orderItems, newItem])
    }
    setItemNotes("")
  }

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
      return
    }
    setOrderItems(orderItems.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity, total: newQuantity * item.unitPrice }
        : item
    ))
  }

  const subtotal = orderItems.reduce((acc, item) => acc + item.total, 0)
  const total = subtotal

  // serializa items para el hidden input
  const itemsPayload = JSON.stringify(
    orderItems.map(item => ({
      id: item.id.split("-")[0], // quita el timestamp si existe
      quantity: item.quantity,
      notes: item.notes,
    }))
  )

  return (
    <form action={dispatch}>
      {/* campos ocultos */}
      <input type="hidden" name="tableNumber" value={tableNumber} />
      <input type="hidden" name="customerCount" value={customerCount} />
      <input type="hidden" name="waiter" value={waiter} />
      <input type="hidden" name="notes" value={notes} />
      <input type="hidden" name="paymentMethod" value={paymentMethod} />
      <input type="hidden" name="items" value={itemsPayload} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Menú y selección */}
        <div className="lg:col-span-2 space-y-6">

          {/* Info mesa */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Información de la Mesa</CardTitle>
              <CardDescription>Datos básicos del pedido</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="tableNumber">Número de Mesa</Label>
                <Input
                  id="tableNumber"
                  placeholder="Ej: 12"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerCount">Comensales</Label>
                <Select value={customerCount} onValueChange={setCustomerCount}>
                  <SelectTrigger id="customerCount">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "persona" : "personas"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="waiter">Mesero</Label>
                <Input
                  id="waiter"
                  placeholder="Nombre del mesero"
                  value={waiter}
                  onChange={(e) => setWaiter(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Productos */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Productos</CardTitle>
              <CardDescription>Selecciona los productos del pedido</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="itemNotes">Notas para el siguiente item (opcional)</Label>
                <Input
                  id="itemNotes"
                  placeholder="Ej: Sin cebolla, término medio..."
                  value={itemNotes}
                  onChange={(e) => setItemNotes(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="search">Buscar producto</Label>
                <Input
                  id="search"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <Button
                      key={item.id}
                      type="button"
                      variant="outline"
                      className="h-auto py-3 px-4 justify-between"
                      onClick={() => addItem(item)}
                    >
                      <span className="text-left text-sm">{item.name}</span>
                      <span className="font-bold text-primary text-sm">
                        {formatCOP(item.price)}
                      </span>
                    </Button>
                  ))
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <ShoppingBag className="size-8 mb-2 opacity-50" />
                    <p className="text-sm">No hay productos disponibles</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notas generales */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Notas del Pedido</CardTitle>
              <CardDescription>Instrucciones especiales</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ej: Cliente con alergia a mariscos..."
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Cuenta / Resumen */}
        <div className="space-y-6">
          <Card className="sticky top-6 bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Cuenta</CardTitle>
                {tableNumber && (
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    Mesa {tableNumber}
                  </Badge>
                )}
              </div>
              <CardDescription>
                {orderItems.length} {orderItems.length === 1 ? "producto" : "productos"} en el pedido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.length > 0 ? (
                <div className="space-y-3 max-h-[400px] overflow-auto pr-2">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-2 rounded-lg bg-secondary/50">
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm truncate block">{item.name}</span>
                        {item.notes && (
                          <p className="text-xs text-muted-foreground mt-1 italic">{item.notes}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="size-6"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="size-6"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <span className="text-xs text-muted-foreground ml-2">
                            x {formatCOP(item.unitPrice)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-sm">{formatCOP(item.total)}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-6 text-destructive hover:text-destructive ml-1"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <UtensilsCrossed className="size-8 mb-2 opacity-50" />
                  <p className="text-sm">No hay productos</p>
                  <p className="text-xs">Selecciona del menú para agregar</p>
                </div>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCOP(total)}</span>
              </div>

              <div className="space-y-2">
                <Label>Método de Pago</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                    <SelectItem value="TARJETA">Tarjeta</SelectItem>
                    <SelectItem value="TRANSFERENCIA">Transferencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={orderItems.length === 0 || isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Procesando...
                  </div>
                ) : (
                  "Crear Venta"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
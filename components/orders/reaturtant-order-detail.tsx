"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft,
  Users,
  Clock,
  UtensilsCrossed,
  CreditCard,
  Banknote,
  Printer,
  Split,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Timer,
  ChefHat,
  Coffee,
  Cake,
  MoreHorizontal,
  Receipt,
  Phone,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface OrderItem {
  id: string
  name: string
  category: "food" | "drink" | "dessert"
  quantity: number
  price: number
  notes?: string
  status: "pending" | "preparing" | "ready" | "served"
}

interface RestaurantOrder {
  id: string
  table: string
  waiter: string
  waiterPhone?: string
  diners: number
  items: OrderItem[]
  subtotal: number
  tax: number
  tip: number
  total: number
  status: "pending" | "preparing" | "served" | "paid" | "cancelled"
  paymentMethod: "card" | "cash" | null
  time: string
  date: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// Mock data
const ordersData: Record<string, RestaurantOrder> = {
  "REST-001": {
    id: "REST-001",
    table: "Mesa 5",
    waiter: "Carlos Martinez",
    waiterPhone: "+52 555 123 4567",
    diners: 4,
    items: [
      { id: "i1", name: "Hamburguesa Clasica", category: "food", quantity: 2, price: 145, status: "served", notes: "Sin cebolla" },
      { id: "i2", name: "Pizza Margherita", category: "food", quantity: 1, price: 195, status: "served" },
      { id: "i3", name: "Papas Fritas", category: "food", quantity: 2, price: 65, status: "served" },
      { id: "i4", name: "Cerveza Artesanal", category: "drink", quantity: 4, price: 75, status: "served" },
      { id: "i5", name: "Limonada", category: "drink", quantity: 2, price: 45, status: "served" },
      { id: "i6", name: "Brownie con Helado", category: "dessert", quantity: 2, price: 85, status: "ready" },
    ],
    subtotal: 1000.00,
    tax: 160.00,
    tip: 150.00,
    total: 1310.00,
    status: "served",
    paymentMethod: null,
    time: "14:35",
    date: "2024-03-18",
    notes: "Cliente frecuente, celebrando cumpleanos",
    createdAt: "2024-03-18T14:35:00",
    updatedAt: "2024-03-18T15:45:00",
  },
  "REST-002": {
    id: "REST-002",
    table: "Mesa 12",
    waiter: "Ana Lopez",
    waiterPhone: "+52 555 987 6543",
    diners: 2,
    items: [
      { id: "i7", name: "Ensalada Cesar", category: "food", quantity: 1, price: 125, status: "preparing" },
      { id: "i8", name: "Pasta Alfredo", category: "food", quantity: 1, price: 165, status: "pending" },
      { id: "i9", name: "Agua Mineral", category: "drink", quantity: 2, price: 35, status: "served" },
    ],
    subtotal: 360.00,
    tax: 57.60,
    tip: 0,
    total: 417.60,
    status: "preparing",
    paymentMethod: null,
    time: "14:50",
    date: "2024-03-18",
    createdAt: "2024-03-18T14:50:00",
    updatedAt: "2024-03-18T14:55:00",
  },
  "REST-003": {
    id: "REST-003",
    table: "Mesa 3",
    waiter: "Roberto Sanchez",
    waiterPhone: "+52 555 456 7890",
    diners: 6,
    items: [
      { id: "i10", name: "Tacos al Pastor", category: "food", quantity: 12, price: 25, status: "pending" },
      { id: "i11", name: "Guacamole", category: "food", quantity: 2, price: 85, status: "pending" },
      { id: "i12", name: "Margarita", category: "drink", quantity: 6, price: 95, status: "pending" },
    ],
    subtotal: 940.00,
    tax: 150.40,
    tip: 0,
    total: 1090.40,
    status: "pending",
    paymentMethod: null,
    time: "15:10",
    date: "2024-03-18",
    createdAt: "2024-03-18T15:10:00",
    updatedAt: "2024-03-18T15:10:00",
  },
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

const statusConfig = {
  pending: { label: "Pendiente", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  preparing: { label: "Preparando", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  ready: { label: "Listo", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  served: { label: "Servido", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  paid: { label: "Pagado", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  cancelled: { label: "Cancelado", color: "bg-red-500/10 text-red-500 border-red-500/20" },
}

const itemStatusConfig = {
  pending: { label: "Pendiente", color: "bg-yellow-500/10 text-yellow-500" },
  preparing: { label: "Preparando", color: "bg-blue-500/10 text-blue-500" },
  ready: { label: "Listo", color: "bg-purple-500/10 text-purple-500" },
  served: { label: "Servido", color: "bg-green-500/10 text-green-500" },
}

const categoryIcons = {
  food: ChefHat,
  drink: Coffee,
  dessert: Cake,
}

const categoryLabels = {
  food: "Comida",
  drink: "Bebidas",
  dessert: "Postres",
}

export default function RestaurantOrderDetailPage({ venta }: { venta: any }) {
  const router = useRouter()

  
  const [mounted, setMounted] = React.useState(false)
  const [order, setOrder] = React.useState<RestaurantOrder | null>(null)
  const [tipAmount, setTipAmount] = React.useState(0)
  const [paymentDialogOpen, setPaymentDialogOpen] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "cash">("card")
  const [addItemDialogOpen, setAddItemDialogOpen] = React.useState(false)

React.useEffect(() => {
  setMounted(true)

  if (venta) {
    // 🔥 mapear backend → frontend
    setOrder({
      id: venta.id.toString(),
      table: `Mesa ${venta.tableNumber}`,
      waiter: venta.waiter,
      diners: venta.customerCount,
      items: venta.items.map((item: any) => ({
        id: item.id.toString(),
        name: `Producto ${item.product}`, // luego puedes mapear nombre real
        category: "food", // luego lo mejoras
        quantity: item.quantity,
        price: item.subtotal / item.quantity,
        status: "pending",
        notes: item.notes,
      })),
      subtotal: venta.subtotal,
      tax: 0, // tu backend no manda tax
      tip: venta.tip,
      total: venta.total,
      status: "pending",
      paymentMethod: venta.paymentMethod === "EFECTIVO" ? "cash" : "card",
      time: "",
      date: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }
}, [venta])

  if (!mounted) {
    return null
  }

  if (!order) {
    return (

          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <AlertCircle className="size-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Pedido no encontrado</h2>
              <p className="text-muted-foreground mt-2">El pedido {venta?.id} no existe</p>
              <Button asChild className="mt-4">
                <Link href="/pedidos">Volver a pedidos</Link>
              </Button>
            </div>
          </div>

    )
  }

  const calculateElapsedTime = () => {
    const start = new Date(order.createdAt)
    const now = new Date()
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60)
    if (diff < 60) return `${diff} min`
    const hours = Math.floor(diff / 60)
    const mins = diff % 60
    return `${hours}h ${mins}m`
  }

  const getProgress = () => {
    switch (order.status) {
      case "pending": return 20
      case "preparing": return 50
      case "served": return 80
      case "paid": return 100
      default: return 0
    }
  }

  const groupedItems = order.items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, OrderItem[]>)

  const handleUpdateItemStatus = (itemId: string, newStatus: OrderItem["status"]) => {
    setOrder(prev => {
      if (!prev) return prev
      return {
        ...prev,
        items: prev.items.map(item => 
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      }
    })
  }

  const calculatedTotal = order.subtotal + order.tax + tipAmount

  return (
<>
 {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/pedidos">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="size-5 text-primary" />
            <span className="font-semibold">Pedido {order.id}</span>
            <Badge className={statusConfig[order.status].color}>
              {statusConfig[order.status].label}
            </Badge>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Printer className="mr-2 size-4" />
                  Imprimir cuenta
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Split className="mr-2 size-4" />
                  Dividir cuenta
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pencil className="mr-2 size-4" />
                  Editar pedido
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 size-4" />
                  Cancelar pedido
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <MapPin className="size-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Mesa</p>
                        <p className="font-semibold">{order.table}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Users className="size-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Comensales</p>
                        <p className="font-semibold">{order.diners}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <Timer className="size-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Tiempo</p>
                        <p className="font-semibold">{calculateElapsedTime()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <Receipt className="size-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Productos</p>
                        <p className="font-semibold">{order.items.reduce((sum, i) => sum + i.quantity, 0)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Progress */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Progreso del pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={getProgress()} className="h-2 mb-4" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div className={`flex flex-col items-center gap-1 ${order.status !== "cancelled" ? "text-primary" : ""}`}>
                      <CheckCircle2 className="size-4" />
                      <span>Recibido</span>
                    </div>
                    <div className={`flex flex-col items-center gap-1 ${["preparing", "served", "paid"].includes(order.status) ? "text-primary" : ""}`}>
                      <ChefHat className="size-4" />
                      <span>Preparando</span>
                    </div>
                    <div className={`flex flex-col items-center gap-1 ${["served", "paid"].includes(order.status) ? "text-primary" : ""}`}>
                      <UtensilsCrossed className="size-4" />
                      <span>Servido</span>
                    </div>
                    <div className={`flex flex-col items-center gap-1 ${order.status === "paid" ? "text-primary" : ""}`}>
                      <CreditCard className="size-4" />
                      <span>Pagado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Items by Category */}
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Detalle del pedido</CardTitle>
                    <CardDescription>{order.items.length} productos</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => setAddItemDialogOpen(true)}>
                    <Plus className="size-4 mr-2" />
                    Agregar
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {(["food", "drink", "dessert"] as const).map(category => {
                    const items = groupedItems[category]
                    if (!items?.length) return null
                    const CategoryIcon = categoryIcons[category]
                    
                    return (
                      <div key={category}>
                        <div className="flex items-center gap-2 mb-3">
                          <CategoryIcon className="size-4 text-muted-foreground" />
                          <span className="font-medium text-sm">{categoryLabels[category]}</span>
                          <Badge variant="secondary" className="text-xs">{items.length}</Badge>
                        </div>
                        <div className="space-y-2">
                          {items.map(item => (
                            <div 
                              key={item.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{item.quantity}x</span>
                                  <span>{item.name}</span>
                                  {item.notes && (
                                    <span className="text-xs text-muted-foreground">({item.notes})</span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  ${mounted ? formatCurrency(item.price) : "---"} c/u
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-medium">
                                  ${mounted ? formatCurrency(item.price * item.quantity) : "---"}
                                </span>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8">
                                      <Badge className={`${itemStatusConfig[item.status].color} text-xs`}>
                                        {itemStatusConfig[item.status].label}
                                      </Badge>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {(["pending", "preparing", "ready", "served"] as const).map(status => (
                                      <DropdownMenuItem 
                                        key={status}
                                        onClick={() => handleUpdateItemStatus(item.id, status)}
                                      >
                                        <Badge className={`${itemStatusConfig[status].color} text-xs mr-2`}>
                                          {itemStatusConfig[status].label}
                                        </Badge>
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Notes */}
              {order.notes && (
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Notas del pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{order.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Payment & Waiter */}
            <div className="space-y-6">
              {/* Waiter Info */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Mesero asignado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="size-14">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {order.waiter.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{order.waiter}</p>
                      {order.waiterPhone && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Phone className="size-3" />
                          <span>{order.waiterPhone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Resumen de cuenta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${mounted ? formatCurrency(order.subtotal) : "---"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IVA (16%)</span>
                      <span>${mounted ? formatCurrency(order.tax) : "---"}</span>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label className="text-sm">Propina</Label>
                      <div className="flex gap-2">
                        {[10, 15, 20].map(pct => (
                          <Button
                            key={pct}
                            variant={tipAmount === Math.round(order.subtotal * pct / 100) ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTipAmount(Math.round(order.subtotal * pct / 100))}
                          >
                            {pct}%
                          </Button>
                        ))}
                        <Button
                          variant={![10, 15, 20].some(p => tipAmount === Math.round(order.subtotal * p / 100)) && tipAmount !== 0 ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTipAmount(0)}
                        >
                          Otro
                        </Button>
                      </div>
                      <Input
                        type="number"
                        value={tipAmount}
                        onChange={(e) => setTipAmount(Number(e.target.value))}
                        className="mt-2"
                        placeholder="Monto personalizado"
                      />
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${mounted ? formatCurrency(calculatedTotal) : "---"}</span>
                    </div>
                  </div>

                  {order.status !== "paid" && order.status !== "cancelled" && (
                    <div className="space-y-2 pt-2">
                      <Button 
                        className="w-full gap-2" 
                        size="lg"
                        onClick={() => {
                          setPaymentMethod("card")
                          setPaymentDialogOpen(true)
                        }}
                      >
                        <CreditCard className="size-4" />
                        Pagar con tarjeta
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full gap-2" 
                        size="lg"
                        onClick={() => {
                          setPaymentMethod("cash")
                          setPaymentDialogOpen(true)
                        }}
                      >
                        <Banknote className="size-4" />
                        Pagar en efectivo
                      </Button>
                    </div>
                  )}

                  {order.status === "paid" && (
                    <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-green-500/10 text-green-500">
                      <CheckCircle2 className="size-5" />
                      <span className="font-medium">Pedido pagado</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Acciones rapidas</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Printer className="size-4" />
                    Imprimir
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Split className="size-4" />
                    Dividir
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="size-4" />
                    Agregar
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Pencil className="size-4" />
                    Editar
                  </Button>
                </CardContent>
              </Card>

              {/* Order Info */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Informacion del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID Pedido</span>
                    <span className="font-mono">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha</span>
                    <span>{order.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hora inicio</span>
                    <span>{order.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ultima actualizacion</span>
                    <span>{new Date(order.updatedAt).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Payment Dialog */}
        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Procesar pago</DialogTitle>
              <DialogDescription>
                Confirma el pago del pedido {order.id}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                <span>Total a pagar</span>
                <span className="text-2xl font-bold text-primary">
                  ${mounted ? formatCurrency(calculatedTotal) : "---"}
                </span>
              </div>
              <div className="space-y-2">
                <Label>Metodo de pago</Label>
                <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "card" | "cash")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="size-4" />
                        Tarjeta
                      </div>
                    </SelectItem>
                    <SelectItem value="cash">
                      <div className="flex items-center gap-2">
                        <Banknote className="size-4" />
                        Efectivo
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {paymentMethod === "cash" && (
                <div className="space-y-2">
                  <Label>Monto recibido</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                setOrder(prev => prev ? { ...prev, status: "paid", paymentMethod } : prev)
                setPaymentDialogOpen(false)
              }}>
                Confirmar pago
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Item Dialog */}
        <Dialog open={addItemDialogOpen} onOpenChange={setAddItemDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar producto</DialogTitle>
              <DialogDescription>
                Agrega un nuevo producto al pedido
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select defaultValue="food">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Comida</SelectItem>
                    <SelectItem value="drink">Bebidas</SelectItem>
                    <SelectItem value="dessert">Postres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Producto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="burger">Hamburguesa Clasica - $145</SelectItem>
                    <SelectItem value="pizza">Pizza Margherita - $195</SelectItem>
                    <SelectItem value="tacos">Tacos al Pastor - $25</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cantidad</Label>
                <Input type="number" defaultValue={1} min={1} />
              </div>
              <div className="space-y-2">
                <Label>Notas (opcional)</Label>
                <Textarea placeholder="Ej: Sin cebolla, extra picante..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddItemDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setAddItemDialogOpen(false)}>
                Agregar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

</>
       

  )
}

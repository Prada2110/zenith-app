"use client"

import * as React from "react"
import { 
  MoreHorizontal, 
  Eye, 
  Pencil, 
  Trash2, 
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Package,
  Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const orders = [
  {
    id: "PED-2024-0458",
    customer: "María García López",
    email: "maria@ejemplo.com",
    date: "2024-03-18",
    items: 3,
    total: 2847.00,
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: "PED-2024-0457",
    customer: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    date: "2024-03-18",
    items: 1,
    total: 1999.00,
    status: "shipped",
    paymentStatus: "paid",
  },
  {
    id: "PED-2024-0456",
    customer: "Ana Martínez",
    email: "ana@ejemplo.com",
    date: "2024-03-17",
    items: 5,
    total: 4596.00,
    status: "processing",
    paymentStatus: "paid",
  },
  {
    id: "PED-2024-0455",
    customer: "Roberto Sánchez",
    email: "roberto@ejemplo.com",
    date: "2024-03-17",
    items: 2,
    total: 1248.00,
    status: "pending",
    paymentStatus: "pending",
  },
  {
    id: "PED-2024-0454",
    customer: "Laura Hernández",
    email: "laura@ejemplo.com",
    date: "2024-03-16",
    items: 4,
    total: 3196.00,
    status: "shipped",
    paymentStatus: "paid",
  },
  {
    id: "PED-2024-0453",
    customer: "Pedro Díaz",
    email: "pedro@ejemplo.com",
    date: "2024-03-16",
    items: 1,
    total: 599.00,
    status: "cancelled",
    paymentStatus: "refunded",
  },
  {
    id: "PED-2024-0452",
    customer: "Sofia Torres",
    email: "sofia@ejemplo.com",
    date: "2024-03-15",
    items: 2,
    total: 1798.00,
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: "PED-2024-0451",
    customer: "Miguel Ramírez",
    email: "miguel@ejemplo.com",
    date: "2024-03-15",
    items: 3,
    total: 2097.00,
    status: "processing",
    paymentStatus: "paid",
  },
]

const statusConfig = {
  pending: { label: "Pendiente", icon: Clock, variant: "secondary" as const },
  processing: { label: "Procesando", icon: Package, variant: "default" as const },
  shipped: { label: "Enviado", icon: Truck, variant: "default" as const },
  completed: { label: "Completado", icon: CheckCircle2, variant: "default" as const },
  cancelled: { label: "Cancelado", icon: XCircle, variant: "destructive" as const },
}

const paymentConfig = {
  pending: { label: "Pendiente", variant: "secondary" as const },
  paid: { label: "Pagado", variant: "default" as const },
  refunded: { label: "Reembolsado", variant: "outline" as const },
}

export function OrdersList() {
  const [selectedOrders, setSelectedOrders] = React.useState<string[]>([])
  const [mounted, setMounted] = React.useState(false)
  const [statusFilter, setStatusFilter] = React.useState("all")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const toggleAll = () => {
    setSelectedOrders(prev => 
      prev.length === orders.length ? [] : orders.map(o => o.id)
    )
  }

  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(o => o.status === statusFilter)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Lista de Pedidos</CardTitle>
            <CardDescription>Gestiona todos los pedidos de tu tienda</CardDescription>
          </div>
          <div className="flex gap-2">
            <Input 
              placeholder="Buscar pedido..." 
              className="w-64 bg-secondary border-0"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 size-4" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="processing">Procesando</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedOrders.length === orders.length}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig]
                const payment = paymentConfig[order.paymentStatus as keyof typeof paymentConfig]
                const StatusIcon = status.icon

                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={() => toggleOrder(order.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-primary">
                      #{order.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-xs text-muted-foreground">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(order.date).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-center">{order.items}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant} className="gap-1">
                        <StatusIcon className="size-3" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={payment.variant}>
                        {payment.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {mounted ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">Abrir menú</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 size-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 size-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Truck className="mr-2 size-4" />
                              Actualizar envío
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 size-4" />
                              Cancelar pedido
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredOrders.length} de {orders.length} pedidos
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Siguiente
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

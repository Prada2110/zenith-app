"use client"

import * as React from "react"
import { 
  MoreHorizontal, 
  Eye, 
  Pencil, 
  Trash2, 
  CheckCircle2,
  Clock,
  XCircle,
  UtensilsCrossed,
  ChefHat,
  Filter,
  Users,
  Receipt,
  CreditCard,
  Banknote,
  Link
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import type { Venta } from "@/src/schemas"
import { MenuItem } from "./page"
import { useRouter } from "next/navigation"

interface Props {
  ventas: Venta[]
  products: MenuItem[]
}

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

export function RestaurantOrdersList({ ventas, products }: Props) {
  const [mounted, setMounted] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [paymentFilter, setPaymentFilter] = React.useState("all")
  const router = useRouter()

  React.useEffect(() => { setMounted(true) }, [])

    const getProductName = (productId: number) => {
    const product = products.find(p => p.id === String(productId))
    return product?.name ?? `Producto #${productId}`
  }

  const filteredVentas = ventas.filter(v => {
    const matchesSearch =
      v.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.waiter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(v.id).includes(searchTerm)
    const matchesPayment = paymentFilter === "all" || v.paymentMethod === paymentFilter
    return matchesSearch && matchesPayment
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="size-5" />
              Ventas
            </CardTitle>
            <CardDescription>Historial de ventas registradas</CardDescription>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Buscar mesa, mesero..."
              className="w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                <SelectItem value="TARJETA">Tarjeta</SelectItem>
                <SelectItem value="TRANSFERENCIA">Transferencia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>ID</TableHead>
              <TableHead>Mesa</TableHead>
              <TableHead>Mesero</TableHead>
              <TableHead className="text-center">Comensales</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Pago</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVentas.map((venta) => (
              <TableRow
                  key={venta.id}
                  className="border-border cursor-pointer hover:bg-secondary/50"
                  onClick={() => router.push(`/pedidos/${venta.id}`)}
                >
                <TableCell>
                  <span className="font-medium text-primary">#{venta.id}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <UtensilsCrossed className="size-4 text-primary" />
                    </div>
                    <span className="font-medium">Mesa {venta.tableNumber}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="text-xs bg-secondary">
                        {venta.waiter.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{venta.waiter}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="size-4 text-muted-foreground" />
                    <span>{venta.customerCount}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px]">
                    <p className="text-sm truncate text-muted-foreground">
                      {venta.items.map(i => `${i.quantity}x ${getProductName(i.product)}`).join(', ')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {venta.items.reduce((acc, i) => acc + i.quantity, 0)} productos
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    <div className="font-medium">
                      {mounted ? formatCOP(venta.total) : "---"}
                    </div>
                    {venta.tip > 0 && (
                      <div className="text-xs text-muted-foreground">
                        
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {venta.paymentMethod === "EFECTIVO" ? (
                      <Banknote className="size-4" />
                    ) : (
                      <CreditCard className="size-4" />
                    )}
                    <span className="capitalize">{venta.paymentMethod}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {mounted && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                           <Link href={`/pedidos/${venta.id}`}>
                              <Eye className="mr-2 size-4" />
                              Ver detalles
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 size-4" />
                          Cancelar venta
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 p-4 bg-secondary/50 rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{filteredVentas.length}</p>
            <p className="text-xs text-muted-foreground">Total ventas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {filteredVentas.reduce((acc, v) => acc + v.customerCount, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Comensales</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {mounted ? formatCOP(filteredVentas.reduce((acc, v) => acc + v.total, 0)) : "---"}
            </p>
            <p className="text-xs text-muted-foreground">Ingresos totales</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredVentas.length} de {ventas.length} ventas
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
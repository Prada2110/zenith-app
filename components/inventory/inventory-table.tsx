"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Package,
  ArrowUpDown,
  Plus,
  Minus,
  History,
  MapPin,
  Filter,
} from "lucide-react"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

const inventoryItems = [
  {
    id: "INV-001",
    sku: "ELEC-001",
    name: "MacBook Pro 14\"",
    category: "Electrónica",
    stock: 45,
    minStock: 10,
    maxStock: 100,
    unitCost: 32999.00,
    location: "Almacén A - Estante 1",
    lastUpdate: "Hace 2 horas",
    status: "normal",
  },
  {
    id: "INV-002",
    sku: "ELEC-002",
    name: "iPhone 15 Pro",
    category: "Electrónica",
    stock: 8,
    minStock: 15,
    maxStock: 80,
    unitCost: 24999.00,
    location: "Almacén A - Estante 2",
    lastUpdate: "Hace 1 día",
    status: "low",
  },
  {
    id: "INV-003",
    sku: "ACCS-001",
    name: "AirPods Pro",
    category: "Accesorios",
    stock: 120,
    minStock: 20,
    maxStock: 200,
    unitCost: 4999.00,
    location: "Almacén B - Estante 5",
    lastUpdate: "Hace 3 horas",
    status: "normal",
  },
  {
    id: "INV-004",
    sku: "ELEC-003",
    name: "iPad Air",
    category: "Electrónica",
    stock: 0,
    minStock: 10,
    maxStock: 50,
    unitCost: 14999.00,
    location: "Almacén A - Estante 3",
    lastUpdate: "Hace 5 días",
    status: "out",
  },
  {
    id: "INV-005",
    sku: "ACCS-002",
    name: "Magic Keyboard",
    category: "Accesorios",
    stock: 5,
    minStock: 10,
    maxStock: 40,
    unitCost: 2499.00,
    location: "Almacén B - Estante 2",
    lastUpdate: "Hace 12 horas",
    status: "low",
  },
  {
    id: "INV-006",
    sku: "SOFT-001",
    name: "Microsoft Office 365",
    category: "Software",
    stock: 500,
    minStock: 50,
    maxStock: 1000,
    unitCost: 1999.00,
    location: "Digital",
    lastUpdate: "Hace 1 hora",
    status: "normal",
  },
  {
    id: "INV-007",
    sku: "ELEC-004",
    name: "Samsung Galaxy S24",
    category: "Electrónica",
    stock: 32,
    minStock: 15,
    maxStock: 60,
    unitCost: 19999.00,
    location: "Almacén A - Estante 4",
    lastUpdate: "Hace 6 horas",
    status: "normal",
  },
  {
    id: "INV-008",
    sku: "ACCS-003",
    name: "Cargador USB-C 65W",
    category: "Accesorios",
    stock: 0,
    minStock: 25,
    maxStock: 150,
    unitCost: 599.00,
    location: "Almacén B - Estante 1",
    lastUpdate: "Hace 2 días",
    status: "out",
  },
]

const getStatusBadge = (status: string, stock: number, minStock: number) => {
  if (status === "out" || stock === 0) {
    return <Badge variant="destructive">Agotado</Badge>
  }
  if (status === "low" || stock <= minStock) {
    return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">Stock Bajo</Badge>
  }
  return <Badge className="bg-primary/20 text-primary border-primary/30">Normal</Badge>
}

const getStockColor = (stock: number, minStock: number) => {
  if (stock === 0) return "text-destructive"
  if (stock <= minStock) return "text-chart-4"
  return "text-foreground"
}

export function InventoryTable() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])
  const [mounted, setMounted] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState("all")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSelectAll = () => {
    if (selectedItems.length === inventoryItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(inventoryItems.map((item) => item.id))
    }
  }

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-foreground">Inventario de Productos</CardTitle>
            <CardDescription className="text-muted-foreground">
              Gestiona el stock y ubicación de todos tus productos
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o SKU..."
                className="w-64 pl-8 bg-secondary border-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 bg-secondary border-0">
                <Filter className="mr-2 size-4" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Stock Bajo</SelectItem>
                <SelectItem value="out">Agotados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === inventoryItems.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="text-muted-foreground">
                  <div className="flex items-center gap-1">
                    SKU
                    <ArrowUpDown className="size-3" />
                  </div>
                </TableHead>
                <TableHead className="text-muted-foreground">Producto</TableHead>
                <TableHead className="text-muted-foreground">Categoría</TableHead>
                <TableHead className="text-muted-foreground text-center">Stock</TableHead>
                <TableHead className="text-muted-foreground">Mín / Máx</TableHead>
                <TableHead className="text-muted-foreground">Costo Unit.</TableHead>
                <TableHead className="text-muted-foreground">Ubicación</TableHead>
                <TableHead className="text-muted-foreground">Estado</TableHead>
                <TableHead className="text-muted-foreground">Actualizado</TableHead>
                <TableHead className="text-muted-foreground w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className="border-border">
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleSelectItem(item.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {item.sku}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                        <Package className="size-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.category}</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-bold text-lg ${getStockColor(item.stock, item.minStock)}`}>
                      {item.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {item.minStock} / {item.maxStock}
                  </TableCell>
                  <TableCell className="text-foreground">
                    ${mounted ? formatCurrency(item.unitCost) : "---"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="size-3" />
                      {item.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(item.status, item.stock, item.minStock)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {item.lastUpdate}
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
                            Editar producto
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Plus className="mr-2 size-4" />
                            Agregar stock
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Minus className="mr-2 size-4" />
                            Restar stock
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <History className="mr-2 size-4" />
                            Ver historial
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
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredItems.length} de {inventoryItems.length} productos
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
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

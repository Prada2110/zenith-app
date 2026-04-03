"use client"

import { useState, useEffect } from "react"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const products = [
  {
    id: "PRD001",
    name: "MacBook Pro 14\"",
    category: "Electrónica",
    price: 1999.00,
    stock: 45,
    status: "active",
  },
  {
    id: "PRD002",
    name: "iPhone 15 Pro",
    category: "Móviles",
    price: 1199.00,
    stock: 128,
    status: "active",
  },
  {
    id: "PRD003",
    name: "AirPods Pro",
    category: "Audio",
    price: 249.00,
    stock: 5,
    status: "low-stock",
  },
  {
    id: "PRD004",
    name: "iPad Air",
    category: "Tablets",
    price: 799.00,
    stock: 67,
    status: "active",
  },
  {
    id: "PRD005",
    name: "Apple Watch Series 9",
    category: "Wearables",
    price: 399.00,
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: "PRD006",
    name: "Magic Keyboard",
    category: "Accesorios",
    price: 299.00,
    stock: 34,
    status: "active",
  },
  {
    id: "PRD007",
    name: "Studio Display",
    category: "Monitores",
    price: 1599.00,
    stock: 12,
    status: "active",
  },
  {
    id: "PRD008",
    name: "HomePod mini",
    category: "Audio",
    price: 99.00,
    stock: 8,
    status: "low-stock",
  },
]

const statusConfig = {
  active: { label: "Activo", variant: "default" as const },
  "low-stock": { label: "Stock Bajo", variant: "secondary" as const },
  "out-of-stock": { label: "Agotado", variant: "destructive" as const },
}

export function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const toggleAll = () => {
    setSelectedProducts((prev) =>
      prev.length === products.length ? [] : products.map((p) => p.id)
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Productos</CardTitle>
            <CardDescription>
              Gestiona tu catálogo de productos
            </CardDescription>
          </div>
          {selectedProducts.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedProducts.length} seleccionados
              </span>
              <Button variant="destructive" size="sm">
                <Trash2 className="size-4 mr-1" />
                Eliminar
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedProducts.length === products.length}
                  onCheckedChange={toggleAll}
                  aria-label="Seleccionar todos"
                />
              </TableHead>
              <TableHead className="text-muted-foreground">
                <Button variant="ghost" size="sm" className="-ml-3 h-8 gap-1">
                  Producto
                  <ArrowUpDown className="size-3" />
                </Button>
              </TableHead>
              <TableHead className="text-muted-foreground">Categoría</TableHead>
              <TableHead className="text-muted-foreground text-right">
                <Button variant="ghost" size="sm" className="-mr-3 h-8 gap-1">
                  Precio
                  <ArrowUpDown className="size-3" />
                </Button>
              </TableHead>
              <TableHead className="text-muted-foreground text-right">Stock</TableHead>
              <TableHead className="text-muted-foreground">Estado</TableHead>
              <TableHead className="text-muted-foreground w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="border-border"
                data-state={selectedProducts.includes(product.id) && "selected"}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleProduct(product.id)}
                    aria-label={`Seleccionar ${product.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{product.name}</span>
                    <span className="text-xs text-muted-foreground">{product.id}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{product.category}</TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={statusConfig[product.status as keyof typeof statusConfig].variant}
                    className={
                      product.status === "low-stock"
                        ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                        : ""
                    }
                  >
                    {statusConfig[product.status as keyof typeof statusConfig].label}
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 size-4" />
                          Eliminar
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

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-muted-foreground">
            Mostrando 1-8 de 1,284 productos
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="size-4" />
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Siguiente
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

// FORM PRUEBA ES EL CUADRO DE LA PANTALLA PRINCIPAL, EL RESUMEN DE LOS PRODUCTOS

import { useState, useEffect } from "react"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react"


import { ProductsHeader } from "@/components/products/products-header"
import { ProductForm, type Product } from "@/components/products/product-form"
import { ProductDetail } from "@/components/products/product-detail"
import { DeleteProductDialog } from "@/components/products/delete-product-dialog"
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
import { deleteProducto } from "@/actions/delete-product-action"
import { useRouter } from "next/navigation"
import { Category } from "@/src/types/category"



const statusConfig = {
  active: { label: "Activo", variant: "default" as const },
  "low-stock": { label: "Stock Bajo", variant: "secondary" as const },
  "out-of-stock": { label: "Agotado", variant: "destructive" as const },
}

interface Props {
  initialProducts: Product[]
  initialCategories: Category[]
}

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)



type ViewMode = "list" | "create" | "edit" | "detail"

export default function ProductosPage({ initialProducts, initialCategories }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()


  

  useEffect(() => {
    setMounted(true)
  }, [])

  const getProductStatus = (product: Product) => {
    if (product.stock === 0) return "out-of-stock"
    if (product.stock <= product.minStock) return "low-stock"
    return "active"
  }

const filteredProducts = products.filter(product => 
  (product.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  (product.sku ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  (product.category ?? "").toLowerCase().includes(searchQuery.toLowerCase())
)

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const toggleAll = () => {
    setSelectedProducts((prev) =>
      prev.length === filteredProducts.length ? [] : filteredProducts.map((p) => p.id)
    )
  }

  const handleNewProduct = () => {
    setCurrentProduct(null)
    setViewMode("create")
  }

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product)
    setViewMode("edit")
  }

  const handleViewProduct = (product: Product) => {
    setCurrentProduct(product)
    setViewMode("detail")
  }

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

const confirmDelete = async () => {
  if (productToDelete) {
    setIsDeleting(true)
    try {
      await deleteProducto(productToDelete.id)
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id))
      setProductToDelete(null)
      setDeleteDialogOpen(false)
      if (viewMode === "detail") setViewMode("list")
    } catch (error) {
      console.error("Error al eliminar:", error)
    } finally {
      setIsDeleting(false)
    }
  }
}

  const handleBulkDelete = () => {
    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)))
    setSelectedProducts([])
  }

const handleSaveProduct = (productData: Partial<Product>) => {
  setViewMode("list")
  setCurrentProduct(null)
  window.location.href = "/productos" // ← recarga completa de la página
}
  const handleCancel = () => {
    setViewMode("list")
    setCurrentProduct(null)
  }

  const getTitle = () => {
    switch (viewMode) {
      case "create": return "Nuevo Producto"
      case "edit": return "Editar Producto"
      case "detail": return "Detalle del Producto"
      default: return "Productos"
    }
  }

  const getDescription = () => {
    switch (viewMode) {
      case "create": return "Completa la información para crear un nuevo producto"
      case "edit": return "Modifica la información del producto"
      case "detail": return ""
      default: return "Administra tu catálogo de productos, inventario y precios"
    }
  }

  const getCategoryName = (categoryId: string) => {
  const category = initialCategories.find(c => c.id === categoryId)
  return category?.name ?? categoryId
}

  return (

    <>
           <ProductsHeader 
          viewMode={viewMode}
          onNewProduct={handleNewProduct}
          onSearch={setSearchQuery}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {viewMode !== "detail" && (
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{getTitle()}</h1>
                <p className="text-muted-foreground">{getDescription()}</p>
              </div>
            )}

            {viewMode === "list" && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="size-5 text-primary" />
                      <div>
                        <CardTitle className="text-foreground">Catálogo de Productos</CardTitle>
                        <CardDescription>
                          {filteredProducts.length} productos encontrados
                        </CardDescription>
                      </div>
                    </div>
                    {selectedProducts.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground ">
                          {selectedProducts.length} seleccionados
                        </span>
                        <Button className="cursor-pointer" variant="destructive" size="sm" onClick={handleBulkDelete}>
                          <Trash2 className="size-4 mr-1 " />
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
                        <TableHead className="w-12 cursor-pointer">
                          <Checkbox
                            checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                            onCheckedChange={toggleAll}
                            className="cursor-pointer"
                            aria-label="Seleccionar todos"
                          />
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          <Button variant="ghost" size="sm" className="-ml-3 h-8 gap-1">
                            Producto
                            <ArrowUpDown className="size-3" />
                          </Button>
                        </TableHead>
                        <TableHead className="text-muted-foreground">SKU</TableHead>
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
                      {filteredProducts.map((product) => {
                        const status = getProductStatus(product)
                        return (
                          <TableRow
                            key={product.id}
                            className="border-border cursor-pointer"
                            data-state={selectedProducts.includes(product.id) && "selected"}
                          >
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => toggleProduct(product.id)}
                                aria-label={`Seleccionar ${product.name}`}
                              />
                            </TableCell>
                            <TableCell onClick={() => handleViewProduct(product)}>
                              <div className="flex flex-col">
                                <span className="font-medium text-foreground">{product.name}</span>
                                <span className="text-xs text-muted-foreground">{product.id}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {getCategoryName(product.category)}
                            </TableCell>
                            <TableCell className="text-right font-medium text-foreground">
                              {formatCOP(product.salePrice)}
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">{product.stock}</TableCell>
                            <TableCell>
                              <Badge
                                variant={statusConfig[status].variant}
                                className={
                                  status === "low-stock"
                                    ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                                    : ""
                                }
                              >
                                {statusConfig[status].label}
                              </Badge>
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              {mounted ? (
                                <DropdownMenu >
                                  <DropdownMenuTrigger asChild className="cursor-pointer">
                                    <Button variant="ghost" size="icon" className="size-8">
                                      <MoreHorizontal className="size-4" />
                                      <span className="sr-only">Abrir menú</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer"  onClick={() => handleViewProduct(product)}>
                                      <Eye className="mr-2 size-4" />
                                      Ver detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditProduct(product)}>
                                      <Pencil className="mr-2 size-4" />
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      className="text-destructive cursor-pointer"
                                      onClick={() => handleDeleteProduct(product)}
                                    >
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
                        )
                      })}
                    </TableBody>
                  </Table>

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-sm text-muted-foreground">
                      Mostrando 1-{filteredProducts.length} de {products.length} productos
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled className="cursor-pointer">
                        <ChevronLeft className="size-4" />
                        Anterior
                      </Button>
                      <Button variant="outline" size="sm" className="cursor-pointer">
                        Siguiente
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {(viewMode === "create" || viewMode === "edit") && (
              <ProductForm
                product={currentProduct}
                categories={initialCategories} 
                onSave={handleSaveProduct}
                onCancel={handleCancel}
              />
            )}

            {viewMode === "detail" && currentProduct && (
              <ProductDetail
                product={currentProduct}
                onEdit={() => handleEditProduct(currentProduct)}
                onDelete={() => handleDeleteProduct(currentProduct)}
                onBack={handleCancel}
              />
            )}
          </div>
        </main>


      <DeleteProductDialog
          product={productToDelete}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDelete}
        />
        

    
    
    </>
 
  )
}

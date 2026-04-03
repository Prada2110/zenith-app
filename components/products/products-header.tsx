"use client"

import * as React from "react"
import { Search, Bell, Plus, Filter, Download, Upload } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "../ThemeToggle"

interface ProductsHeaderProps {
  viewMode: "list" | "create" | "edit" | "detail"
  onNewProduct: () => void
  onSearch: (query: string) => void
}

export function ProductsHeader({ viewMode, onNewProduct, onSearch }: ProductsHeaderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const getBreadcrumb = () => {
    switch (viewMode) {
      case "create": return "Nuevo Producto"
      case "edit": return "Editar Producto"
      case "detail": return "Detalle"
      default: return "Listado"
    }
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/productos">Productos</BreadcrumbLink>
          </BreadcrumbItem>
          <ThemeToggle />
          {viewMode !== "list" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{getBreadcrumb()}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        {viewMode === "list" && (
          <>
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-64 pl-8 bg-secondary border-0"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>

            {mounted ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 cursor-pointer">
                    <Filter className="size-4 " />
                    <span className="hidden sm:inline">Filtros</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Todos los productos</DropdownMenuItem>
                  <DropdownMenuItem>Activos</DropdownMenuItem>
                  <DropdownMenuItem>Stock bajo</DropdownMenuItem>
                  <DropdownMenuItem>Agotados</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Destacados</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="size-4" />
                <span className="hidden sm:inline">Filtros</span>
              </Button>
            )}

            {mounted ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="cursor-pointer" variant="outline" size="icon">
                    <Download className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="size-4 mr-2" />
                    Exportar CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="size-4 mr-2" />
                    Exportar Excel
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Upload className="size-4 mr-2" />
                    Importar productos
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="icon">
                <Download className="size-4" />
              </Button>
            )}
          </>
        )}

        <Button size="sm" className="gap-1" onClick={onNewProduct}>
          <Plus className="size-4" />
          <span className="hidden sm:inline cursor-pointer">Nuevo Producto</span>
        </Button>
      </div>
    </header>
  )
}

"use client"

import * as React from "react"
import { Search, Download, Upload, Plus, ArrowLeft, Filter } from "lucide-react"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface CustomersHeaderProps {
  viewMode: "list" | "create" | "edit" | "detail"
  onNewCustomer: () => void
  onBack: () => void
  onSearch: (query: string) => void
}

export function CustomersHeader({ viewMode, onNewCustomer, onBack, onSearch }: CustomersHeaderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {viewMode === "list" ? (
              <BreadcrumbPage>Clientes</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href="/clientes" onClick={(e) => { e.preventDefault(); onBack(); }}>
                Clientes
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {viewMode !== "list" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {viewMode === "create" ? "Nuevo Cliente" : viewMode === "edit" ? "Editar" : "Detalles"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        {viewMode === "list" ? (
          <>
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar clientes..."
                className="w-64 pl-8 bg-secondary border-0"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>



            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="size-4" />
                    Filtrar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Todos</DropdownMenuItem>
                  <DropdownMenuItem>Activos</DropdownMenuItem>
                  <DropdownMenuItem>Inactivos</DropdownMenuItem>
                  <DropdownMenuItem>VIP</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button variant="outline" size="sm" className="gap-2">
              <Download className="size-4" />
              Exportar
            </Button>

            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="size-4" />
              Importar
            </Button>

            <Button size="sm" className="gap-2" onClick={onNewCustomer}>
              <Plus className="size-4" />
              Nuevo Cliente
            </Button>
          </>
        ) : (
          <>

            <Button variant="outline" size="sm" className="gap-2" onClick={onBack}>
              <ArrowLeft className="size-4" />
              Volver
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

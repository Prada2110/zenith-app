"use client"

import * as React from "react"
import { Search, Plus, ArrowLeft, Download, Upload } from "lucide-react"
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


type ViewMode = "list" | "create" | "edit" | "detail"

interface SuppliersHeaderProps {
  viewMode: ViewMode
  onNewSupplier: () => void
  onBack: () => void
  onSearch: (query: string) => void
}

export function SuppliersHeader({ viewMode, onNewSupplier, onBack, onSearch }: SuppliersHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            {viewMode === "list" ? (
              <BreadcrumbPage className="text-foreground">Proveedores</BreadcrumbPage>
            ) : (
              <BreadcrumbLink 
                href="#" 
                onClick={(e) => { e.preventDefault(); onBack(); }}
                className="text-muted-foreground hover:text-foreground"
              >
                Proveedores
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {viewMode !== "list" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground">
                  {viewMode === "create" ? "Nuevo Proveedor" : viewMode === "edit" ? "Editar" : "Detalles"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        {viewMode === "list" && (
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar proveedores..."
              className="w-64 pl-8 bg-secondary border-0"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}



        {viewMode === "list" ? (
          <>
            <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
              <Upload className="size-4" />
              Importar
            </Button>
            <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
              <Download className="size-4" />
              Exportar
            </Button>
            <Button size="sm" className="gap-2" onClick={onNewSupplier}>
              <Plus className="size-4" />
              <span className="hidden sm:inline">Nuevo Proveedor</span>
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" className="gap-2" onClick={onBack}>
            <ArrowLeft className="size-4" />
            Volver
          </Button>
        )}
      </div>
    </header>
  )
}

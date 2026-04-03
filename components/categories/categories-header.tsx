"use client"

import * as React from "react"
import { Search, Plus, ArrowLeft } from "lucide-react"
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


interface CategoriesHeaderProps {
  viewMode: "list" | "create" | "edit"
  onNewCategory: () => void
  onBack?: () => void
  onSearch: (query: string) => void
}

export function CategoriesHeader({ viewMode, onNewCategory, onBack, onSearch }: CategoriesHeaderProps) {
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
              <BreadcrumbPage>Categorías</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href="/categorias" onClick={(e) => { e.preventDefault(); onBack?.() }}>
                Categorías
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {viewMode !== "list" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {viewMode === "create" ? "Nueva Categoría" : "Editar"}
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
                placeholder="Buscar categorías..."
                className="w-64 pl-8 bg-secondary border-0"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            


            <Button onClick={onNewCategory} size="sm" className="gap-1">
              <Plus className="size-4" />
              <span className="hidden sm:inline">Nueva Categoría</span>
            </Button>
          </>
        ) : (
          <>

            <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
              <ArrowLeft className="size-4" />
              Volver
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

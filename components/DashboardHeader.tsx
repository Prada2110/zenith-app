"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Search, Bell, Plus } from "lucide-react"
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
import Link from "next/link"

export function DashboardHeader() {
  const pathname = usePathname()

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // 🔥 separar la ruta
  const pathSegments = pathname.split("/").filter(Boolean)

  // 🔥 nombres bonitos
  const routeNames: Record<string, string> = {
    productos: "Productos",
    categorias: "Categorías",
    inventario: "Inventario",
    pedidos: "Pedidos",
    proveedores: "Proveedores",
    reportes: "Reportes",
    estadisticas: "Estadísticas",
    clientes: "Clientes",
    configuracion: "Configuración",
    ayuda: "Ayuda",
    crear: "Crear",
    editar: "Editar",
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      {/* 🔥 BREADCRUMB DINÁMICO */}
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {/* Dashboard siempre */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

          {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/")
            const isLast = index === pathSegments.length - 1

            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>
                      {routeNames[segment] || segment}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>
                      {routeNames[segment] || segment}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="w-64 pl-8 bg-secondary border-0"
          />
        </div>

        {mounted ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-4" />
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  3
                </span>
                <span className="sr-only">Notificaciones</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex flex-col items-start gap-1">
                <span className="font-medium">Stock bajo</span>
                <span className="text-xs text-muted-foreground">
                  El producto "MacBook Pro" tiene stock bajo (5 unidades)
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex flex-col items-start gap-1">
                <span className="font-medium">Nuevo pedido</span>
                <span className="text-xs text-muted-foreground">
                  Se ha recibido un nuevo pedido #12458
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex flex-col items-start gap-1">
                <span className="font-medium">
                  Actualización de proveedor
                </span>
                <span className="text-xs text-muted-foreground">
                  El proveedor TechSupply ha actualizado sus precios
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-4" />
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              3
            </span>
          </Button>
        )}

        <Button size="sm" className="gap-1">
          <Plus className="size-4" />
          <Link className="hidden sm:inline" href={"/productos/crear-producto"}>Nuevo Producto</Link>
        </Button>
      </div>
    </header>
  )
}
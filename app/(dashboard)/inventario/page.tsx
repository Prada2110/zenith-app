"use client"

import * as React from "react"

import { SidebarTrigger } from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Download, 
  Upload, 
  Bell,
  Package,
  History,
  AlertTriangle,
  BarChart3,
  Plus,
} from "lucide-react"

import { InventoryStats } from "@/components/inventory/inventory-stats"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { StockAdjustment } from "@/components/inventory/stock-adjustment"
import { MovementHistory } from "@/components/inventory/movement-history"
import { LowStockAlerts } from "@/components/inventory/low-stock-alerts"
import { AddInventoryItem } from "@/components/inventory/add-inventory-item"

export default function InventarioPage() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
<>
 {/* Header */}
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
                <BreadcrumbPage>Inventario</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar en inventario..."
                className="w-64 pl-8 bg-secondary border-0"
              />
            </div>



            {mounted ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="size-4" />
                    <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                      4
                    </span>
                    <span className="sr-only">Alertas de inventario</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-2">
                    <p className="font-semibold text-foreground">Alertas de Stock</p>
                    <p className="text-xs text-muted-foreground">4 productos requieren atención</p>
                  </div>
                  <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <span className="font-medium text-destructive">iPad Air - Agotado</span>
                    <span className="text-xs text-muted-foreground">
                      Sin stock disponible
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <span className="font-medium text-chart-4">iPhone 15 Pro - Stock bajo</span>
                    <span className="text-xs text-muted-foreground">
                      Solo 8 unidades disponibles
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-4" />
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                  4
                </span>
              </Button>
            )}

            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="size-4" />
              Importar
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="size-4" />
              Exportar
            </Button>
            <AddInventoryItem />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Inventario</h1>
              <p className="text-muted-foreground">
                Gestiona el stock, ubicaciones y movimientos de todos tus productos
              </p>
            </div>

            {/* Stats */}
            <InventoryStats />

            {/* Tabs */}
            <Tabs defaultValue="productos" className="w-full">
              <TabsList className="grid w-full max-w-lg grid-cols-4">
                <TabsTrigger value="productos" className="gap-2">
                  <Package className="size-4" />
                  <span className="hidden sm:inline">Productos</span>
                </TabsTrigger>
                <TabsTrigger value="movimientos" className="gap-2">
                  <History className="size-4" />
                  <span className="hidden sm:inline">Movimientos</span>
                </TabsTrigger>
                <TabsTrigger value="alertas" className="gap-2">
                  <AlertTriangle className="size-4" />
                  <span className="hidden sm:inline">Alertas</span>
                </TabsTrigger>
                <TabsTrigger value="ajustes" className="gap-2">
                  <BarChart3 className="size-4" />
                  <span className="hidden sm:inline">Ajustes</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="productos" className="mt-6 space-y-6">
                <InventoryTable />
              </TabsContent>

              <TabsContent value="movimientos" className="mt-6 space-y-6">
                <MovementHistory />
              </TabsContent>

              <TabsContent value="alertas" className="mt-6 space-y-6">
                <LowStockAlerts />
              </TabsContent>

              <TabsContent value="ajustes" className="mt-6 space-y-6">
                <StockAdjustment />
              </TabsContent>
            </Tabs>
          </div>
        </main>

</>
       

  )
}

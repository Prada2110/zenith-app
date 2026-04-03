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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Bell,
  BarChart3,
  TrendingUp,
  Package,
  Users,
  Warehouse,
  Download,
  Calendar,
} from "lucide-react"

import { StatsOverview } from "@/components/statistics/stats-overview"
import { RevenueChart } from "@/components/statistics/revenue-chart"
import { OrdersStatistics } from "@/components/statistics/orders-statistics"
import { ProductsStatistics } from "@/components/statistics/products-statistics"
import { CustomersStatistics } from "@/components/statistics/customers-statistics"
import { InventoryStatistics } from "@/components/statistics/inventory-statistics"

export default function EstadisticasPage() {
  const [mounted, setMounted] = React.useState(false)
  const [dateRange, setDateRange] = React.useState("year")

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
                <BreadcrumbPage>Estadisticas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-64 pl-8 bg-secondary border-0"
              />
            </div>



            {mounted ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="size-4" />
                    <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      1
                    </span>
                    <span className="sr-only">Notificaciones</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <span className="font-medium">Nuevas estadisticas</span>
                    <span className="text-xs text-muted-foreground">
                      Los datos de marzo ya estan disponibles
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-4" />
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  1
                </span>
              </Button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Estadisticas</h1>
                <p className="text-muted-foreground">
                  Analiza el rendimiento completo de tu negocio
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[160px]">
                    <Calendar className="size-4 mr-2" />
                    <SelectValue placeholder="Periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Esta semana</SelectItem>
                    <SelectItem value="month">Este mes</SelectItem>
                    <SelectItem value="quarter">Este trimestre</SelectItem>
                    <SelectItem value="year">Este año</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="size-4" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <StatsOverview />

            {/* Tabs de estadisticas */}
            <Tabs defaultValue="revenue" className="space-y-6">
              <TabsList className="grid w-full max-w-3xl grid-cols-5">
                <TabsTrigger value="revenue" className="gap-2">
                  <TrendingUp className="size-4 hidden sm:block" />
                  Ingresos
                </TabsTrigger>
                <TabsTrigger value="orders" className="gap-2">
                  <BarChart3 className="size-4 hidden sm:block" />
                  Pedidos
                </TabsTrigger>
                <TabsTrigger value="products" className="gap-2">
                  <Package className="size-4 hidden sm:block" />
                  Productos
                </TabsTrigger>
                <TabsTrigger value="customers" className="gap-2">
                  <Users className="size-4 hidden sm:block" />
                  Clientes
                </TabsTrigger>
                <TabsTrigger value="inventory" className="gap-2">
                  <Warehouse className="size-4 hidden sm:block" />
                  Inventario
                </TabsTrigger>
              </TabsList>

              <TabsContent value="revenue" className="space-y-6">
                <RevenueChart />
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <OrdersStatistics />
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <ProductsStatistics />
              </TabsContent>

              <TabsContent value="customers" className="space-y-6">
                <CustomersStatistics />
              </TabsContent>

              <TabsContent value="inventory" className="space-y-6">
                <InventoryStatistics />
              </TabsContent>
            </Tabs>
          </div>
        </main>

</>
        

  )
}

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Bell,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
} from "lucide-react"

import { ReportsStats } from "@/components/reports/reports-stats"
import { SalesReportChart } from "@/components/reports/sales-report-chart"
import { ProductsReport } from "@/components/reports/products-report"
import { CategoriesReport } from "@/components/reports/categories-report"
import { ReportGenerator } from "@/components/reports/report-generator"

export default function ReportesPage() {
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
                <BreadcrumbPage>Reportes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar reportes..."
                className="w-64 pl-8 bg-secondary border-0"
              />
            </div>


            {mounted ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="size-4" />
                    <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      2
                    </span>
                    <span className="sr-only">Notificaciones</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <span className="font-medium">Reporte listo</span>
                    <span className="text-xs text-muted-foreground">
                      El reporte de ventas de marzo ya esta disponible
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <span className="font-medium">Nuevo analisis</span>
                    <span className="text-xs text-muted-foreground">
                      Se ha generado el analisis de tendencias
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-4" />
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  2
                </span>
              </Button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Reportes</h1>
              <p className="text-muted-foreground">
                Analiza el rendimiento de tu negocio con reportes detallados
              </p>
            </div>

            {/* Stats */}
            <ReportsStats />

            {/* Tabs de reportes */}
            <Tabs defaultValue="sales" className="space-y-6">
              <TabsList className="grid w-full max-w-2xl grid-cols-5">
                <TabsTrigger value="sales" className="gap-2">
                  <TrendingUp className="size-4 hidden sm:block" />
                  Ventas
                </TabsTrigger>
                <TabsTrigger value="products" className="gap-2">
                  <BarChart3 className="size-4 hidden sm:block" />
                  Productos
                </TabsTrigger>
                <TabsTrigger value="categories" className="gap-2">
                  <PieChart className="size-4 hidden sm:block" />
                  Categorías
                </TabsTrigger>
                <TabsTrigger value="generate" className="gap-2">
                  <FileText className="size-4 hidden sm:block" />
                  Generar
                </TabsTrigger>
                <TabsTrigger value="scheduled" className="gap-2">
                  <Calendar className="size-4 hidden sm:block" />
                  Programados
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sales" className="space-y-6">
                <SalesReportChart />
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <ProductsReport />
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <CategoriesReport />
              </TabsContent>

              <TabsContent value="generate" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <ReportGenerator />
                  <RecentReports />
                </div>
              </TabsContent>

              <TabsContent value="scheduled" className="space-y-6">
                <ScheduledReports />
              </TabsContent>
            </Tabs>
          </div>
        </main>
    
    </>

       

  )
}

// Componente de reportes recientes
function RecentReports() {
  const reports = [
    { name: "Ventas Marzo 2024", type: "PDF", date: "Hace 2 días", size: "2.4 MB" },
    { name: "Inventario Q1", type: "Excel", date: "Hace 5 días", size: "5.1 MB" },
    { name: "Productos Destacados", type: "PDF", date: "Hace 1 semana", size: "1.8 MB" },
    { name: "Analisis Proveedores", type: "CSV", date: "Hace 2 semanas", size: "890 KB" },
  ]

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-semibold text-foreground mb-4">Reportes Recientes</h3>
      <div className="space-y-4">
        {reports.map((report, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{report.name}</p>
                <p className="text-xs text-muted-foreground">{report.date} - {report.size}</p>
              </div>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
              {report.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente de reportes programados
function ScheduledReports() {
  const scheduled = [
    { 
      name: "Reporte de Ventas Semanal", 
      frequency: "Cada Lunes", 
      nextRun: "25 Mar 2024, 08:00",
      format: "PDF",
      recipients: 3,
      active: true,
    },
    { 
      name: "Inventario Mensual", 
      frequency: "Dia 1 de cada mes", 
      nextRun: "1 Abr 2024, 06:00",
      format: "Excel",
      recipients: 5,
      active: true,
    },
    { 
      name: "Analisis de Tendencias", 
      frequency: "Cada Viernes", 
      nextRun: "22 Mar 2024, 18:00",
      format: "PDF",
      recipients: 2,
      active: false,
    },
  ]

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Reportes Programados</h3>
            <p className="text-sm text-muted-foreground">
              Configura reportes que se generen automaticamente
            </p>
          </div>
          <Button className="gap-2">
            <Calendar className="size-4" />
            Nuevo Programado
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {scheduled.map((report, index) => (
          <div key={index} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`size-3 rounded-full ${report.active ? "bg-green-500" : "bg-muted-foreground"}`} />
              <div>
                <p className="font-medium text-foreground">{report.name}</p>
                <p className="text-sm text-muted-foreground">{report.frequency}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-right hidden sm:block">
                <p className="text-foreground">Proxima ejecucion</p>
                <p className="text-muted-foreground">{report.nextRun}</p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-foreground">{report.recipients} destinatarios</p>
                <p className="text-muted-foreground">{report.format}</p>
              </div>
              <Button variant="ghost" size="sm">Editar</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

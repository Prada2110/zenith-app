"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  FileSpreadsheet,
  File,
  Loader2,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

const reportTypes = [
  { value: "sales", label: "Reporte de Ventas" },
  { value: "inventory", label: "Reporte de Inventario" },
  { value: "products", label: "Reporte de Productos" },
  { value: "suppliers", label: "Reporte de Proveedores" },
  { value: "orders", label: "Reporte de Pedidos" },
  { value: "customers", label: "Reporte de Clientes" },
  { value: "financial", label: "Reporte Financiero" },
]

const formatOptions = [
  { value: "pdf", label: "PDF", icon: File },
  { value: "excel", label: "Excel", icon: FileSpreadsheet },
  { value: "csv", label: "CSV", icon: FileText },
]

const includeOptions = [
  { id: "charts", label: "Incluir gráficos" },
  { id: "summary", label: "Incluir resumen ejecutivo" },
  { id: "details", label: "Incluir detalles completos" },
  { id: "comparisons", label: "Incluir comparativas" },
]

export function ReportGenerator() {
  const [reportType, setReportType] = React.useState("")
  const [exportFormat, setExportFormat] = React.useState("pdf")
  const [dateFrom, setDateFrom] = React.useState<Date>()
  const [dateTo, setDateTo] = React.useState<Date>()
  const [includeItems, setIncludeItems] = React.useState<string[]>(["charts", "summary"])
  const [isGenerating, setIsGenerating] = React.useState(false)

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simular generación de reporte
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  const toggleIncludeItem = (id: string) => {
    setIncludeItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileText className="size-5" />
          Generador de Reportes
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Crea reportes personalizados para descargar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tipo de reporte */}
        <div className="space-y-2">
          <Label>Tipo de Reporte</Label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo de reporte" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rango de fechas */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Fecha inicio</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 size-4" />
                  {dateFrom ? format(dateFrom, "PPP", { locale: es }) : "Seleccionar fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Fecha fin</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 size-4" />
                  {dateTo ? format(dateTo, "PPP", { locale: es }) : "Seleccionar fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Formato de exportación */}
        <div className="space-y-2">
          <Label>Formato de exportación</Label>
          <div className="flex gap-2">
            {formatOptions.map((format) => (
              <Button
                key={format.value}
                variant={exportFormat === format.value ? "default" : "outline"}
                className="flex-1 gap-2"
                onClick={() => setExportFormat(format.value)}
              >
                <format.icon className="size-4" />
                {format.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Opciones adicionales */}
        <div className="space-y-3">
          <Label>Opciones adicionales</Label>
          <div className="grid gap-3 sm:grid-cols-2">
            {includeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={includeItems.includes(option.id)}
                  onCheckedChange={() => toggleIncludeItem(option.id)}
                />
                <label
                  htmlFor={option.id}
                  className="text-sm font-medium leading-none text-foreground cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Botón de generar */}
        <Button 
          className="w-full gap-2" 
          onClick={handleGenerateReport}
          disabled={!reportType || isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Generando reporte...
            </>
          ) : (
            <>
              <Download className="size-4" />
              Generar y Descargar
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

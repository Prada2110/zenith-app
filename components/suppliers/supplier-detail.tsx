"use client"

import * as React from "react"
import { 
  Pencil, 
  Trash2, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  CreditCard,
  Clock,
  Star,
  Package,
  DollarSign,
  Calendar,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { type Supplier } from "./supplier-form"

interface SupplierDetailProps {
  supplier: Supplier
  onEdit: () => void
  onDelete: () => void
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

const categoryLabels: Record<string, string> = {
  electronics: "Electrónica",
  clothing: "Ropa y Textiles",
  food: "Alimentos",
  furniture: "Muebles",
  packaging: "Empaques",
  "raw-materials": "Materias Primas",
  office: "Oficina",
  services: "Servicios",
  other: "Otros",
}

const paymentTermsLabels: Record<string, string> = {
  immediate: "Pago Inmediato",
  "net-15": "Net 15 días",
  "net-30": "Net 30 días",
  "net-45": "Net 45 días",
  "net-60": "Net 60 días",
  "net-90": "Net 90 días",
  advance: "Pago Anticipado",
}

export function SupplierDetail({ supplier, onEdit, onDelete }: SupplierDetailProps) {
  const [mounted, setMounted] = React.useState(false)
  const [copied, setCopied] = React.useState<string | null>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="size-16 rounded-xl bg-primary flex items-center justify-center">
            <Building2 className="size-8 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-foreground">{supplier.companyName}</h2>
              {supplier.isPreferred && (
                <Badge className="gap-1">
                  <Star className="size-3" />
                  Preferido
                </Badge>
              )}
              <Badge variant={supplier.isActive ? "outline" : "secondary"}>
                {supplier.isActive ? "Activo" : "Inactivo"}
              </Badge>
            </div>
            {supplier.tradeName && (
              <p className="text-muted-foreground">{supplier.tradeName}</p>
            )}
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="font-mono">{supplier.code}</span>
              <span>RFC: {supplier.taxId}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Pencil className="mr-2 size-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 size-4" />
            Eliminar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Package className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{supplier.totalOrders}</p>
                <p className="text-xs text-muted-foreground">Órdenes totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <DollarSign className="size-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  ${mounted ? formatCurrency(supplier.totalPurchases) : "---"}
                </p>
                <p className="text-xs text-muted-foreground">Compras totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Clock className="size-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{supplier.deliveryTime}</p>
                <p className="text-xs text-muted-foreground">Días de entrega</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Star className="size-5 text-yellow-500" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`size-4 ${
                        star <= supplier.rating 
                          ? "fill-yellow-500 text-yellow-500" 
                          : "text-muted-foreground"
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Calificación</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contacto */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <User className="size-5" />
              Información de Contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{supplier.contactName}</p>
                  <p className="text-xs text-muted-foreground">Contacto principal</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{supplier.contactEmail}</p>
                  <p className="text-xs text-muted-foreground">Email</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleCopy(supplier.contactEmail, "email")}
              >
                {copied === "email" ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{supplier.contactPhone}</p>
                  <p className="text-xs text-muted-foreground">Teléfono principal</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleCopy(supplier.contactPhone, "phone")}
              >
                {copied === "phone" ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>

            {supplier.alternatePhone && (
              <>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{supplier.alternatePhone}</p>
                      <p className="text-xs text-muted-foreground">Teléfono alternativo</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {supplier.website && (
              <>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{supplier.website}</p>
                      <p className="text-xs text-muted-foreground">Sitio web</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => window.open(supplier.website, "_blank")}
                  >
                    <ExternalLink className="size-4" />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Dirección */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <MapPin className="size-5" />
              Dirección
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {supplier.address && (
                <p className="text-foreground">{supplier.address}</p>
              )}
              <p className="text-foreground">
                {[supplier.city, supplier.state, supplier.postalCode].filter(Boolean).join(", ")}
              </p>
              <p className="text-muted-foreground">{supplier.country}</p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Categoría</span>
                <Badge variant="outline">
                  {categoryLabels[supplier.category] || supplier.category}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información Financiera */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <CreditCard className="size-5" />
              Información Financiera
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Términos de pago</span>
              <span className="text-sm font-medium text-foreground">
                {paymentTermsLabels[supplier.paymentTerms] || supplier.paymentTerms}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Límite de crédito</span>
              <span className="text-sm font-medium text-foreground">
                ${mounted ? formatCurrency(supplier.creditLimit) : "---"}
              </span>
            </div>
            {supplier.bankName && (
              <>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Banco</span>
                  <span className="text-sm font-medium text-foreground">{supplier.bankName}</span>
                </div>
              </>
            )}
            {supplier.bankAccount && (
              <>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cuenta</span>
                  <span className="text-sm font-medium font-mono text-foreground">{supplier.bankAccount}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Notas y Fechas */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Calendar className="size-5" />
              Información Adicional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Creado</span>
              <span className="text-sm font-medium text-foreground">
                {new Date(supplier.createdAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Última actualización</span>
              <span className="text-sm font-medium text-foreground">
                {new Date(supplier.updatedAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </div>
            {supplier.notes && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Notas</p>
                  <p className="text-sm text-foreground">{supplier.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

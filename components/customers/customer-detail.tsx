"use client"

import * as React from "react"
import { 
  Pencil, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShoppingBag,
  CreditCard,
  Crown,
  Copy,
  Check,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Customer } from "./customer-form"

interface CustomerDetailProps {
  customer: Customer
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

function formatDate(dateString: string): string {
  if (!dateString) return "N/A"
  return new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const paymentLabels: Record<string, string> = {
  "cash": "Efectivo",
  "credit-card": "Tarjeta de Credito",
  "debit-card": "Tarjeta de Debito",
  "transfer": "Transferencia",
  "paypal": "PayPal",
}

const genderLabels: Record<string, string> = {
  "male": "Masculino",
  "female": "Femenino",
  "other": "Otro",
  "not-specified": "No especificado",
}

const countryLabels: Record<string, string> = {
  "MX": "Mexico",
  "US": "Estados Unidos",
  "CA": "Canada",
  "ES": "Espana",
  "AR": "Argentina",
  "CO": "Colombia",
  "CL": "Chile",
}

export function CustomerDetail({ customer, onEdit, onDelete }: CustomerDetailProps) {
  const [mounted, setMounted] = React.useState(false)
  const [copiedField, setCopiedField] = React.useState<string | null>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Columna principal */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header del cliente */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <Avatar className="size-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials(customer.firstName, customer.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-foreground">
                    {customer.firstName} {customer.lastName}
                  </h2>
                  {customer.isVip && (
                    <Badge className="gap-1 bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                      <Crown className="size-3" />
                      VIP
                    </Badge>
                  )}
                  <Badge variant={customer.isActive ? "default" : "secondary"}>
                    {customer.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">Codigo: {customer.code}</p>
                
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="size-4 text-muted-foreground" />
                    <span className="text-foreground">{customer.email}</span>
                    <button
                      onClick={() => copyToClipboard(customer.email, "email")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {copiedField === "email" ? <Check className="size-3" /> : <Copy className="size-3" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="size-4 text-muted-foreground" />
                    <span className="text-foreground">{customer.phone}</span>
                    <button
                      onClick={() => copyToClipboard(customer.phone, "phone")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {copiedField === "phone" ? <Check className="size-3" /> : <Copy className="size-3" />}
                    </button>
                  </div>
                </div>

                {customer.tags && customer.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {customer.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={onEdit}>
                  <Pencil className="size-4" />
                  Editar
                </Button>
                <Button variant="destructive" size="sm" className="gap-2" onClick={onDelete}>
                  <Trash2 className="size-4" />
                  Eliminar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informacion de contacto y direccion */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                Direccion de Envio
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customer.address ? (
                <div className="space-y-2">
                  <p className="text-foreground">{customer.address}</p>
                  <p className="text-muted-foreground">
                    {customer.city}, {customer.state} {customer.postalCode}
                  </p>
                  <p className="text-muted-foreground">
                    {countryLabels[customer.country] || customer.country}
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">Sin direccion registrada</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <CreditCard className="size-5 text-primary" />
                Datos de Facturacion
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customer.taxId ? (
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">RFC</p>
                    <p className="text-foreground font-mono">{customer.taxId}</p>
                  </div>
                  {customer.businessName && (
                    <div>
                      <p className="text-sm text-muted-foreground">Razon Social</p>
                      <p className="text-foreground">{customer.businessName}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">Sin datos fiscales</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notas */}
        {customer.notes && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{customer.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Columna lateral */}
      <div className="space-y-6">
        {/* Estadisticas */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingUp className="size-5 text-primary" />
              Estadisticas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Pedidos</span>
              </div>
              <span className="font-semibold text-foreground">{customer.totalOrders}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2">
                <CreditCard className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Gastado</span>
              </div>
              <span className="font-semibold text-foreground">
                ${mounted ? formatCurrency(customer.totalSpent) : "---"}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Promedio por Pedido</span>
              </div>
              <span className="font-semibold text-foreground">
                ${mounted ? formatCurrency(customer.averageOrderValue) : "---"}
              </span>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Ultimo Pedido</span>
                <span className="text-foreground">{formatDate(customer.lastOrderDate)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Cliente desde</span>
                <span className="text-foreground">{formatDate(customer.createdAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferencias */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Preferencias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Metodo de Pago Preferido</p>
              <p className="text-foreground">
                {paymentLabels[customer.preferredPayment] || customer.preferredPayment}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Limite de Credito</p>
              <p className="text-foreground font-semibold">
                ${mounted ? formatCurrency(customer.creditLimit) : "---"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Genero</p>
              <p className="text-foreground">
                {genderLabels[customer.gender] || customer.gender}
              </p>
            </div>

            {customer.dateOfBirth && (
              <div>
                <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
                <p className="text-foreground">{formatDate(customer.dateOfBirth)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

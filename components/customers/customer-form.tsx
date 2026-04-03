"use client"

import * as React from "react"
import { Save, X, User, Mail, Phone, MapPin, CreditCard, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export interface Customer {
  id: string
  code: string
  firstName: string
  lastName: string
  email: string
  phone: string
  alternatePhone: string
  dateOfBirth: string
  gender: string
  // Direccion
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  // Facturacion
  taxId: string
  businessName: string
  billingAddress: string
  // Preferencias
  preferredPayment: string
  creditLimit: number
  notes: string
  tags: string[]
  // Estado
  isActive: boolean
  isVip: boolean
  // Metricas
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastOrderDate: string
  // Timestamps
  createdAt: string
  updatedAt: string
}

interface CustomerFormProps {
  customer?: Customer | null
  onSave: (data: Partial<Customer>) => void
  onCancel: () => void
}

const paymentMethods = [
  { value: "cash", label: "Efectivo" },
  { value: "credit-card", label: "Tarjeta de Crédito" },
  { value: "debit-card", label: "Tarjeta de Débito" },
  { value: "transfer", label: "Transferencia" },
  { value: "paypal", label: "PayPal" },
]

const genderOptions = [
  { value: "male", label: "Masculino" },
  { value: "female", label: "Femenino" },
  { value: "other", label: "Otro" },
  { value: "not-specified", label: "No especificado" },
]

const countries = [
  { value: "MX", label: "México" },
  { value: "US", label: "Estados Unidos" },
  { value: "CA", label: "Canadá" },
  { value: "ES", label: "España" },
  { value: "AR", label: "Argentina" },
  { value: "CO", label: "Colombia" },
  { value: "CL", label: "Chile" },
]

export function CustomerForm({ customer, onSave, onCancel }: CustomerFormProps) {
  const [formData, setFormData] = React.useState<Partial<Customer>>({
    code: customer?.code || "",
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    alternatePhone: customer?.alternatePhone || "",
    dateOfBirth: customer?.dateOfBirth || "",
    gender: customer?.gender || "not-specified",
    address: customer?.address || "",
    city: customer?.city || "",
    state: customer?.state || "",
    postalCode: customer?.postalCode || "",
    country: customer?.country || "MX",
    taxId: customer?.taxId || "",
    businessName: customer?.businessName || "",
    billingAddress: customer?.billingAddress || "",
    preferredPayment: customer?.preferredPayment || "cash",
    creditLimit: customer?.creditLimit || 0,
    notes: customer?.notes || "",
    tags: customer?.tags || [],
    isActive: customer?.isActive ?? true,
    isVip: customer?.isVip ?? false,
  })

  const [tagInput, setTagInput] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCustomer = {
      ...formData,
      id: customer?.id || `CLI${Date.now()}`,
      code: formData.code || `C${Date.now().toString().slice(-6)}`,
      totalOrders: customer?.totalOrders || 0,
      totalSpent: customer?.totalSpent || 0,
      averageOrderValue: customer?.averageOrderValue || 0,
      lastOrderDate: customer?.lastOrderDate || "",
      createdAt: customer?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    onSave(newCustomer)
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }))
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="personal" className="gap-2">
            <User className="size-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="address" className="gap-2">
            <MapPin className="size-4" />
            Direccion
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="size-4" />
            Facturacion
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Star className="size-4" />
            Preferencias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Informacion Personal</CardTitle>
              <CardDescription>Datos basicos del cliente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="code">Codigo de Cliente</Label>
                  <Input
                    id="code"
                    placeholder="C000001"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Genero</Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input
                    id="firstName"
                    placeholder="Juan"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos *</Label>
                  <Input
                    id="lastName"
                    placeholder="Perez Garcia"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electronico *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan.perez@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Fecha de Nacimiento</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono Principal *</Label>
                  <Input
                    id="phone"
                    placeholder="+52 55 1234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Telefono Alternativo</Label>
                  <Input
                    id="alternatePhone"
                    placeholder="+52 55 8765 4321"
                    value={formData.alternatePhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, alternatePhone: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Direccion de Envio</CardTitle>
              <CardDescription>Direccion principal del cliente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Direccion</Label>
                <Input
                  id="address"
                  placeholder="Calle, numero, colonia"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    placeholder="Ciudad de Mexico"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    placeholder="CDMX"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Codigo Postal</Label>
                  <Input
                    id="postalCode"
                    placeholder="06600"
                    value={formData.postalCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Pais</Label>
                  <Select 
                    value={formData.country} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar pais" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Datos de Facturacion</CardTitle>
              <CardDescription>Informacion fiscal del cliente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taxId">RFC</Label>
                  <Input
                    id="taxId"
                    placeholder="XAXX010101000"
                    value={formData.taxId}
                    onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value.toUpperCase() }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessName">Razon Social</Label>
                  <Input
                    id="businessName"
                    placeholder="Nombre o razon social"
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingAddress">Direccion Fiscal</Label>
                <Textarea
                  id="billingAddress"
                  placeholder="Direccion completa para facturacion"
                  value={formData.billingAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, billingAddress: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="preferredPayment">Metodo de Pago Preferido</Label>
                  <Select 
                    value={formData.preferredPayment} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, preferredPayment: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar metodo" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditLimit">Limite de Credito</Label>
                  <Input
                    id="creditLimit"
                    type="number"
                    placeholder="0"
                    value={formData.creditLimit}
                    onChange={(e) => setFormData(prev => ({ ...prev, creditLimit: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Preferencias y Estado</CardTitle>
              <CardDescription>Configuracion adicional del cliente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-medium text-foreground">Cliente Activo</p>
                  <p className="text-sm text-muted-foreground">
                    El cliente puede realizar compras
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-medium text-foreground">Cliente VIP</p>
                  <p className="text-sm text-muted-foreground">
                    Acceso a beneficios especiales y descuentos
                  </p>
                </div>
                <Switch
                  checked={formData.isVip}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVip: checked }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Etiquetas</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Agregar etiqueta"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    Agregar
                  </Button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  placeholder="Notas adicionales sobre el cliente..."
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botones de accion */}
      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel} className="gap-2">
          <X className="size-4" />
          Cancelar
        </Button>
        <Button type="submit" className="gap-2">
          <Save className="size-4" />
          {customer ? "Guardar Cambios" : "Crear Cliente"}
        </Button>
      </div>
    </form>
  )
}

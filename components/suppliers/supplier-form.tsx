"use client"

import * as React from "react"
import { 
  Save, 
  X, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  CreditCard,
  FileText,
  Truck,
  Clock,
  Star,
  AlertCircle,
} from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface Supplier {
  id: string
  code: string
  companyName: string
  tradeName: string
  taxId: string
  contactName: string
  contactEmail: string
  contactPhone: string
  alternatePhone: string
  website: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  paymentTerms: string
  creditLimit: number
  bankName: string
  bankAccount: string
  notes: string
  category: string
  rating: number
  deliveryTime: number
  isActive: boolean
  isPreferred: boolean
  totalOrders: number
  totalPurchases: number
  createdAt: string
  updatedAt: string
}

interface SupplierFormProps {
  supplier?: Supplier | null
  onSave: (data: Partial<Supplier>) => void
  onCancel: () => void
}

const categoryOptions = [
  { value: "electronics", label: "Electrónica" },
  { value: "clothing", label: "Ropa y Textiles" },
  { value: "food", label: "Alimentos" },
  { value: "furniture", label: "Muebles" },
  { value: "packaging", label: "Empaques" },
  { value: "raw-materials", label: "Materias Primas" },
  { value: "office", label: "Oficina" },
  { value: "services", label: "Servicios" },
  { value: "other", label: "Otros" },
]

const paymentTermsOptions = [
  { value: "immediate", label: "Pago Inmediato" },
  { value: "net-15", label: "Net 15 días" },
  { value: "net-30", label: "Net 30 días" },
  { value: "net-45", label: "Net 45 días" },
  { value: "net-60", label: "Net 60 días" },
  { value: "net-90", label: "Net 90 días" },
  { value: "advance", label: "Pago Anticipado" },
]

const countryOptions = [
  { value: "MX", label: "México" },
  { value: "US", label: "Estados Unidos" },
  { value: "ES", label: "España" },
  { value: "AR", label: "Argentina" },
  { value: "CO", label: "Colombia" },
  { value: "CL", label: "Chile" },
  { value: "PE", label: "Perú" },
  { value: "CN", label: "China" },
  { value: "DE", label: "Alemania" },
  { value: "JP", label: "Japón" },
]

export function SupplierForm({ supplier, onSave, onCancel }: SupplierFormProps) {
  const isEditing = !!supplier

  const [formData, setFormData] = React.useState({
    code: supplier?.code || "",
    companyName: supplier?.companyName || "",
    tradeName: supplier?.tradeName || "",
    taxId: supplier?.taxId || "",
    contactName: supplier?.contactName || "",
    contactEmail: supplier?.contactEmail || "",
    contactPhone: supplier?.contactPhone || "",
    alternatePhone: supplier?.alternatePhone || "",
    website: supplier?.website || "",
    address: supplier?.address || "",
    city: supplier?.city || "",
    state: supplier?.state || "",
    postalCode: supplier?.postalCode || "",
    country: supplier?.country || "MX",
    paymentTerms: supplier?.paymentTerms || "net-30",
    creditLimit: supplier?.creditLimit || 0,
    bankName: supplier?.bankName || "",
    bankAccount: supplier?.bankAccount || "",
    notes: supplier?.notes || "",
    category: supplier?.category || "",
    rating: supplier?.rating || 0,
    deliveryTime: supplier?.deliveryTime || 7,
    isActive: supplier?.isActive ?? true,
    isPreferred: supplier?.isPreferred ?? false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const supplierData: Partial<Supplier> = {
      ...formData,
      id: supplier?.id || `SUP${Date.now()}`,
      totalOrders: supplier?.totalOrders || 0,
      totalPurchases: supplier?.totalPurchases || 0,
      createdAt: supplier?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    onSave(supplierData)
  }

  const generateCode = () => {
    const prefix = formData.companyName.substring(0, 3).toUpperCase() || "SUP"
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
    setFormData(prev => ({ ...prev, code: `${prefix}${random}` }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {formData.isPreferred && (
            <Badge variant="default" className="gap-1">
              <Star className="size-3" />
              Preferido
            </Badge>
          )}
          {formData.isActive ? (
            <Badge variant="outline" className="text-green-600 border-green-600">Activo</Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">Inactivo</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="mr-2 size-4" />
            Cancelar
          </Button>
          <Button type="submit">
            <Save className="mr-2 size-4" />
            {isEditing ? "Guardar Cambios" : "Crear Proveedor"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="size-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <User className="size-4" />
            <span className="hidden sm:inline">Contacto</span>
          </TabsTrigger>
          <TabsTrigger value="financial" className="gap-2">
            <CreditCard className="size-4" />
            <span className="hidden sm:inline">Financiero</span>
          </TabsTrigger>
          <TabsTrigger value="other" className="gap-2">
            <FileText className="size-4" />
            <span className="hidden sm:inline">Otros</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab General */}
        <TabsContent value="general" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Información de la Empresa</CardTitle>
                <CardDescription>Datos principales del proveedor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código de Proveedor</Label>
                    <div className="flex gap-2">
                      <Input
                        id="code"
                        placeholder="SUP001"
                        value={formData.code}
                        onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" onClick={generateCode}>
                        Generar
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">RFC / Tax ID *</Label>
                    <Input
                      id="taxId"
                      placeholder="XAXX010101000"
                      value={formData.taxId}
                      onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value.toUpperCase() }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Razón Social *</Label>
                  <Input
                    id="companyName"
                    placeholder="Empresa Proveedora S.A. de C.V."
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tradeName">Nombre Comercial</Label>
                    <Input
                      id="tradeName"
                      placeholder="Proveedor Express"
                      value={formData.tradeName}
                      onChange={(e) => setFormData(prev => ({ ...prev, tradeName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Sitio Web</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="website"
                      placeholder="https://www.proveedor.com"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Estado</CardTitle>
                <CardDescription>Configuración del proveedor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isActive">Proveedor Activo</Label>
                    <p className="text-xs text-muted-foreground">
                      Permite realizar pedidos
                    </p>
                  </div>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isPreferred">Proveedor Preferido</Label>
                    <p className="text-xs text-muted-foreground">
                      Prioridad en las compras
                    </p>
                  </div>
                  <Switch
                    id="isPreferred"
                    checked={formData.isPreferred}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPreferred: checked }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Tiempo de Entrega (días)</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="deliveryTime"
                      type="number"
                      min="1"
                      placeholder="7"
                      value={formData.deliveryTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, deliveryTime: parseInt(e.target.value) || 0 }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Calificación</Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star 
                          className={`size-6 ${
                            star <= formData.rating 
                              ? "fill-yellow-500 text-yellow-500" 
                              : "text-muted-foreground"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Contacto */}
        <TabsContent value="contact" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Contacto Principal</CardTitle>
                <CardDescription>Persona de contacto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Nombre del Contacto *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="contactName"
                      placeholder="Juan Pérez"
                      value={formData.contactName}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contacto@proveedor.com"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Teléfono Principal *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                      <Input
                        id="contactPhone"
                        placeholder="+52 55 1234 5678"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternatePhone">Teléfono Alternativo</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                      <Input
                        id="alternatePhone"
                        placeholder="+52 55 8765 4321"
                        value={formData.alternatePhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, alternatePhone: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Dirección</CardTitle>
                <CardDescription>Ubicación del proveedor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="address"
                      placeholder="Av. Principal #123, Col. Centro"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      placeholder="Ciudad de México"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado/Provincia</Label>
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
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input
                      id="postalCode"
                      placeholder="06600"
                      value={formData.postalCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Select 
                      value={formData.country} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar país" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryOptions.map((country) => (
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
          </div>
        </TabsContent>

        {/* Tab Financiero */}
        <TabsContent value="financial" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Condiciones de Pago</CardTitle>
                <CardDescription>Términos financieros</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Términos de Pago</Label>
                  <Select 
                    value={formData.paymentTerms} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar términos" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentTermsOptions.map((term) => (
                        <SelectItem key={term.value} value={term.value}>
                          {term.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creditLimit">Límite de Crédito</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                    <Input
                      id="creditLimit"
                      type="number"
                      min="0"
                      placeholder="50000"
                      value={formData.creditLimit}
                      onChange={(e) => setFormData(prev => ({ ...prev, creditLimit: parseFloat(e.target.value) || 0 }))}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="size-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Nota importante</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        El límite de crédito será verificado al momento de crear órdenes de compra. 
                        Las órdenes que excedan el límite requerirán aprobación adicional.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Información Bancaria</CardTitle>
                <CardDescription>Datos para pagos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Nombre del Banco</Label>
                  <Input
                    id="bankName"
                    placeholder="BBVA México"
                    value={formData.bankName}
                    onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Cuenta CLABE / Número de Cuenta</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="bankAccount"
                      placeholder="012345678901234567"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData(prev => ({ ...prev, bankAccount: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Otros */}
        <TabsContent value="other" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Notas y Observaciones</CardTitle>
              <CardDescription>Información adicional sobre el proveedor</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Agregar notas, condiciones especiales, acuerdos, etc."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={6}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  )
}

"use client"

import * as React from "react"
import { 
  CreditCard, 
  Building2, 
  Wallet, 
  DollarSign, 
  Save,
  Plus,
  Check,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const paymentMethods = [
  { 
    id: "stripe", 
    name: "Stripe", 
    description: "Tarjetas de crédito y débito",
    icon: CreditCard,
    connected: true,
    fee: "2.9% + $3.00 MXN",
  },
  { 
    id: "paypal", 
    name: "PayPal", 
    description: "Pagos con cuenta PayPal",
    icon: Wallet,
    connected: true,
    fee: "3.5% + $4.00 MXN",
  },
  { 
    id: "mercadopago", 
    name: "Mercado Pago", 
    description: "Pagos con Mercado Pago",
    icon: DollarSign,
    connected: false,
    fee: "3.49% + IVA",
  },
  { 
    id: "bank_transfer", 
    name: "Transferencia Bancaria", 
    description: "SPEI y transferencias directas",
    icon: Building2,
    connected: true,
    fee: "Sin comisión",
  },
]

const bankAccounts = [
  { 
    id: "1", 
    bank: "BBVA", 
    accountName: "ProductHub S.A. de C.V.",
    clabe: "012180001234567890",
    isDefault: true,
  },
  { 
    id: "2", 
    bank: "Santander", 
    accountName: "ProductHub S.A. de C.V.",
    clabe: "014180009876543210",
    isDefault: false,
  },
]

export function PaymentsSettings() {
  const [taxRate, setTaxRate] = React.useState("16")
  const [currency, setCurrency] = React.useState("MXN")
  const [autoInvoice, setAutoInvoice] = React.useState(true)
  const [requirePayment, setRequirePayment] = React.useState(false)

  return (
    <div className="space-y-6">
      {/* Métodos de Pago */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CreditCard className="size-5" />
            Métodos de Pago
          </CardTitle>
          <CardDescription>
            Configura las opciones de pago disponibles para tus clientes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <method.icon className="size-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{method.name}</p>
                    {method.connected && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-500 gap-1">
                        <Check className="size-3" />
                        Conectado
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Comisión: {method.fee}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.connected ? (
                  <>
                    <Button variant="outline" size="sm">
                      <Pencil className="size-4" />
                    </Button>
                    <Switch defaultChecked />
                  </>
                ) : (
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="size-4" />
                    Conectar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cuentas Bancarias */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Building2 className="size-5" />
                Cuentas Bancarias
              </CardTitle>
              <CardDescription>
                Cuentas para recibir transferencias y depósitos
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="size-4" />
              Agregar Cuenta
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {bankAccounts.map((account) => (
            <div 
              key={account.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{account.bank}</p>
                  {account.isDefault && (
                    <Badge variant="secondary">Predeterminada</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{account.accountName}</p>
                <p className="text-sm text-muted-foreground font-mono mt-1">
                  CLABE: {account.clabe}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Configuración de Impuestos */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <DollarSign className="size-5" />
            Impuestos y Facturación
          </CardTitle>
          <CardDescription>
            Configuración de impuestos y facturación automática
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tasa de IVA (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Moneda Principal</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="bg-secondary border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MXN">Peso Mexicano (MXN)</SelectItem>
                  <SelectItem value="USD">Dólar (USD)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <div>
                <p className="font-medium text-foreground">Facturación automática</p>
                <p className="text-sm text-muted-foreground">
                  Generar factura automáticamente al completar un pedido
                </p>
              </div>
              <Switch checked={autoInvoice} onCheckedChange={setAutoInvoice} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <div>
                <p className="font-medium text-foreground">Requerir pago antes de procesar</p>
                <p className="text-sm text-muted-foreground">
                  Los pedidos no se procesan hasta confirmar el pago
                </p>
              </div>
              <Switch checked={requirePayment} onCheckedChange={setRequirePayment} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón Guardar */}
      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="size-4" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  )
}

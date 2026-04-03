"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Crown,
  Phone,
  Mail,
  ShoppingBag,
} from "lucide-react"
import { CustomersHeader } from "@/components/customers/customers-header"
import { CustomersStats } from "@/components/customers/customers-stats"
import { CustomerForm, type Customer } from "@/components/customers/customer-form"
import { CustomerDetail } from "@/components/customers/customer-detail"
import { DeleteCustomerDialog } from "@/components/customers/delete-customer-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const initialCustomers: Customer[] = [
  {
    id: "CLI001",
    code: "C000001",
    firstName: "Maria",
    lastName: "Gonzalez Rodriguez",
    email: "maria.gonzalez@email.com",
    phone: "+52 55 1234 5678",
    alternatePhone: "",
    dateOfBirth: "1985-03-15",
    gender: "female",
    address: "Av. Insurgentes Sur 1234, Col. Del Valle",
    city: "Ciudad de Mexico",
    state: "CDMX",
    postalCode: "03100",
    country: "MX",
    taxId: "GORM850315ABC",
    businessName: "Maria Gonzalez Rodriguez",
    billingAddress: "Av. Insurgentes Sur 1234, Col. Del Valle, CDMX 03100",
    preferredPayment: "credit-card",
    creditLimit: 50000,
    notes: "Cliente frecuente. Prefiere entregas por la tarde.",
    tags: ["frecuente", "preferencial"],
    isActive: true,
    isVip: true,
    totalOrders: 45,
    totalSpent: 125000,
    averageOrderValue: 2777.78,
    lastOrderDate: "2024-03-18T10:30:00Z",
    createdAt: "2022-01-15T10:00:00Z",
    updatedAt: "2024-03-18T10:30:00Z",
  },
  {
    id: "CLI002",
    code: "C000002",
    firstName: "Carlos",
    lastName: "Martinez Lopez",
    email: "carlos.martinez@empresa.com",
    phone: "+52 33 9876 5432",
    alternatePhone: "+52 33 1111 2222",
    dateOfBirth: "1990-07-22",
    gender: "male",
    address: "Blvd. Puerta de Hierro 5065",
    city: "Guadalajara",
    state: "Jalisco",
    postalCode: "45116",
    country: "MX",
    taxId: "MALC900722XYZ",
    businessName: "Tecnologias Martinez S.A. de C.V.",
    billingAddress: "Blvd. Puerta de Hierro 5065, Guadalajara, Jalisco 45116",
    preferredPayment: "transfer",
    creditLimit: 100000,
    notes: "Compras para empresa. Requiere factura siempre.",
    tags: ["empresa", "facturacion"],
    isActive: true,
    isVip: true,
    totalOrders: 78,
    totalSpent: 450000,
    averageOrderValue: 5769.23,
    lastOrderDate: "2024-03-20T15:45:00Z",
    createdAt: "2021-06-10T08:00:00Z",
    updatedAt: "2024-03-20T15:45:00Z",
  },
  {
    id: "CLI003",
    code: "C000003",
    firstName: "Ana",
    lastName: "Hernandez Garcia",
    email: "ana.hernandez@gmail.com",
    phone: "+52 81 5555 6666",
    alternatePhone: "",
    dateOfBirth: "1995-11-08",
    gender: "female",
    address: "Carr. Miguel Aleman Km 25",
    city: "Monterrey",
    state: "Nuevo Leon",
    postalCode: "66450",
    country: "MX",
    taxId: "",
    businessName: "",
    billingAddress: "",
    preferredPayment: "debit-card",
    creditLimit: 0,
    notes: "",
    tags: ["nuevo"],
    isActive: true,
    isVip: false,
    totalOrders: 5,
    totalSpent: 15000,
    averageOrderValue: 3000,
    lastOrderDate: "2024-02-28T12:00:00Z",
    createdAt: "2024-01-05T09:00:00Z",
    updatedAt: "2024-02-28T12:00:00Z",
  },
  {
    id: "CLI004",
    code: "C000004",
    firstName: "Roberto",
    lastName: "Sanchez Perez",
    email: "r.sanchez@outlook.com",
    phone: "+52 442 123 4567",
    alternatePhone: "",
    dateOfBirth: "1978-04-30",
    gender: "male",
    address: "Parque Industrial Benito Juarez",
    city: "Queretaro",
    state: "Queretaro",
    postalCode: "76120",
    country: "MX",
    taxId: "SAPR780430LMN",
    businessName: "Distribuidora Sanchez",
    billingAddress: "Parque Industrial Benito Juarez, Queretaro 76120",
    preferredPayment: "transfer",
    creditLimit: 75000,
    notes: "Mayorista. Solicita descuentos por volumen.",
    tags: ["mayorista", "descuento"],
    isActive: true,
    isVip: false,
    totalOrders: 32,
    totalSpent: 280000,
    averageOrderValue: 8750,
    lastOrderDate: "2024-03-15T14:20:00Z",
    createdAt: "2022-09-20T11:00:00Z",
    updatedAt: "2024-03-15T14:20:00Z",
  },
  {
    id: "CLI005",
    code: "C000005",
    firstName: "Laura",
    lastName: "Diaz Moreno",
    email: "laura.diaz@yahoo.com",
    phone: "+52 477 987 6543",
    alternatePhone: "",
    dateOfBirth: "1988-12-12",
    gender: "female",
    address: "Central de Abastos Local 45",
    city: "Leon",
    state: "Guanajuato",
    postalCode: "37000",
    country: "MX",
    taxId: "",
    businessName: "",
    billingAddress: "",
    preferredPayment: "cash",
    creditLimit: 0,
    notes: "Cliente inactivo desde hace 6 meses.",
    tags: ["inactivo"],
    isActive: false,
    isVip: false,
    totalOrders: 12,
    totalSpent: 35000,
    averageOrderValue: 2916.67,
    lastOrderDate: "2023-09-10T10:30:00Z",
    createdAt: "2022-03-15T07:00:00Z",
    updatedAt: "2023-09-10T10:30:00Z",
  },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

type ViewMode = "list" | "create" | "edit" | "detail"

export default function ClientesPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredCustomers = searchQuery
    ? customers.filter(cust =>
        `${cust.firstName} ${cust.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.phone.includes(searchQuery)
      )
    : customers

  const handleNewCustomer = () => {
    setCurrentCustomer(null)
    setViewMode("create")
  }

  const handleViewCustomer = (customer: Customer) => {
    setCurrentCustomer(customer)
    setViewMode("detail")
  }

  const handleEditCustomer = (customer: Customer) => {
    setCurrentCustomer(customer)
    setViewMode("edit")
  }

  const handleDeleteCustomer = (customer: Customer) => {
    setCustomerToDelete(customer)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (customerToDelete) {
      setCustomers(prev => prev.filter(c => c.id !== customerToDelete.id))
      setCustomerToDelete(null)
      if (viewMode === "detail") {
        setViewMode("list")
        setCurrentCustomer(null)
      }
    }
  }

  const handleSaveCustomer = (customerData: Partial<Customer>) => {
    if (viewMode === "edit" && currentCustomer) {
      setCustomers(prev => prev.map(c =>
        c.id === currentCustomer.id ? { ...c, ...customerData } as Customer : c
      ))
    } else {
      setCustomers(prev => [...prev, customerData as Customer])
    }
    setViewMode("list")
    setCurrentCustomer(null)
  }

  const handleCancel = () => {
    setViewMode("list")
    setCurrentCustomer(null)
  }

  // Estadisticas
  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.isActive).length
  const vipCustomers = customers.filter(c => c.isVip).length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase()
  }

  return (
<>

 <CustomersHeader
          viewMode={viewMode}
          onNewCustomer={handleNewCustomer}
          onBack={handleCancel}
          onSearch={setSearchQuery}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {viewMode === "list" 
                  ? "Clientes" 
                  : viewMode === "create" 
                  ? "Nuevo Cliente" 
                  : viewMode === "edit"
                  ? "Editar Cliente"
                  : "Detalles del Cliente"
                }
              </h1>
              <p className="text-muted-foreground">
                {viewMode === "list" 
                  ? "Gestiona tu base de clientes y su informacion"
                  : viewMode === "create"
                  ? "Completa la informacion para registrar un nuevo cliente"
                  : viewMode === "edit"
                  ? "Modifica la informacion del cliente"
                  : "Informacion completa del cliente"
                }
              </p>
            </div>

            {viewMode === "list" && (
              <>
                <CustomersStats
                  totalCustomers={totalCustomers}
                  activeCustomers={activeCustomers}
                  vipCustomers={vipCustomers}
                  totalRevenue={totalRevenue}
                />

                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="size-5 text-primary" />
                      <div>
                        <CardTitle className="text-foreground">Lista de Clientes</CardTitle>
                        <CardDescription>
                          {filteredCustomers.length} clientes 
                          {searchQuery && ` encontrados para "${searchQuery}"`}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground">Cliente</TableHead>
                          <TableHead className="text-muted-foreground">Contacto</TableHead>
                          <TableHead className="text-muted-foreground">Pedidos</TableHead>
                          <TableHead className="text-muted-foreground">Total Gastado</TableHead>
                          <TableHead className="text-muted-foreground">Estado</TableHead>
                          <TableHead className="text-muted-foreground w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomers.map((customer) => (
                          <TableRow key={customer.id} className="border-border">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="size-10">
                                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                    {getInitials(customer.firstName, customer.lastName)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-foreground">
                                      {customer.firstName} {customer.lastName}
                                    </p>
                                    {customer.isVip && (
                                      <Crown className="size-4 fill-yellow-500 text-yellow-500" />
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground">{customer.code}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                  <Mail className="size-3 text-muted-foreground" />
                                  {customer.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="size-3" />
                                  {customer.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium text-foreground">{customer.totalOrders}</span>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium text-foreground">
                                ${mounted ? formatCurrency(customer.totalSpent) : "---"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Badge variant={customer.isActive ? "default" : "secondary"}>
                                  {customer.isActive ? "Activo" : "Inactivo"}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              {mounted ? (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="size-8">
                                      <MoreHorizontal className="size-4" />
                                      <span className="sr-only">Abrir menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                                      <Eye className="mr-2 size-4" />
                                      Ver detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleEditCustomer(customer)}>
                                      <Pencil className="mr-2 size-4" />
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-destructive"
                                      onClick={() => handleDeleteCustomer(customer)}
                                    >
                                      <Trash2 className="mr-2 size-4" />
                                      Eliminar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              ) : (
                                <Button variant="ghost" size="icon" className="size-8">
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}

            {(viewMode === "create" || viewMode === "edit") && (
              <CustomerForm
                customer={currentCustomer}
                onSave={handleSaveCustomer}
                onCancel={handleCancel}
              />
            )}

            {viewMode === "detail" && currentCustomer && (
              <CustomerDetail
                customer={currentCustomer}
                onEdit={() => setViewMode("edit")}
                onDelete={() => handleDeleteCustomer(currentCustomer)}
              />
            )}
          </div>
        </main>


      <DeleteCustomerDialog
        customer={customerToDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />


</>
       

  )
}

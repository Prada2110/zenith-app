"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Building2,
  Star,
  Phone,
  Mail,
} from "lucide-react"
import { SuppliersHeader } from "@/components/suppliers/suppliers-header"
import { SuppliersStats } from "@/components/suppliers/suppliers-stats"
import { SupplierForm, type Supplier } from "@/components/suppliers/supplier-form"
import { SupplierDetail } from "@/components/suppliers/supplier-detail"
import { DeleteSupplierDialog } from "@/components/suppliers/delete-supplier-dialog"
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

const initialSuppliers: Supplier[] = [
  {
    id: "SUP001",
    code: "TEC001",
    companyName: "Tech Solutions S.A. de C.V.",
    tradeName: "TechSol",
    taxId: "TSO120315ABC",
    contactName: "Carlos Ramírez",
    contactEmail: "carlos@techsol.mx",
    contactPhone: "+52 55 1234 5678",
    alternatePhone: "+52 55 8765 4321",
    website: "https://techsol.mx",
    address: "Av. Reforma 123, Col. Juárez",
    city: "Ciudad de México",
    state: "CDMX",
    postalCode: "06600",
    country: "MX",
    paymentTerms: "net-30",
    creditLimit: 500000,
    bankName: "BBVA México",
    bankAccount: "012345678901234567",
    notes: "Proveedor principal de electrónica. Descuento del 5% en pedidos mayores a $50,000",
    category: "electronics",
    rating: 5,
    deliveryTime: 3,
    isActive: true,
    isPreferred: true,
    totalOrders: 156,
    totalPurchases: 2450000,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-03-20T15:30:00Z",
  },
  {
    id: "SUP002",
    code: "MOD002",
    companyName: "Moda Global Textiles S.A.",
    tradeName: "ModaGlobal",
    taxId: "MGT180520XYZ",
    contactName: "Ana García",
    contactEmail: "ana.garcia@modaglobal.com",
    contactPhone: "+52 33 9876 5432",
    alternatePhone: "",
    website: "https://modaglobal.com",
    address: "Blvd. Puerta de Hierro 5065",
    city: "Guadalajara",
    state: "Jalisco",
    postalCode: "45116",
    country: "MX",
    paymentTerms: "net-45",
    creditLimit: 300000,
    bankName: "Santander",
    bankAccount: "014123456789012345",
    notes: "",
    category: "clothing",
    rating: 4,
    deliveryTime: 7,
    isActive: true,
    isPreferred: false,
    totalOrders: 89,
    totalPurchases: 1250000,
    createdAt: "2023-03-10T08:00:00Z",
    updatedAt: "2024-03-18T09:15:00Z",
  },
  {
    id: "SUP003",
    code: "PAC003",
    companyName: "Empaques del Norte S.A.",
    tradeName: "EmpaNorte",
    taxId: "END150812QRS",
    contactName: "Roberto Hernández",
    contactEmail: "rhernandez@empanorte.mx",
    contactPhone: "+52 81 1234 9876",
    alternatePhone: "+52 81 9876 1234",
    website: "",
    address: "Carr. Miguel Alemán Km 25",
    city: "Monterrey",
    state: "Nuevo León",
    postalCode: "66450",
    country: "MX",
    paymentTerms: "net-15",
    creditLimit: 150000,
    bankName: "Banorte",
    bankAccount: "072123456789012345",
    notes: "Especialista en cajas y material de empaque sustentable",
    category: "packaging",
    rating: 4,
    deliveryTime: 5,
    isActive: true,
    isPreferred: true,
    totalOrders: 234,
    totalPurchases: 890000,
    createdAt: "2022-08-20T14:00:00Z",
    updatedAt: "2024-03-19T11:45:00Z",
  },
  {
    id: "SUP004",
    code: "MUE004",
    companyName: "Muebles Finos de Querétaro",
    tradeName: "MueblesQro",
    taxId: "MFQ170305LMN",
    contactName: "Laura Martínez",
    contactEmail: "ventas@mueblesqro.com",
    contactPhone: "+52 442 123 4567",
    alternatePhone: "",
    website: "https://mueblesqro.com",
    address: "Parque Industrial Benito Juárez",
    city: "Querétaro",
    state: "Querétaro",
    postalCode: "76120",
    country: "MX",
    paymentTerms: "net-60",
    creditLimit: 400000,
    bankName: "HSBC",
    bankAccount: "021123456789012345",
    notes: "Fabricante de muebles de oficina. Tiempo de fabricación: 15-20 días hábiles",
    category: "furniture",
    rating: 3,
    deliveryTime: 20,
    isActive: true,
    isPreferred: false,
    totalOrders: 45,
    totalPurchases: 680000,
    createdAt: "2023-05-01T09:00:00Z",
    updatedAt: "2024-02-28T16:00:00Z",
  },
  {
    id: "SUP005",
    code: "ALI005",
    companyName: "Distribuidora de Alimentos del Bajío",
    tradeName: "AliBajío",
    taxId: "DAB190610OPQ",
    contactName: "Miguel Ángel Sánchez",
    contactEmail: "miguel@alibajio.mx",
    contactPhone: "+52 477 987 6543",
    alternatePhone: "+52 477 123 4567",
    website: "https://alibajio.mx",
    address: "Central de Abastos Local 45",
    city: "León",
    state: "Guanajuato",
    postalCode: "37000",
    country: "MX",
    paymentTerms: "immediate",
    creditLimit: 0,
    bankName: "",
    bankAccount: "",
    notes: "Solo pago en efectivo o transferencia inmediata",
    category: "food",
    rating: 5,
    deliveryTime: 1,
    isActive: false,
    isPreferred: false,
    totalOrders: 567,
    totalPurchases: 1890000,
    createdAt: "2022-06-15T07:00:00Z",
    updatedAt: "2024-01-10T10:30:00Z",
  },
]

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

type ViewMode = "list" | "create" | "edit" | "detail"

export default function ProveedoresPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredSuppliers = searchQuery
    ? suppliers.filter(sup =>
        sup.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sup.tradeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sup.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sup.contactName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : suppliers

  const handleNewSupplier = () => {
    setCurrentSupplier(null)
    setViewMode("create")
  }

  const handleViewSupplier = (supplier: Supplier) => {
    setCurrentSupplier(supplier)
    setViewMode("detail")
  }

  const handleEditSupplier = (supplier: Supplier) => {
    setCurrentSupplier(supplier)
    setViewMode("edit")
  }

  const handleDeleteSupplier = (supplier: Supplier) => {
    setSupplierToDelete(supplier)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (supplierToDelete) {
      setSuppliers(prev => prev.filter(s => s.id !== supplierToDelete.id))
      setSupplierToDelete(null)
      if (viewMode === "detail") {
        setViewMode("list")
        setCurrentSupplier(null)
      }
    }
  }

  const handleSaveSupplier = (supplierData: Partial<Supplier>) => {
    if (viewMode === "edit" && currentSupplier) {
      setSuppliers(prev => prev.map(s =>
        s.id === currentSupplier.id ? { ...s, ...supplierData } as Supplier : s
      ))
    } else {
      setSuppliers(prev => [...prev, supplierData as Supplier])
    }
    setViewMode("list")
    setCurrentSupplier(null)
  }

  const handleCancel = () => {
    setViewMode("list")
    setCurrentSupplier(null)
  }

  // Estadísticas
  const totalSuppliers = suppliers.length
  const activeSuppliers = suppliers.filter(s => s.isActive).length
  const pendingOrders = 12 // Simulado
  const totalPurchases = suppliers.reduce((sum, s) => sum + s.totalPurchases, 0)

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
  }

  return (
<>
<SuppliersHeader
          viewMode={viewMode}
          onNewSupplier={handleNewSupplier}
          onBack={handleCancel}
          onSearch={setSearchQuery}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {viewMode === "list" 
                  ? "Proveedores" 
                  : viewMode === "create" 
                  ? "Nuevo Proveedor" 
                  : viewMode === "edit"
                  ? "Editar Proveedor"
                  : "Detalles del Proveedor"
                }
              </h1>
              <p className="text-muted-foreground">
                {viewMode === "list" 
                  ? "Gestiona tus proveedores y sus condiciones comerciales"
                  : viewMode === "create"
                  ? "Completa la información para registrar un nuevo proveedor"
                  : viewMode === "edit"
                  ? "Modifica la información del proveedor"
                  : "Información completa del proveedor"
                }
              </p>
            </div>

            {viewMode === "list" && (
              <>
                <SuppliersStats
                  totalSuppliers={totalSuppliers}
                  activeSuppliers={activeSuppliers}
                  pendingOrders={pendingOrders}
                  totalPurchases={totalPurchases}
                />

                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Building2 className="size-5 text-primary" />
                      <div>
                        <CardTitle className="text-foreground">Lista de Proveedores</CardTitle>
                        <CardDescription>
                          {filteredSuppliers.length} proveedores 
                          {searchQuery && ` encontrados para "${searchQuery}"`}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground">Proveedor</TableHead>
                          <TableHead className="text-muted-foreground">Contacto</TableHead>
                          <TableHead className="text-muted-foreground">Categoría</TableHead>
                          <TableHead className="text-muted-foreground">Calificación</TableHead>
                          <TableHead className="text-muted-foreground">Estado</TableHead>
                          <TableHead className="text-muted-foreground w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSuppliers.map((supplier) => (
                          <TableRow key={supplier.id} className="border-border">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="size-10">
                                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                    {getInitials(supplier.companyName)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-foreground">{supplier.companyName}</p>
                                    {supplier.isPreferred && (
                                      <Star className="size-4 fill-yellow-500 text-yellow-500" />
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground">{supplier.code}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                  <Mail className="size-3 text-muted-foreground" />
                                  {supplier.contactEmail}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="size-3" />
                                  {supplier.contactPhone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {categoryLabels[supplier.category] || supplier.category}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-0.5">
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
                            </TableCell>
                            <TableCell>
                              <Badge variant={supplier.isActive ? "default" : "secondary"}>
                                {supplier.isActive ? "Activo" : "Inactivo"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {mounted ? (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="size-8">
                                      <MoreHorizontal className="size-4" />
                                      <span className="sr-only">Abrir menú</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleViewSupplier(supplier)}>
                                      <Eye className="mr-2 size-4" />
                                      Ver detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleEditSupplier(supplier)}>
                                      <Pencil className="mr-2 size-4" />
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-destructive"
                                      onClick={() => handleDeleteSupplier(supplier)}
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
              <SupplierForm
                supplier={currentSupplier}
                onSave={handleSaveSupplier}
                onCancel={handleCancel}
              />
            )}

            {viewMode === "detail" && currentSupplier && (
              <SupplierDetail
                supplier={currentSupplier}
                onEdit={() => setViewMode("edit")}
                onDelete={() => handleDeleteSupplier(currentSupplier)}
              />
            )}
          </div>
        </main>


      <DeleteSupplierDialog
        supplier={supplierToDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
</>
        

  )
}

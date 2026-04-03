"use client"

import * as React from "react"
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Shield, 
  Mail, 
  Pencil, 
  Trash2,
  UserPlus,
  Check,
  X,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const users = [
  {
    id: "1",
    name: "Carlos Admin",
    email: "admin@empresa.com",
    role: "admin",
    status: "active",
    lastLogin: "Hace 5 minutos",
    avatar: null,
  },
  {
    id: "2",
    name: "María García",
    email: "maria@empresa.com",
    role: "manager",
    status: "active",
    lastLogin: "Hace 2 horas",
    avatar: null,
  },
  {
    id: "3",
    name: "Juan Pérez",
    email: "juan@empresa.com",
    role: "sales",
    status: "active",
    lastLogin: "Ayer",
    avatar: null,
  },
  {
    id: "4",
    name: "Ana López",
    email: "ana@empresa.com",
    role: "inventory",
    status: "inactive",
    lastLogin: "Hace 1 semana",
    avatar: null,
  },
]

const roles = [
  { value: "admin", label: "Administrador", description: "Acceso total al sistema" },
  { value: "manager", label: "Gerente", description: "Gestión de productos, pedidos y reportes" },
  { value: "sales", label: "Ventas", description: "Crear y gestionar pedidos" },
  { value: "inventory", label: "Inventario", description: "Gestión de stock y proveedores" },
  { value: "viewer", label: "Visualizador", description: "Solo lectura" },
]

export function UsersSettings() {
  const [mounted, setMounted] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [showAddUser, setShowAddUser] = React.useState(false)
  const [newUser, setNewUser] = React.useState({
    name: "",
    email: "",
    role: "sales",
    sendInvite: true,
  })

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      admin: "bg-red-500/20 text-red-500",
      manager: "bg-purple-500/20 text-purple-500",
      sales: "bg-blue-500/20 text-blue-500",
      inventory: "bg-green-500/20 text-green-500",
      viewer: "bg-gray-500/20 text-gray-500",
    }
    const labels: Record<string, string> = {
      admin: "Administrador",
      manager: "Gerente",
      sales: "Ventas",
      inventory: "Inventario",
      viewer: "Visualizador",
    }
    return (
      <Badge variant="secondary" className={colors[role]}>
        {labels[role]}
      </Badge>
    )
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Users className="size-5" />
                Usuarios del Sistema
              </CardTitle>
              <CardDescription>
                Gestiona los usuarios y sus permisos de acceso
              </CardDescription>
            </div>
            <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <UserPlus className="size-4" />
                  Agregar Usuario
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                  <DialogDescription>
                    Invita a un nuevo usuario al sistema
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Nombre Completo</Label>
                    <Input
                      id="userName"
                      value={newUser.name}
                      onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nombre del usuario"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="usuario@empresa.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userRole">Rol</Label>
                    <Select 
                      value={newUser.role} 
                      onValueChange={(v) => setNewUser(prev => ({ ...prev, role: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.value} value={role.value}>
                            <div>
                              <p className="font-medium">{role.label}</p>
                              <p className="text-xs text-muted-foreground">{role.description}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="sendInvite">Enviar invitación por email</Label>
                      <p className="text-xs text-muted-foreground">
                        El usuario recibirá un correo para crear su contraseña
                      </p>
                    </div>
                    <Switch
                      id="sendInvite"
                      checked={newUser.sendInvite}
                      onCheckedChange={(v) => setNewUser(prev => ({ ...prev, sendInvite: v }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddUser(false)}>
                    Cancelar
                  </Button>
                  <Button className="gap-2">
                    <Mail className="size-4" />
                    Enviar Invitación
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Búsqueda */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary border-0"
            />
          </div>

          {/* Tabla de usuarios */}
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Usuario</TableHead>
                  <TableHead className="text-muted-foreground">Rol</TableHead>
                  <TableHead className="text-muted-foreground">Estado</TableHead>
                  <TableHead className="text-muted-foreground">Último acceso</TableHead>
                  <TableHead className="text-muted-foreground w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarImage src={user.avatar || undefined} />
                          <AvatarFallback className="bg-primary/20 text-primary text-sm">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      {user.status === "active" ? (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-500 gap-1">
                          <Check className="size-3" />
                          Activo
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-500/20 text-gray-500 gap-1">
                          <X className="size-3" />
                          Inactivo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell>
                      {mounted && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Pencil className="mr-2 size-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 size-4" />
                              Cambiar Rol
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 size-4" />
                              Reenviar Invitación
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 size-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Roles y Permisos */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="size-5" />
            Roles y Permisos
          </CardTitle>
          <CardDescription>
            Define los niveles de acceso para cada rol
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map(role => (
              <div 
                key={role.value}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
              >
                <div>
                  <p className="font-medium text-foreground">{role.label}</p>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar Permisos
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

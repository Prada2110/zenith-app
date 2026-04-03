"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Package,
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  FolderOpen,
  Tags,
  Truck,
  FileText,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

import Image from "next/image"




const mainNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Productos", icon: Package, href: "/productos" },
  { title: "Categorías", icon: FolderOpen, href: "/categorias" },
  { title: "Inventario", icon: Tags, href: "/inventario" },
  { title: "Pedidos", icon: ShoppingCart, href: "/pedidos" },
  { title: "Proveedores", icon: Truck, href: "/proveedores" },
]

const analyticsItems = [
  { title: "Reportes", icon: FileText, href: "/reportes" },
  { title: "Estadísticas", icon: BarChart3, href: "/estadisticas" },
  { title: "Clientes", icon: Users, href: "/clientes" },
]

const settingsItems = [
  { title: "Configuración", icon: Settings, href: "/configuracion" },
  { title: "Ayuda", icon: HelpCircle, href: "/ayuda" },
]

export function AppSidebar({ children }: { children: React.ReactNode }) {

   const pathname = usePathname() // 🔥 clave
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
const isActiveRoute = (href: string) => {
  if (href === "/") {
    return pathname === "/"
  }
  return pathname.startsWith(href)
}



  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Image
                  src={"/logo-zenith.svg"}
                  alt="Imagen del logo de zenith app"
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">ZenithApp</span>
                <span className="text-xs text-muted-foreground">
                  Software Contable
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* PRINCIPAL */}
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* ANALISIS */}
        <SidebarGroup>
          <SidebarGroupLabel>Análisis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* SISTEMA */}
        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-sidebar-border">
        {children}
      </SidebarFooter>

    </Sidebar>
  )
}

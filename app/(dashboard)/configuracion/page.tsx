"use client"

import * as React from "react"
import { 
  Search, 
  Settings, 
  Building2, 
  Users, 
  Bell, 
  CreditCard, 
  Shield,
  Truck,
  Palette,
  Database,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { GeneralSettings } from "@/components/settings/general-settings"
import { UsersSettings } from "@/components/settings/users-settings"
import { NotificationsSettings } from "@/components/settings/notifications-settings"
import { PaymentsSettings } from "@/components/settings/payments-settings"
import { SecuritySettings } from "@/components/settings/security-settings"

const settingsTabs = [
  { value: "general", label: "General", icon: Building2 },
  { value: "users", label: "Usuarios", icon: Users },
  { value: "notifications", label: "Notificaciones", icon: Bell },
  { value: "payments", label: "Pagos", icon: CreditCard },
  { value: "security", label: "Seguridad", icon: Shield },
]

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = React.useState("general")

  return (
<>
 {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-2">
                  <Settings className="size-4" />
                  Configuración
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar configuración..."
                className="w-64 pl-8 bg-secondary border-0"
              />
            </div>

          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Configuración
              </h1>
              <p className="text-muted-foreground">
                Gestiona todas las configuraciones de tu sistema
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Tabs Navigation */}
              <div className="border-b border-border">
                <TabsList className="h-auto p-0 bg-transparent gap-4">
                  {settingsTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none gap-2"
                    >
                      <tab.icon className="size-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Tab Contents */}
              <TabsContent value="general" className="mt-6">
                <GeneralSettings />
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <UsersSettings />
              </TabsContent>

              <TabsContent value="notifications" className="mt-6">
                <NotificationsSettings />
              </TabsContent>

              <TabsContent value="payments" className="mt-6">
                <PaymentsSettings />
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <SecuritySettings />
              </TabsContent>
            </Tabs>
          </div>
        </main>


</>
       

  )
}

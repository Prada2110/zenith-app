"use client"

import * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ProfileInfo } from "@/components/profile/profile-info"
import { ProfileEditForm } from "@/components/profile/profile-edit-form"
import { ProfileActivity } from "@/components/profile/profile-activity"
import { ProfileSecurity } from "@/components/profile/profile-security"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { User, Activity, Shield } from "lucide-react"

type ViewMode = "view" | "edit"

export default function PerfilPage() {
  const [viewMode, setViewMode] = React.useState<ViewMode>("view")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Mi Perfil</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">

          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {viewMode === "edit" ? (
              <ProfileEditForm 
                onSave={() => setViewMode("view")} 
                onCancel={() => setViewMode("view")} 
              />
            ) : (
              <Tabs defaultValue="info" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Mi Perfil</h1>
                    <p className="text-muted-foreground">
                      Gestiona tu información personal y configuración de cuenta
                    </p>
                  </div>
                  <TabsList>
                    <TabsTrigger value="info" className="gap-2">
                      <User className="size-4" />
                      Información
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="gap-2">
                      <Activity className="size-4" />
                      Actividad
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                      <Shield className="size-4" />
                      Seguridad
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="info">
                  <ProfileInfo onEdit={() => setViewMode("edit")} />
                </TabsContent>

                <TabsContent value="activity">
                  <ProfileActivity />
                </TabsContent>

                <TabsContent value="security">
                  <ProfileSecurity />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
<header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Mi Perfil</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">

          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {viewMode === "edit" ? (
              <ProfileEditForm 
                onSave={() => setViewMode("view")} 
                onCancel={() => setViewMode("view")} 
              />
            ) : (
              <Tabs defaultValue="info" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Mi Perfil</h1>
                    <p className="text-muted-foreground">
                      Gestiona tu información personal y configuración de cuenta
                    </p>
                  </div>
                  <TabsList>
                    <TabsTrigger value="info" className="gap-2">
                      <User className="size-4" />
                      Información
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="gap-2">
                      <Activity className="size-4" />
                      Actividad
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                      <Shield className="size-4" />
                      Seguridad
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="info">
                  <ProfileInfo onEdit={() => setViewMode("edit")} />
                </TabsContent>

                <TabsContent value="activity">
                  <ProfileActivity />
                </TabsContent>

                <TabsContent value="security">
                  <ProfileSecurity />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>

    
    
    </>
        
  )
}

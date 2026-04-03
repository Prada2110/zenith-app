"use client"

import * as React from "react"
import { 
  Search, 
  HelpCircle,
  BookOpen,
  MessageSquare,
  Keyboard,
  Sparkles,
} from "lucide-react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { FAQSection } from "@/components/help/faq-section"
import { GuidesSection } from "@/components/help/guides-section"
import { SupportSection } from "@/components/help/support-section"
import { ShortcutsSection } from "@/components/help/shortcuts-section"

const quickLinks = [
  {
    title: "Comenzar",
    description: "Guía de inicio rápido para nuevos usuarios",
    icon: Sparkles,
    color: "bg-purple-500/20 text-purple-500",
  },
  {
    title: "Documentación",
    description: "Manual completo del sistema",
    icon: BookOpen,
    color: "bg-blue-500/20 text-blue-500",
  },
  {
    title: "Preguntas frecuentes",
    description: "Respuestas a dudas comunes",
    icon: HelpCircle,
    color: "bg-pink-500/20 text-pink-500",
  },
  {
    title: "Contactar soporte",
    description: "Obtén ayuda personalizada",
    icon: MessageSquare,
    color: "bg-green-500/20 text-green-500",
  },
]

export default function AyudaPage() {
  const [mounted, setMounted] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (

    <>

     {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Ayuda</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">

          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="text-center py-8">
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                Centro de Ayuda
              </h1>
              <p className="text-muted-foreground mb-6">
                Encuentra respuestas, guías y soporte para usar ProductHub
              </p>
              
              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar en la ayuda..."
                  className="pl-10 h-12 text-base bg-secondary border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => (
                <Card 
                  key={link.title} 
                  className="bg-card border-border cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className={`size-12 rounded-xl flex items-center justify-center mb-3 ${link.color}`}>
                        <link.icon className="size-6" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{link.title}</h3>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs Content */}
            {mounted && (
              <Tabs defaultValue="faq" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="faq" className="gap-2">
                    <HelpCircle className="size-4" />
                    <span className="hidden sm:inline">FAQ</span>
                  </TabsTrigger>
                  <TabsTrigger value="guides" className="gap-2">
                    <BookOpen className="size-4" />
                    <span className="hidden sm:inline">Guías</span>
                  </TabsTrigger>
                  <TabsTrigger value="support" className="gap-2">
                    <MessageSquare className="size-4" />
                    <span className="hidden sm:inline">Soporte</span>
                  </TabsTrigger>
                  <TabsTrigger value="shortcuts" className="gap-2">
                    <Keyboard className="size-4" />
                    <span className="hidden sm:inline">Atajos</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="faq">
                  <FAQSection />
                </TabsContent>

                <TabsContent value="guides">
                  <GuidesSection />
                </TabsContent>

                <TabsContent value="support">
                  <SupportSection />
                </TabsContent>

                <TabsContent value="shortcuts">
                  <ShortcutsSection />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
    
    
    </>

       

  )
}

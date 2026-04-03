"use client"

import * as React from "react"

import { OrdersStats } from "@/components/orders/orders-stats"
import { OrdersList } from "@/components/orders/orders-list"
import { OrderForm } from "@/components/orders/order-form"
import { RestaurantOrderForm } from "@/components/orders/restaurant-order-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, UtensilsCrossed } from "lucide-react"
import { OrdersHeader } from "@/components/orders/orders-header"
import { RestaurantOrdersList } from "./restaurant-order-list"
import { Venta } from "@/src/schemas"


export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
}

interface Props {
  initialProducts: MenuItem[]
  initialVentas: Venta[]
}

type ViewMode = "list" | "new-standard" | "new-restaurant"
type ListTab = "standard" | "restaurant"

export default function PedidosPage({ initialProducts, initialVentas }: Props) {
  const [viewMode, setViewMode] = React.useState<ViewMode>("list")
    const [listTab, setListTab] = React.useState<ListTab>("standard")

  const getTitle = () => {
    switch (viewMode) {
      case "new-standard": return "Nuevo Pedido - Estándar"
      case "new-restaurant": return "Nuevo Pedido - Restaurante"
      default: return "Pedidos"
    }
  }

  

  const getDescription = () => {
    switch (viewMode) {
      case "new-standard": return "Pedido completo con datos de cliente y envío"
      case "new-restaurant": return "Pedido rápido para comida y bebidas"
      default: return "Gestiona y da seguimiento a todos los pedidos de tu negocio"
    }
  }

  return (


 <>
         <OrdersHeader 
          showNewOrderForm={viewMode !== "list"} 
          onToggleForm={() => setViewMode(viewMode === "list" ? "new-standard" : "list")} 
        />
<main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {getTitle()}
              </h1>
              <p className="text-muted-foreground">
                {getDescription()}
              </p>
            </div>
            
            {viewMode === "list" ? (
               <>
          <OrdersStats ventas={initialVentas} />
          <RestaurantOrdersList ventas={initialVentas} products={initialProducts} />
        </>
            ) : (
              <>
                {/* Selector de tipo de pedido */}
                <Tabs 
                  value={viewMode} 
                  onValueChange={(v) => setViewMode(v as ViewMode)}
                  className="w-full"
                >
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="new-standard" className="gap-2">
                      <Package className="size-4" />
                      Pedido Estándar
                    </TabsTrigger>
                    <TabsTrigger value="new-restaurant" className="gap-2">
                      <UtensilsCrossed className="size-4" />
                      Restaurante
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="new-standard" className="mt-6">
                    <OrderForm />
                  </TabsContent>

                  <TabsContent value="new-restaurant" className="mt-6">
                    <RestaurantOrderForm products={initialProducts} />
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </main>

        

  
 </>
       
  )
}

import { CategoryChart } from "@/components/dashboard/category-chart";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { InventoryAlerts } from "@/components/dashboard/inventory-alerts";
import { OrdersChart } from "@/components/dashboard/orders-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { TopProducts } from "@/components/dashboard/top-products";





export default async function ProductManagementPage() {

  return (

<>


        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Bienvenido de vuelta. Aquí tienes un resumen de tu negocio.
              </p>
            </div>

            {/* Stats Cards */}
            <DashboardStats />

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <SalesChart />
              </div>
              <CategoryChart />
            </div>

            {/* Orders and Activity Row */}
            <div className="grid gap-6 lg:grid-cols-2">
              <OrdersChart />
              <RecentActivity />
            </div>

            {/* Products and Orders Row */}
            <div className="grid gap-6 lg:grid-cols-2">
              <TopProducts />
              <RecentOrders />
            </div>

            {/* Inventory Alerts */}
            <InventoryAlerts />
          </div>
        </main>
</>
      
    
  )
}

import { 
  ShoppingCart, 
  Clock, 
  Truck, 
  CheckCircle2,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Pedidos Totales",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
    description: "vs. mes anterior",
  },
  {
    title: "Pendientes",
    value: "23",
    change: "-8.2%",
    trend: "down",
    icon: Clock,
    description: "esperando proceso",
  },
  {
    title: "En Tránsito",
    value: "45",
    change: "+15.3%",
    trend: "up",
    icon: Truck,
    description: "enviados hoy",
  },
  {
    title: "Completados",
    value: "1,216",
    change: "+18.7%",
    trend: "up",
    icon: CheckCircle2,
    description: "este mes",
  },
]

type Venta = {
  id: number
  tableNumber: string
  customerCount: number
  waiter: string
  notes: string | null
  paymentMethod: string
  items: {
    id: number
    product: number
    quantity: number
    subtotal: number
    notes: string | null
  }[]
  subtotal: number
  tip: number
  total: number
}

export function OrdersStats({ ventas }: { ventas: Venta[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs">
              {stat.trend === "up" ? (
                <TrendingUp className="size-3 text-primary" />
              ) : (
                <TrendingDown className="size-3 text-primary" />
              )}
              <span className="text-primary">{stat.change}</span>
              <span className="text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

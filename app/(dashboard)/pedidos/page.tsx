import PedidosPage from "@/components/orders/page"
import getToken from "@/src/auth/token"
import { ProductResponseSchema, VentaResponseSchema } from "@/src/schemas"
import type { Venta } from "@/src/schemas"

async function getProductos() {
  const token = await getToken()
  const res = await fetch(`${process.env.API_URL}/producto/leer-productos`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  const json = await res.json()
  if (json.statusCode === 400) return []
  const data = ProductResponseSchema.parse(json)
  return data.objectResponse.map((p) => ({
    id: String(p.id),
    name: p.name,
    price: p.salePrice ?? 0,
    category: p.category ? String(p.category) : "",
  }))
}

async function getVentas(): Promise<Venta[]> {
  const token = await getToken()
  const res = await fetch(`${process.env.API_URL}/venta/leer-ventas`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  const json = await res.json()
  if (json.statusCode === 400) return []
  return VentaResponseSchema.parse(json).objectResponse
}

export default async function Page() {
  const [products, ventas] = await Promise.all([
    getProductos(),
    getVentas(),
  ])
  return <PedidosPage initialProducts={products} initialVentas={ventas} />
}
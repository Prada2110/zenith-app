import RestaurantOrderDetailPage from "@/components/orders/reaturtant-order-detail"
import getToken from "@/src/auth/token"
import { VentaResponseSchema } from "@/src/schemas"

async function getVenta(id: string) {
  const token = await getToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/venta/leer-venta/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  const json = await res.json()
  console.log("venta detalle:", JSON.stringify(json, null, 2))
  console.log("ID:", id)
  return json.objectResponse
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const venta = await getVenta(id)

   console.log("VENTA FINAL:", venta)

  return <RestaurantOrderDetailPage venta={venta} 
  />

}
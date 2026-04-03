// actions/create-venta-action.ts
"use server"

import getToken from "@/src/auth/token"
import { revalidatePath } from "next/cache"

type ActionState = {
  errors: string[]
  success: string
}

export async function createVenta(prevState: ActionState, formData: FormData) {
  const token = await getToken()

  const itemsRaw = formData.get("items") as string
  const items = JSON.parse(itemsRaw)

  const body = {
    tableNumber: formData.get("tableNumber"),
    customerCount: parseInt(formData.get("customerCount") as string) || 1,
    waiter: formData.get("waiter") ?? "",
    notes: formData.get("notes") ?? "",
    paymentMethod: formData.get("paymentMethod") ?? "EFECTIVO",
    items: items.map((item: { id: string; quantity: number; notes: string }) => ({
      product: parseInt(item.id),
      quantity: item.quantity,
      notes: item.notes ?? "",
    })),
  }

  console.log("crear venta body:", JSON.stringify(body, null, 2))

  const res = await fetch(`${process.env.API_URL}/venta/crear-venta`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const text = await res.text()
  const json = text ? JSON.parse(text) : null
  console.log("crear venta response:", json)

  if (!res.ok || json?.statusCode !== 200) {
    return { errors: [json?.message ?? "Error al crear venta"], success: "" }
  }

  revalidatePath("/pedidos")
  return { errors: [], success: "Venta creada exitosamente" }
}
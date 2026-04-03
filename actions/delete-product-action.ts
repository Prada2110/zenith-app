// actions/delete-product-action.ts
"use server"

import getToken from "@/src/auth/token"
import { revalidatePath } from "next/cache"

export async function deleteProducto(id: string) {
  const token = await getToken()

  const res = await fetch(`${process.env.API_URL}/producto/eliminar-producto/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const text = await res.text()
  console.log("delete status:", res.status)
  console.log("delete response:", text)

  if (!res.ok) {
    throw new Error(`Error al eliminar producto: ${res.status}`)
  }

  revalidatePath("/productos")
  return true
}
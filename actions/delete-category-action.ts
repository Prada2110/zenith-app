// actions/delete-category-action.ts
"use server"

import getToken from "@/src/auth/token"
import { revalidatePath } from "next/cache"

export async function deleteCategoria(id: string) {
  const token = await getToken()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria/eliminar-categoria/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) throw new Error(`Error al eliminar categoría: ${res.status}`)

  revalidatePath("/categorias")
  return true
}
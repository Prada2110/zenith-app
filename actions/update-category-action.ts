// actions/update-category-action.ts
"use server"

import getToken from "@/src/auth/token"
import { revalidatePath } from "next/cache"

type ActionState = {
  errors: string[]
  success: string
}

export async function updateCategoria(prevState: ActionState, formData: FormData) {
  const token = await getToken()
  const id = formData.get("id") as string

  const body = {
    id,
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description") ?? "",
    image: formData.get("image") ?? "",
    isActive: formData.get("isActive") === "true",
  }

  console.log("actualizar categoria body:", body)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria/actualizar-categoria`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const text = await res.text()
  console.log("actualizar categoria status:", res.status)
  console.log("actualizar categoria response:", text)

  if (!res.ok) {
    const json = text ? JSON.parse(text) : null
    return { errors: [json?.message ?? "Error al actualizar categoría"], success: "" }
  }

  revalidatePath("/categorias")
  return { errors: [], success: "Categoría actualizada exitosamente" }
}
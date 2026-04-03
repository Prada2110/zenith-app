// actions/create-category-action.ts
"use server"

import getToken from "@/src/auth/token"
import { revalidatePath } from "next/cache"

type ActionState = {
  errors: string[]
  success: string
}

export async function createCategoria(prevState: ActionState, formData: FormData) {
  const token = await getToken()

  const body = {
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description") ?? "",
    image: formData.get("image") ?? "",
    isActive: formData.get("isActive") === "true",
  }

  console.log("crear categoria body:", body)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria/crear-categoria`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const text = await res.text()
  const json = text ? JSON.parse(text) : null
  console.log("crear categoria response:", json)

  if (!res.ok || json?.statusCode !== 200) {
    return { errors: [json?.message ?? "Error al crear categoría"], success: "" }
  }

  revalidatePath("/categorias")
  return { errors: [], success: "Categoría creada exitosamente" }
}
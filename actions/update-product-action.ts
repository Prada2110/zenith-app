"use server"

import getToken from "@/src/auth/token"
import { revalidatePath } from "next/cache"

type ActionState = {
  errors: string[]
  success: string
}

export async function updateProducto(prevState: ActionState, formData: FormData) {
  const token = await getToken()
  const id = formData.get("id") as string


  const body = {
    id,
    name: formData.get("name"),
    description: formData.get("description") ?? "",
    sku: formData.get("sku"),
    barcode: formData.get("barcode") ?? "",
category: parseInt(formData.get("category") as string) || 0,
    supplier: formData.get("supplier") ?? "",
 // ...
  costPrice: parseFloat((formData.get("costPrice") as string).replace(/\./g, "")) || 0,
  salePrice: parseFloat((formData.get("salePrice") as string).replace(/\./g, "")) || 0,
  // ...
    stock: parseInt(formData.get("stock") as string) || 0,
    minStock: parseInt(formData.get("minStock") as string) || 0,
    maxStock: parseInt(formData.get("maxStock") as string) || 0,
    location: formData.get("location") ?? "",
    weight: parseFloat(formData.get("weight") as string) || 0,
    dimensions: formData.get("dimensions") ?? "",
    isActive: formData.get("isActive") === "true",
    isFeatured: formData.get("isFeatured") === "true",
  }

// id ya es "1", "2", etc. — correcto para la URL

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/producto/actualizar-producto`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  console.log("token existe:", !!token)
console.log("token valor:", token?.substring(0, 30))
  console.log("status actualizar:", res.status)
  console.log("id enviado:", id)
console.log("body enviado:", JSON.stringify(body))

  // maneja respuesta vacía (204 No Content)
  const text = await res.text()
  console.log("respuesta raw:", text)

  if (!res.ok) {
    const message = text ? JSON.parse(text).message : "Error al actualizar producto"
    return { errors: [message], success: "" }
  }

  const json = text ? JSON.parse(text) : null
  console.log("actualizar producto:", json)

  if (json && json.statusCode !== 200) {
    return { errors: [json.message ?? "Error al actualizar producto"], success: "" }
  }

  revalidatePath("/productos")
  return { errors: [], success: "Producto actualizado exitosamente" }
}
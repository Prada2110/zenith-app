"use server"

import getToken from "@/src/auth/token"
import { revalidatePath } from "next/cache"

type ActionState = {
  errors: string[]
  success: string
}

export async function createProducto(prevState: ActionState, formData: FormData) {
  const token = await getToken()

  const body = {
  name: formData.get("name"),
  description: formData.get("description") ?? "",
  sku: formData.get("sku"),
  barcode: formData.get("barcode") ?? "",
  category: parseInt(formData.get("category") as string) || 0,  // ← número
  supplier: formData.get("supplier") ?? "",
  costPrice: parseFloat((formData.get("costPrice") as string).replace(/\./g, "")) || 0,
  salePrice: parseFloat((formData.get("salePrice") as string).replace(/\./g, "")) || 0,
  stock: parseInt(formData.get("stock") as string) || 0,
  minStock: parseInt(formData.get("minStock") as string) || 0,
  maxStock: parseInt(formData.get("maxStock") as string) || 0,
  location: formData.get("location") ?? "",
  weight: parseFloat(formData.get("weight") as string) || 0,
  dimensions: formData.get("dimensions") ?? "",
  isActive: formData.get("isActive") === "true",
  isFeatured: formData.get("isFeatured") === "true",
}

  const res = await fetch(`${process.env.API_URL}/producto/crear-producto`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const json = await res.json()
//   console.log("crear producto:", json)

  if (!res.ok || json.statusCode !== 200) {
    return { errors: [json.message ?? "Error al crear producto"], success: "" }
  }

  revalidatePath("/productos")
  return { errors: [], success: "Producto creado exitosamente" }
}
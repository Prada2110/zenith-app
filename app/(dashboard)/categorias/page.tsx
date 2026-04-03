// app/(dashboard)/categorias/page.tsx
import CategoriasPage from "@/components/categories/form-category"
import getToken from "@/src/auth/token"
import { CategoryResponseSchema } from "@/src/schemas"


async function getCategorias() {
  const token = await getToken()
  const res = await fetch(`${process.env.API_URL}/categoria/leer-categorias`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })

  const json = await res.json()
  console.log("categorias response:", JSON.stringify(json, null, 2))

  if (json.statusCode === 400) return { objectResponse: [] }
  if (!res.ok) throw new Error(`Error al obtener categorías: ${res.status}`)

  return CategoryResponseSchema.parse(json)
}

export default async function Page() {
  const data = await getCategorias()

const categories = (data.objectResponse ?? []).map((c) => ({
  id: String(c.id),        // ← era id_categoria, ahora es id
  name: c.name,
  slug: c.slug,
  description: c.description ?? "",
  image: c.image ?? "",
  isActive: c.active,      // ← era is_active, ahora es active
  createdAt: "",
  updatedAt: "",
}))

  return <CategoriasPage initialCategories={categories} />
}
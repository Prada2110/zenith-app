// app/.../ProductCRUD.tsx
import getToken from "@/src/auth/token"
import { CategoryResponseSchema, ProductResponseSchema } from "@/src/schemas"

import type { Product } from "@/components/products/product-form"
import ProductosPage from "@/components/products/resumen/FormPruebaProduct"

async function getUserProducto() {
  const token = await getToken()
  const url = `${process.env.API_URL}/producto/leer-productos`

  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store", // o next: { revalidate: 60 } si quieres caché
  })

    const json = await req.json()


    if (json.statusCode === 400 && json.objectResponse === 'Producto no existe') {
    return { objectResponse: [] }
  }

  if (!req.ok) throw new Error(`Error al obtener productos: ${req.status}`)


  return ProductResponseSchema.parse(json)
}

async function getCategorias() {
  const token = await getToken()
  const res = await fetch(`${process.env.API_URL}/categoria/leer-categorias`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  const json = await res.json()
  if (json.statusCode === 400) return []

  const data = CategoryResponseSchema.parse(json)
  return data.objectResponse.map((c) => ({
    id: String(c.id),
    name: c.name,
    slug: c.slug,
    description: c.description ?? "",
    image: c.image ?? "",
    isActive: c.active,
  }))
}

export default async function ProductCRUD() {
  const [productData, categories] = await Promise.all([
    getUserProducto(),
    getCategorias(),
  ])
  const products: Product[] = (productData.objectResponse ?? []).map((p) => ({
  id: String(p.id), // ← guarda el id numérico como string "1", "2", etc.
  name: p.name,
  description: p.description ?? "",
  sku: p.sku,
  barcode: p.barcode ?? "",
  category: p.category ? String(p.category) : "",
  supplier: p.supplier ?? "",
  costPrice: p.costPrice ?? 0,
  salePrice: p.salePrice ?? 0,
  stock: p.stock ?? 0,
  minStock: p.minStock ?? 0,
  maxStock: p.maxStock ?? 0,
  location: p.location ?? "",
  weight: p.weight ?? 0,
  dimensions: p.dimensions ?? "",
  isActive: p.isActive,
  isFeatured: p.isFeatured,
  images: [],
}))

  return <ProductosPage initialProducts={products} initialCategories={categories} />
}
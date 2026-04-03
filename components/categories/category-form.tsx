"use client"

import * as React from "react"
import { useEffect } from "react"
import { useActionState } from "react"
import {
  FolderOpen,
  X,
  Save,
  Loader2,
  FileText,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Category } from "@/src/types/category"
import { createCategoria } from "@/actions/create-category-action"
import { updateCategoria } from "@/actions/update-category-action"

interface CategoryFormProps {
  category?: Category | null
  categories?: Category[]
  onSave: (category: Partial<Category>) => void
  onCancel: () => void
}

export function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const isEditing = !!category

  const [createState, createDispatch, isCreating] = useActionState(createCategoria, {
    errors: [],
    success: ""
  })

  const [updateState, updateDispatch, isUpdating] = useActionState(updateCategoria, {
    errors: [],
    success: ""
  })

  const isPending = isCreating || isUpdating
  const state = isEditing ? updateState : createState
  const dispatch = isEditing ? updateDispatch : createDispatch

  const [formData, setFormData] = React.useState<Partial<Category>>({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    image: category?.image || "",
    isActive: category?.isActive ?? true,
  })

  useEffect(() => {
    if (state.success) {
      onCancel()
    }
  }, [state])

  const handleNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      slug: !isEditing
        ? value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
        : prev.slug,
    }))
  }

  const updateField = (field: keyof Category, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form action={dispatch} className="space-y-6">
      {state.errors.map(error => (
        <p key={error} className="text-sm text-destructive">{error}</p>
      ))}

      
      {isEditing && (
  <>
    {console.log("category.id en form:", category.id)}
    <input type="hidden" name="id" value={category.id} />
  </>
)}
      
      <input type="hidden" name="isActive" value={String(formData.isActive)} />
      <input type="hidden" name="slug" value={formData.slug ?? ""} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <FolderOpen className="size-5" />
              Información de la Categoría
            </CardTitle>
            <CardDescription>Datos principales de la categoría</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej: Electrónica"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug-display">Slug *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">/</span>
                <Input
                  id="slug-display"
                  placeholder="electronica"
                  className="pl-6"
                  value={formData.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Se genera automáticamente desde el nombre
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                <FileText className="inline size-4 mr-1" />
                Descripción
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descripción de la categoría..."
                rows={4}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="image">URL de imagen</Label>
              <Input
                id="image"
                name="image"
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => updateField("image", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Tag className="size-5" />
                Estado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Categoría activa</Label>
                  <p className="text-xs text-muted-foreground">
                    Visible en el catálogo
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => updateField("isActive", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm text-foreground">Vista previa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-secondary/50 p-3 space-y-2">
                <p className="text-sm font-medium text-foreground">
                  {formData.name || "Nombre de categoría"}
                </p>
                <p className="text-xs text-muted-foreground">
                  /{formData.slug || "slug-categoria"}
                </p>
                <Badge variant={formData.isActive ? "default" : "secondary"} className="text-xs">
                  {formData.isActive ? "Activa" : "Inactiva"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="size-4 mr-1" />
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 mr-1 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="size-4 mr-1" />
              {isEditing ? "Actualizar Categoría" : "Crear Categoría"}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
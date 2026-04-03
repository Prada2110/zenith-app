"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  FolderOpen,
} from "lucide-react"
import { CategoriesHeader } from "@/components/categories/categories-header"
import { DeleteCategoryDialog } from "@/components/categories/delete-category-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CategoriesStats } from "./categories-stats"

import { deleteCategoria } from "@/actions/delete-category-action"
import { Category } from "@/src/types/category"
import { CategoryForm } from '@/components/categories/category-form';



type ViewMode = "list" | "create" | "edit"

interface Props {
  initialCategories: Category[]
}

export default function CategoriasPage({ initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredCategories = searchQuery
    ? categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories

  const handleNewCategory = () => {
    setCurrentCategory(null)
    setViewMode("create")
  }

  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category)
    setViewMode("edit")
    console.log("editando categoria:", category)
  }

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (categoryToDelete) {
      setIsDeleting(true)
      try {
        await deleteCategoria(categoryToDelete.id)
        setCategories(prev => prev.filter(c => c.id !== categoryToDelete.id))
        setCategoryToDelete(null)
        setDeleteDialogOpen(false)
      } catch (error) {
        console.error("Error al eliminar categoría:", error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleSaveCategory = (categoryData: Partial<Category>) => {
    if (viewMode === "edit" && currentCategory) {
      setCategories(prev => prev.map(c =>
        c.id === currentCategory.id ? { ...c, ...categoryData } as Category : c
      ))
    } else {
      setCategories(prev => [...prev, categoryData as Category])
    }
    setViewMode("list")
    setCurrentCategory(null)
  }

  const handleCancel = () => {
    setViewMode("list")
    setCurrentCategory(null)
  }

  const totalCategories = categories.length
  const activeCategories = categories.filter(c => c.isActive).length

  const renderCategoryRow = (category: Category) => (
    <TableRow key={category.id} className="border-border">
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg flex items-center justify-center bg-primary">
            <FolderOpen className="size-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-foreground">{category.name}</p>
            <p className="text-xs text-muted-foreground">/{category.slug}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {category.description || "-"}
      </TableCell>
      <TableCell>
        <Badge variant={category.isActive ? "default" : "secondary"}>
          {category.isActive ? "Activa" : "Inactiva"}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">
        {category.updatedAt
          ? new Date(category.updatedAt).toLocaleDateString("es-ES")
          : "-"}
      </TableCell>
      <TableCell>
        {mounted ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                <Pencil className="mr-2 size-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => handleDeleteCategory(category)}
              >
                <Trash2 className="mr-2 size-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontal className="size-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  )

  return (
    <>
      <CategoriesHeader
        viewMode={viewMode}
        onNewCategory={handleNewCategory}
        onBack={handleCancel}
        onSearch={setSearchQuery}
      />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {viewMode === "list"
                ? "Categorías"
                : viewMode === "create"
                ? "Nueva Categoría"
                : "Editar Categoría"}
            </h1>
            <p className="text-muted-foreground">
              {viewMode === "list"
                ? "Organiza tu catálogo de productos por categorías"
                : viewMode === "create"
                ? "Completa la información para crear una nueva categoría"
                : "Modifica la información de la categoría"}
            </p>
          </div>

          {viewMode === "list" ? (
            <>
              <CategoriesStats
                totalCategories={totalCategories}
                activeCategories={activeCategories}
              />

              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FolderOpen className="size-5 text-primary" />
                    <div>
                      <CardTitle className="text-foreground">Categorías</CardTitle>
                      <CardDescription>
                        {searchQuery
                          ? `${filteredCategories.length} resultados para "${searchQuery}"`
                          : `${categories.length} categorías en total`}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Categoría</TableHead>
                        <TableHead className="text-muted-foreground">Descripción</TableHead>
                        <TableHead className="text-muted-foreground">Estado</TableHead>
                        <TableHead className="text-muted-foreground">Actualización</TableHead>
                        <TableHead className="text-muted-foreground w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCategories.map(cat => renderCategoryRow(cat))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          ) : (
            <CategoryForm
              category={currentCategory}
              categories={categories}
              onSave={handleSaveCategory}
              onCancel={handleCancel}
            />
          )}
        </div>
      </main>

      <DeleteCategoryDialog
        category={categoryToDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </>
  )
}
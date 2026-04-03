"use client"

import * as React from "react"
import { AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Product } from "./product-form"

interface DeleteProductDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteProductDialog({ 
  product, 
  open, 
  onOpenChange,
  onConfirm 
}: DeleteProductDialogProps) {
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    onConfirm()
    setIsDeleting(false)
    onOpenChange(false)
  }

  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="size-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Eliminar Producto</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Estás a punto de eliminar el producto:
          </p>
          <div className="mt-3 rounded-lg bg-secondary p-3">
            <p className="font-medium text-foreground">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              {product.id} | SKU: {product.sku}
            </p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Se eliminarán todos los datos asociados, incluyendo historial de ventas 
            y movimientos de inventario.
          </p>
        </div>

        <DialogFooter>
          <Button className="cursor-pointer" variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button className="cursor-pointer" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="size-4 mr-1 animate-spin" />
                Eliminando...
              </>
            ) : (
              "Eliminar Producto"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

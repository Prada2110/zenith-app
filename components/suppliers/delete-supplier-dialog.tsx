"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { type Supplier } from "./supplier-form"

interface DeleteSupplierDialogProps {
  supplier: Supplier | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteSupplierDialog({
  supplier,
  open,
  onOpenChange,
  onConfirm,
}: DeleteSupplierDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar Proveedor</AlertDialogTitle>
          <AlertDialogDescription>
            {supplier && (
              <>
                ¿Estás seguro de que deseas eliminar al proveedor{" "}
                <span className="font-semibold text-foreground">{supplier.companyName}</span>?
                <br /><br />
                {supplier.totalOrders > 0 && (
                  <span className="text-destructive">
                    Este proveedor tiene {supplier.totalOrders} órdenes asociadas. 
                    El historial de órdenes se mantendrá pero no podrás crear nuevas órdenes con este proveedor.
                  </span>
                )}
                {supplier.totalOrders === 0 && (
                  <span>Esta acción no se puede deshacer.</span>
                )}
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

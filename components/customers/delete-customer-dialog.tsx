"use client"

import { AlertTriangle } from "lucide-react"
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
import type { Customer } from "./customer-form"

interface DeleteCustomerDialogProps {
  customer: Customer | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteCustomerDialog({
  customer,
  open,
  onOpenChange,
  onConfirm,
}: DeleteCustomerDialogProps) {
  if (!customer) return null

  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" />
            Eliminar Cliente
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Estas a punto de eliminar al cliente <strong>{customer.firstName} {customer.lastName}</strong>.
            </p>
            {customer.totalOrders > 0 && (
              <p className="text-yellow-600 dark:text-yellow-500">
                Este cliente tiene {customer.totalOrders} pedidos asociados. Los pedidos se mantendran pero perderan la referencia al cliente.
              </p>
            )}
            <p>Esta accion no se puede deshacer.</p>
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

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Kbd } from "@/components/ui/kbd"

const shortcutCategories = [
  {
    category: "Navegación",
    shortcuts: [
      { keys: ["G", "D"], description: "Ir al Dashboard" },
      { keys: ["G", "P"], description: "Ir a Productos" },
      { keys: ["G", "O"], description: "Ir a Pedidos" },
      { keys: ["G", "I"], description: "Ir a Inventario" },
      { keys: ["G", "C"], description: "Ir a Clientes" },
    ]
  },
  {
    category: "Acciones rápidas",
    shortcuts: [
      { keys: ["Ctrl", "K"], description: "Abrir búsqueda global" },
      { keys: ["Ctrl", "N"], description: "Crear nuevo elemento" },
      { keys: ["Ctrl", "S"], description: "Guardar cambios" },
      { keys: ["Esc"], description: "Cerrar modal/panel" },
    ]
  },
  {
    category: "Tablas y listas",
    shortcuts: [
      { keys: ["↑", "↓"], description: "Navegar entre filas" },
      { keys: ["Enter"], description: "Abrir elemento seleccionado" },
      { keys: ["Ctrl", "A"], description: "Seleccionar todo" },
      { keys: ["Delete"], description: "Eliminar seleccionado" },
    ]
  },
  {
    category: "Edición",
    shortcuts: [
      { keys: ["Ctrl", "Z"], description: "Deshacer" },
      { keys: ["Ctrl", "Shift", "Z"], description: "Rehacer" },
      { keys: ["Ctrl", "C"], description: "Copiar" },
      { keys: ["Ctrl", "V"], description: "Pegar" },
    ]
  },
]

export function ShortcutsSection() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Atajos de Teclado</CardTitle>
        <CardDescription className="text-muted-foreground">
          Mejora tu productividad con estos atajos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {shortcutCategories.map((category) => (
            <div key={category.category} className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-secondary/30"
                  >
                    <span className="text-sm text-muted-foreground">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span key={keyIndex} className="flex items-center gap-1">
                          <Kbd>{key}</Kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-muted-foreground text-xs">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

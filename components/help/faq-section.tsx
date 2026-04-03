"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const faqCategories = [
  {
    category: "Productos",
    questions: [
      {
        question: "¿Cómo puedo agregar un nuevo producto?",
        answer: "Para agregar un nuevo producto, ve a la sección de Productos en el menú lateral y haz clic en el botón 'Nuevo Producto'. Completa la información requerida como nombre, precio, categoría y stock inicial, luego guarda los cambios."
      },
      {
        question: "¿Cómo edito la información de un producto existente?",
        answer: "En la lista de productos, haz clic en el menú de acciones (tres puntos) del producto que deseas editar y selecciona 'Editar'. Realiza los cambios necesarios y guarda."
      },
      {
        question: "¿Puedo importar productos de forma masiva?",
        answer: "Sí, puedes importar productos usando un archivo CSV o Excel. Ve a Productos, haz clic en 'Importar' y sigue las instrucciones. Descarga primero la plantilla para asegurarte de usar el formato correcto."
      },
    ]
  },
  {
    category: "Inventario",
    questions: [
      {
        question: "¿Cómo realizo un ajuste de inventario?",
        answer: "Ve a la sección de Inventario, selecciona el producto y haz clic en 'Ajustar Stock'. Puedes registrar entradas, salidas, ajustes manuales o transferencias entre ubicaciones."
      },
      {
        question: "¿Cómo configuro alertas de stock bajo?",
        answer: "En la configuración de cada producto, establece el 'Stock Mínimo'. Cuando el inventario llegue a ese nivel, recibirás una notificación automática."
      },
      {
        question: "¿Puedo ver el historial de movimientos?",
        answer: "Sí, en la sección de Inventario, ve a la pestaña 'Historial' para ver todos los movimientos de stock con detalles de fecha, cantidad, tipo y usuario que realizó el cambio."
      },
    ]
  },
  {
    category: "Pedidos",
    questions: [
      {
        question: "¿Cómo creo un nuevo pedido?",
        answer: "Ve a Pedidos y haz clic en 'Nuevo Pedido'. Selecciona el tipo de pedido (estándar o restaurante), agrega los productos, completa los datos del cliente y confirma el pedido."
      },
      {
        question: "¿Cómo cambio el estado de un pedido?",
        answer: "En la lista de pedidos, haz clic en el menú de acciones del pedido y selecciona 'Actualizar Estado'. Puedes cambiar entre Pendiente, Procesando, Enviado, Completado o Cancelado."
      },
      {
        question: "¿Puedo generar facturas automáticamente?",
        answer: "Sí, el sistema genera facturas automáticamente cuando se completa un pedido. Puedes configurar los datos de facturación en Configuración > Pagos."
      },
    ]
  },
  {
    category: "Reportes",
    questions: [
      {
        question: "¿Qué tipos de reportes puedo generar?",
        answer: "Puedes generar reportes de ventas, inventario, productos, clientes y proveedores. Cada reporte puede personalizarse con rangos de fechas y filtros específicos."
      },
      {
        question: "¿Puedo programar reportes automáticos?",
        answer: "Sí, en la sección de Reportes puedes configurar reportes programados que se generarán y enviarán por email de forma automática (diario, semanal o mensual)."
      },
      {
        question: "¿En qué formatos puedo exportar los reportes?",
        answer: "Los reportes pueden exportarse en PDF, Excel (.xlsx) o CSV. Selecciona el formato deseado al generar o descargar el reporte."
      },
    ]
  },
]

export function FAQSection() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Preguntas Frecuentes</CardTitle>
        <CardDescription className="text-muted-foreground">
          Encuentra respuestas a las preguntas más comunes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {faqCategories.map((category) => (
          <div key={category.category} className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">{category.category}</h3>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, index) => (
                <AccordionItem key={index} value={`${category.category}-${index}`}>
                  <AccordionTrigger className="text-sm text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

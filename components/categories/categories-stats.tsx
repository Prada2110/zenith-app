"use client"

import { FolderOpen, FolderTree } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoriesStatsProps {
  totalCategories: number
  activeCategories: number
}

export function CategoriesStats({ 
  totalCategories, 
  activeCategories, 
}: CategoriesStatsProps) {
  const inactiveCategories = totalCategories - activeCategories

  const stats = [
    {
      title: "Total Categorías",
      value: totalCategories,
      icon: FolderOpen,
      description: "Categorías registradas",
    },
    {
      title: "Categorías Activas",
      value: activeCategories,
      icon: FolderTree,
      description: "Visibles en catálogo",
      change: totalCategories > 0 
        ? `${Math.round((activeCategories / totalCategories) * 100)}%` 
        : "0%",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
              {stat.change && (
                <span className="text-primary ml-1">({stat.change})</span>
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
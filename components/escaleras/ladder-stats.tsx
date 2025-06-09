"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target, RotateCcw, Trophy } from "lucide-react"

export function LadderStats() {
  // Estos datos vendrían de tu base de datos
  const stats = [
    {
      title: "Escaleras Completadas",
      value: "3",
      description: "En los últimos 30 días",
      icon: Trophy,
      color: "text-green-500",
    },
    {
      title: "Nivel Actual",
      value: "2/3",
      description: "Escalera en progreso",
      icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      title: "Tasa de Éxito",
      value: "75%",
      description: "Escaleras completadas",
      icon: Target,
      color: "text-purple-500",
    },
    {
      title: "Reinicios",
      value: "1",
      description: "Este mes",
      icon: RotateCcw,
      color: "text-amber-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`rounded-full p-1 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

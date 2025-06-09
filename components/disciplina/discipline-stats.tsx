"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react"

export function DisciplineStats() {
  // Estos datos vendrían de tu base de datos
  const stats = [
    {
      title: "Días Consecutivos",
      value: "5",
      description: "Días respetando límites",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Límites Excedidos",
      value: "2",
      description: "En los últimos 30 días",
      icon: AlertTriangle,
      color: "text-amber-500",
    },
    {
      title: "Próximo Descanso",
      value: "2 días",
      description: "Programado para el 10/06",
      icon: Clock,
      color: "text-blue-500",
    },
    {
      title: "Alertas Activas",
      value: "0",
      description: "Sin alertas actualmente",
      icon: XCircle,
      color: "text-gray-500",
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

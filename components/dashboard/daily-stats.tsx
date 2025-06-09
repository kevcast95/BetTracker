"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react"

export function DailyStats() {
  // Estos datos vendrían de tu base de datos
  const stats = [
    {
      title: "Apuestas Hoy",
      value: "5",
      description: "3 ganadas, 1 perdida, 1 pendiente",
      trend: "neutral",
    },
    {
      title: "Saldo Neto",
      value: "+€45.50",
      description: "12% más que ayer",
      trend: "up",
    },
    {
      title: "Meta Diaria",
      value: "75%",
      description: "€45.50 de €60.00",
      trend: "up",
    },
    {
      title: "Límite Restante",
      value: "€54.50",
      description: "45% de tu límite diario",
      trend: "down",
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
              <div
                className={`rounded-full p-1 ${
                  stat.trend === "up"
                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                    : stat.trend === "down"
                      ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : stat.trend === "down" ? (
                  <ArrowDownIcon className="h-4 w-4" />
                ) : (
                  <MinusIcon className="h-4 w-4" />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

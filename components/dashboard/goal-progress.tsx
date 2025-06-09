"use client"

import { Progress } from "@/components/ui/progress"

export function GoalProgress() {
  // Estos datos vendrían de tu base de datos
  const goalAmount = 60
  const currentAmount = 45.5
  const percentage = Math.round((currentAmount / goalAmount) * 100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Progreso</span>
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Meta diaria</span>
          <span className="font-medium">€{goalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Ganancia actual</span>
          <span className="font-medium">€{currentAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Restante</span>
          <span className="font-medium">€{(goalAmount - currentAmount).toFixed(2)}</span>
        </div>
      </div>

      <div className="pt-4 text-center">
        <p className="text-sm text-muted-foreground">
          {percentage >= 100
            ? "¡Felicidades! Has alcanzado tu meta diaria."
            : `Necesitas €${(goalAmount - currentAmount).toFixed(2)} más para alcanzar tu meta.`}
        </p>
      </div>
    </div>
  )
}

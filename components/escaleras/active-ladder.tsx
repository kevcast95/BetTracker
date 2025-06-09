"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle, XCircle, Clock, RotateCcw } from "lucide-react"

type LadderLevel = {
  level: number
  bet: number
  odds: number
  result: "pending" | "won" | "lost"
  accumulatedBalance: number
  event?: string
}

export function ActiveLadder() {
  // Estado inicial de la escalera
  const [ladder, setLadder] = useState<LadderLevel[]>([
    { level: 1, bet: 20, odds: 1.5, result: "won", accumulatedBalance: 30, event: "Barcelona vs Real Madrid" },
    { level: 2, bet: 30, odds: 1.6, result: "won", accumulatedBalance: 48, event: "Liverpool vs Manchester City" },
    { level: 3, bet: 48, odds: 1.7, result: "pending", accumulatedBalance: 0, event: "PSG vs Marseille" },
  ])

  const [isActive, setIsActive] = useState(true)
  const [restartAmount, setRestartAmount] = useState("20")

  const currentLevel = ladder.findIndex((level) => level.result === "pending") + 1
  const progress = ((currentLevel - 1) / ladder.length) * 100

  const handleResultChange = (level: number, result: "won" | "lost") => {
    setLadder((prev) => {
      const newLadder = [...prev]
      const levelIndex = level - 1

      if (result === "won") {
        newLadder[levelIndex].result = "won"
        newLadder[levelIndex].accumulatedBalance = newLadder[levelIndex].bet * newLadder[levelIndex].odds

        // Si hay un siguiente nivel, actualizar su apuesta
        if (levelIndex + 1 < newLadder.length) {
          newLadder[levelIndex + 1].bet = newLadder[levelIndex].accumulatedBalance
        }
      } else {
        newLadder[levelIndex].result = "lost"
        newLadder[levelIndex].accumulatedBalance = 0

        // Marcar niveles siguientes como perdidos también
        for (let i = levelIndex + 1; i < newLadder.length; i++) {
          newLadder[i].result = "lost"
          newLadder[i].accumulatedBalance = 0
        }

        setIsActive(false)
      }

      return newLadder
    })

    toast({
      title: result === "won" ? "¡Nivel ganado!" : "Nivel perdido",
      description:
        result === "won"
          ? `Has completado el nivel ${level} exitosamente.`
          : `La escalera se ha reiniciado. Puedes comenzar una nueva.`,
    })
  }

  const handleRestart = () => {
    const newAmount = Number.parseFloat(restartAmount)
    if (newAmount <= 0) {
      toast({
        title: "Error",
        description: "El monto debe ser mayor que 0.",
        variant: "destructive",
      })
      return
    }

    setLadder([
      { level: 1, bet: newAmount, odds: 1.5, result: "pending", accumulatedBalance: 0 },
      { level: 2, bet: 0, odds: 1.6, result: "pending", accumulatedBalance: 0 },
      { level: 3, bet: 0, odds: 1.7, result: "pending", accumulatedBalance: 0 },
    ])
    setIsActive(true)

    toast({
      title: "Escalera reiniciada",
      description: `Nueva escalera iniciada con €${newAmount}.`,
    })
  }

  const getResultIcon = (result: string) => {
    switch (result) {
      case "won":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "lost":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case "won":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "lost":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const isCompleted = ladder.every((level) => level.result === "won")
  const finalBalance = isCompleted ? ladder[ladder.length - 1].accumulatedBalance : 0

  return (
    <div className="space-y-6">
      {/* Progreso visual */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Progreso de la Escalera</span>
          <span className="text-sm font-medium">{currentLevel > 3 ? 3 : currentLevel}/3</span>
        </div>
        <Progress value={isCompleted ? 100 : progress} className="h-3" />
        {isCompleted && (
          <div className="text-center">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              ¡Escalera Completada! Ganancia: €{finalBalance.toFixed(2)}
            </Badge>
          </div>
        )}
      </div>

      {/* Tabla de niveles */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nivel</TableHead>
              <TableHead>Evento</TableHead>
              <TableHead>Apuesta</TableHead>
              <TableHead>Cuota</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Saldo Acumulado</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ladder.map((level) => (
              <TableRow key={level.level}>
                <TableCell className="font-medium">Nivel {level.level}</TableCell>
                <TableCell>{level.event || "-"}</TableCell>
                <TableCell>€{level.bet.toFixed(2)}</TableCell>
                <TableCell>{level.odds}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getResultIcon(level.result)}
                    <Badge variant="outline" className={getResultColor(level.result)}>
                      {level.result === "won" ? "Ganada" : level.result === "lost" ? "Perdida" : "Pendiente"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{level.accumulatedBalance > 0 ? `€${level.accumulatedBalance.toFixed(2)}` : "-"}</TableCell>
                <TableCell>
                  {level.result === "pending" && isActive && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => handleResultChange(level.level, "won")}
                      >
                        Ganada
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleResultChange(level.level, "lost")}
                      >
                        Perdida
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Botón de reinicio */}
      {!isActive && (
        <div className="border-t pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="restart-amount">Monto para nueva escalera</Label>
              <Input
                id="restart-amount"
                type="number"
                step="0.01"
                min="0"
                value={restartAmount}
                onChange={(e) => setRestartAmount(e.target.value)}
                placeholder="20.00"
              />
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reiniciar Escalera
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Reiniciar escalera?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esto creará una nueva escalera con €{restartAmount} como apuesta inicial. La escalera anterior se
                    archivará en tu historial.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRestart}>Reiniciar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  )
}

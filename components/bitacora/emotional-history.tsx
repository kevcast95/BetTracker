"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"

export function EmotionalHistory() {
  const [date, setDate] = useState<Date>(new Date(2025, 5, 8))

  // Estos datos vendrían de tu base de datos
  const logs = [
    {
      date: "2025-06-08",
      impulso: "no",
      recuperacion: "no",
      limites: "si",
      aprendizaje:
        "Hoy me mantuve disciplinado y seguí mi estrategia. Analicé bien los partidos y tomé decisiones basadas en datos, no en emociones. Estoy satisfecho con mi rendimiento.",
    },
    {
      date: "2025-06-07",
      impulso: "parcial",
      recuperacion: "no",
      limites: "si",
      aprendizaje:
        "Tuve un momento de debilidad y aposté impulsivamente en un partido, pero me di cuenta rápido y no seguí por ese camino. Necesito mejorar mi autocontrol inicial.",
    },
    {
      date: "2025-06-06",
      impulso: "si",
      recuperacion: "si",
      limites: "no",
      aprendizaje:
        "Día muy malo. Perdí control tras una mala racha y aposté sin analizar intentando recuperar. Debo recordar que esto es un maratón, no un sprint.",
    },
    {
      date: "2025-06-05",
      impulso: "no",
      recuperacion: "no",
      limites: "si",
      aprendizaje:
        "Excelente día. Me mantuve fiel a mi estrategia y obtuve buenos resultados. La paciencia y disciplina son clave para el éxito a largo plazo.",
    },
  ]

  const getEmotionalScore = (log: (typeof logs)[0]) => {
    let score = 0
    if (log.impulso === "no") score += 2
    else if (log.impulso === "parcial") score += 1

    if (log.recuperacion === "no") score += 2
    else if (log.recuperacion === "parcial") score += 1

    if (log.limites === "si") score += 2
    else if (log.limites === "parcial") score += 1

    return score
  }

  const getScoreColor = (score: number) => {
    if (score >= 5) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (score >= 3) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 5) return "Excelente"
    if (score >= 3) return "Regular"
    return "Necesita mejora"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Registros Recientes</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP", { locale: es })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
              locale={es}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4">
        {logs.map((log) => {
          const score = getEmotionalScore(log)
          return (
            <Card key={log.date}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">
                    {format(new Date(log.date), "EEEE, d 'de' MMMM", { locale: es })}
                  </CardTitle>
                  <Badge className={getScoreColor(score)}>
                    {getScoreLabel(score)} ({score}/6)
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Impulso:</span>
                    <Badge
                      variant="outline"
                      className={`ml-2 ${
                        log.impulso === "no"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : log.impulso === "parcial"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {log.impulso === "no" ? "No" : log.impulso === "parcial" ? "Parcial" : "Sí"}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Recuperación:</span>
                    <Badge
                      variant="outline"
                      className={`ml-2 ${
                        log.recuperacion === "no"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : log.recuperacion === "parcial"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {log.recuperacion === "no" ? "No" : log.recuperacion === "parcial" ? "Parcial" : "Sí"}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Límites:</span>
                    <Badge
                      variant="outline"
                      className={`ml-2 ${
                        log.limites === "si"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : log.limites === "parcial"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {log.limites === "si" ? "Sí" : log.limites === "parcial" ? "Parcial" : "No"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-sm">Aprendizaje:</span>
                  <p className="text-sm text-muted-foreground mt-1">{log.aprendizaje}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

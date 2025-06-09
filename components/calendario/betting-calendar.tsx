"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type CalendarEvent = {
  date: number
  bets: number
  wins: number
  losses: number
  pending: number
  isRest: boolean
  hasEvents: boolean
  profit: number
}

export function BettingCalendar() {
  // Estos datos vendrían de tu base de datos
  const daysInMonth = 30 // Junio tiene 30 días
  const firstDayOfMonth = 6 // 0 = Domingo, 6 = Sábado (1 de junio de 2025 es sábado)

  const calendarData: CalendarEvent[] = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1

    // Generar datos aleatorios para el ejemplo
    const isRest = [10, 17, 24].includes(day)
    const hasEvents = Math.random() > 0.5 && !isRest
    const bets = hasEvents ? Math.floor(Math.random() * 5) + 1 : 0
    const wins = hasEvents ? Math.floor(Math.random() * bets) : 0
    const pending = hasEvents ? Math.floor(Math.random() * (bets - wins)) : 0
    const losses = hasEvents ? bets - wins - pending : 0
    const profit = wins * 20 - losses * 15

    return {
      date: day,
      bets,
      wins,
      losses,
      pending,
      isRest,
      hasEvents,
      profit,
    }
  })

  const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  // Crear un array con los días vacíos al principio para alinear correctamente el calendario
  const calendarDays = [...Array(firstDayOfMonth).fill(null), ...calendarData]

  return (
    <TooltipProvider>
      <div className="grid grid-cols-7 gap-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => (
          <div key={index}>
            {day ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card
                    className={`min-h-[80px] p-2 flex flex-col ${
                      day.isRest
                        ? "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800"
                        : day.hasEvents
                          ? "hover:border-primary cursor-pointer"
                          : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{day.date}</span>
                      {day.isRest && (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          Descanso
                        </Badge>
                      )}
                    </div>
                    {day.hasEvents && (
                      <div className="mt-auto text-xs">
                        <div className="flex justify-between">
                          <span>Apuestas:</span>
                          <span>{day.bets}</span>
                        </div>
                        <div
                          className={`font-medium ${
                            day.profit > 0 ? "text-green-600" : day.profit < 0 ? "text-red-600" : ""
                          }`}
                        >
                          {day.profit > 0 ? "+" : ""}
                          {day.profit !== 0 ? `€${day.profit}` : "-"}
                        </div>
                      </div>
                    )}
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="p-0">
                  {day.isRest ? (
                    <div className="p-3">
                      <p className="font-medium">Día de descanso programado</p>
                      <p className="text-sm text-muted-foreground">No se permiten apuestas en este día</p>
                    </div>
                  ) : day.hasEvents ? (
                    <div className="p-3 space-y-2">
                      <p className="font-medium">Resumen del día {day.date}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <span>Apuestas:</span>
                        <span>{day.bets}</span>
                        <span>Ganadas:</span>
                        <span className="text-green-600">{day.wins}</span>
                        <span>Perdidas:</span>
                        <span className="text-red-600">{day.losses}</span>
                        <span>Pendientes:</span>
                        <span>{day.pending}</span>
                        <span>Balance:</span>
                        <span
                          className={`font-medium ${
                            day.profit > 0 ? "text-green-600" : day.profit < 0 ? "text-red-600" : ""
                          }`}
                        >
                          {day.profit > 0 ? "+" : ""}
                          {day.profit !== 0 ? `€${day.profit}` : "-"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3">
                      <p className="font-medium">Sin actividad</p>
                      <p className="text-sm text-muted-foreground">No hay apuestas registradas en este día</p>
                    </div>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="min-h-[80px]"></div>
            )}
          </div>
        ))}
      </div>
    </TooltipProvider>
  )
}

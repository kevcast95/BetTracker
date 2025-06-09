"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { format, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { toast } from "@/components/ui/use-toast"

export function RestDays() {
  // Estos datos vendrían de tu base de datos
  const initialRestDays = [new Date(2025, 5, 10), new Date(2025, 5, 17), new Date(2025, 5, 24), new Date(2025, 5, 31)]

  const [selectedDays, setSelectedDays] = useState<Date[]>(initialRestDays)
  const [forcedRestActive, setForcedRestActive] = useState(false)

  const handleSelect = (date: Date | undefined) => {
    if (!date) return

    setSelectedDays((current) => {
      const isSelected = current.some((selectedDate) => isSameDay(selectedDate, date))

      if (isSelected) {
        return current.filter((selectedDate) => !isSameDay(selectedDate, date))
      } else {
        return [...current, date]
      }
    })
  }

  const handleSave = () => {
    // En una implementación real, aquí enviarías los datos a tu API
    toast({
      title: "Días de descanso actualizados",
      description: `Has programado ${selectedDays.length} días de descanso.`,
    })
  }

  const toggleForcedRest = () => {
    setForcedRestActive(!forcedRestActive)
    toast({
      title: forcedRestActive ? "Modo descanso desactivado" : "Modo descanso activado",
      description: forcedRestActive
        ? "Has desactivado el modo descanso obligatorio."
        : "Has activado el modo descanso obligatorio hasta mañana.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Días de descanso programados</h3>
        <div className="flex flex-wrap gap-2">
          {selectedDays.length > 0 ? (
            selectedDays.map((day, index) => (
              <Badge key={index} variant="outline">
                {format(day, "EEEE, d 'de' MMMM", { locale: es })}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No hay días de descanso programados.</p>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Calendar
            mode="multiple"
            selected={selectedDays}
            onSelect={(date) => handleSelect(date)}
            className="rounded-md border"
            locale={es}
          />
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleSave} className="flex-1">
          Guardar Días de Descanso
        </Button>
        <Button onClick={toggleForcedRest} variant={forcedRestActive ? "destructive" : "outline"} className="flex-1">
          {forcedRestActive ? "Desactivar Modo Descanso" : "Activar Modo Descanso"}
        </Button>
      </div>

      {forcedRestActive && (
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-md">
          <p className="text-amber-800 dark:text-amber-300 text-sm">
            <strong>Modo descanso activado.</strong> No podrás realizar apuestas hasta mañana. Este período de descanso
            te ayudará a recuperar claridad mental.
          </p>
        </div>
      )}
    </div>
  )
}

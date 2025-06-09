"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function CalendarFilters() {
  const [month, setMonth] = useState("Junio")
  const [year, setYear] = useState("2025")

  const handlePrevMonth = () => {
    // En una implementación real, aquí manejarías el cambio de mes
    setMonth("Mayo")
  }

  const handleNextMonth = () => {
    // En una implementación real, aquí manejarías el cambio de mes
    setMonth("Julio")
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={handlePrevMonth}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Mes anterior</span>
        </Button>
        <div className="text-lg font-medium">
          {month} {year}
        </div>
        <Button variant="outline" size="icon" onClick={handleNextMonth}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Mes siguiente</span>
        </Button>
      </div>

      <div className="flex-1" />

      <div className="flex flex-col md:flex-row gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo de evento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los eventos</SelectItem>
            <SelectItem value="apuestas">Apuestas</SelectItem>
            <SelectItem value="descansos">Días de descanso</SelectItem>
            <SelectItem value="eventos">Eventos deportivos</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Deporte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los deportes</SelectItem>
            <SelectItem value="futbol">Fútbol</SelectItem>
            <SelectItem value="baloncesto">Baloncesto</SelectItem>
            <SelectItem value="tenis">Tenis</SelectItem>
            <SelectItem value="otro">Otros</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

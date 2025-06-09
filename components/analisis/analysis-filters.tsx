"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

export function AnalysisFilters() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 4, 1),
    to: new Date(2025, 5, 8),
  })

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        <Select defaultValue="all">
          <SelectTrigger>
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
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            <SelectItem value="segura">Segura</SelectItem>
            <SelectItem value="balanceada">Balanceada</SelectItem>
            <SelectItem value="arriesgada">Arriesgada</SelectItem>
            <SelectItem value="escalonada">Escalonada</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Decisión" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las decisiones</SelectItem>
            <SelectItem value="analizada">Analizada</SelectItem>
            <SelectItem value="intuicion">Intuición</SelectItem>
            <SelectItem value="impulso">Impulso</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className="justify-start text-left font-normal">
            <Calendar className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yy")} - {format(date.to, "dd/MM/yy")}
                </>
              ) : (
                format(date.from, "dd/MM/yy")
              )
            ) : (
              <span>Período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

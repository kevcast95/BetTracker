"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function BetFilters() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 1),
    to: new Date(2025, 5, 8),
  })

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input placeholder="Buscar por evento o mercado..." />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="ganada">Ganada</SelectItem>
            <SelectItem value="perdida">Perdida</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="segura">Segura</SelectItem>
            <SelectItem value="balanceada">Balanceada</SelectItem>
            <SelectItem value="arriesgada">Arriesgada</SelectItem>
            <SelectItem value="escalonada">Escalonada</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Decisión" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="analizada">Analizada</SelectItem>
            <SelectItem value="intuicion">Intuición</SelectItem>
            <SelectItem value="impulso">Impulso</SelectItem>
          </SelectContent>
        </Select>
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
                <span>Fecha</span>
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
    </div>
  )
}

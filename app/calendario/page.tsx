import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BettingCalendar } from "@/components/calendario/betting-calendar"
import { UpcomingEvents } from "@/components/calendario/upcoming-events"
import { CalendarFilters } from "@/components/calendario/calendar-filters"

export default function CalendarioPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendario</h1>
        <p className="text-muted-foreground">Visualiza y planifica tus apuestas en el calendario.</p>
      </div>

      <CalendarFilters />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendario de Apuestas</CardTitle>
              <CardDescription>Visualiza tus apuestas y días de descanso</CardDescription>
            </CardHeader>
            <CardContent>
              <BettingCalendar />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
              <CardDescription>Eventos deportivos destacados</CardDescription>
            </CardHeader>
            <CardContent>
              <UpcomingEvents />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

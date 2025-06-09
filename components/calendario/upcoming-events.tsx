"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Bell, BellOff, CalendarIcon } from "lucide-react"
import { useState } from "react"

type Event = {
  id: string
  title: string
  date: string
  time: string
  sport: string
  notified: boolean
}

export function UpcomingEvents() {
  // Estos datos vendrían de tu base de datos
  const initialEvents: Event[] = [
    {
      id: "1",
      title: "Barcelona vs Real Madrid",
      date: "10/06/2025",
      time: "20:00",
      sport: "Fútbol",
      notified: true,
    },
    {
      id: "2",
      title: "Roland Garros - Final",
      date: "12/06/2025",
      time: "15:30",
      sport: "Tenis",
      notified: false,
    },
    {
      id: "3",
      title: "Lakers vs Warriors",
      date: "15/06/2025",
      time: "02:30",
      sport: "Baloncesto",
      notified: true,
    },
    {
      id: "4",
      title: "Liverpool vs Manchester City",
      date: "18/06/2025",
      time: "16:00",
      sport: "Fútbol",
      notified: false,
    },
    {
      id: "5",
      title: "PSG vs Marseille",
      date: "20/06/2025",
      time: "21:00",
      sport: "Fútbol",
      notified: false,
    },
  ]

  const [events, setEvents] = useState<Event[]>(initialEvents)

  const toggleNotification = (id: string) => {
    setEvents(
      events.map((event) => {
        if (event.id === id) {
          return { ...event, notified: !event.notified }
        }
        return event
      }),
    )
  }

  const getSportBadgeColor = (sport: string) => {
    switch (sport) {
      case "Fútbol":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Baloncesto":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Tenis":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <CalendarIcon className="h-3 w-3" />
                    <span>
                      {event.date} - {event.time}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className={getSportBadgeColor(event.sport)}>
                  {event.sport}
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="p-2 flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                className={event.notified ? "text-primary" : "text-muted-foreground"}
                onClick={() => toggleNotification(event.id)}
              >
                {event.notified ? (
                  <>
                    <Bell className="h-4 w-4 mr-1" />
                    Notificación activada
                  </>
                ) : (
                  <>
                    <BellOff className="h-4 w-4 mr-1" />
                    Activar notificación
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                Ver detalles
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

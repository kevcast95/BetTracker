"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Plus, Play, Trash2 } from "lucide-react"

type WaitingBet = {
  id: string
  event: string
  odds: number
  category: "segura" | "balanceada" | "arriesgada"
  justification: string
  sport: string
}

export function WaitingList() {
  const [waitingBets, setWaitingBets] = useState<WaitingBet[]>([
    {
      id: "1",
      event: "Bayern Munich vs Dortmund",
      odds: 1.65,
      category: "segura",
      justification: "Bayern en casa con racha de 8 partidos ganados consecutivos",
      sport: "Fútbol",
    },
    {
      id: "2",
      event: "Lakers vs Warriors",
      odds: 1.85,
      category: "balanceada",
      justification: "Ambos equipos con jugadores clave disponibles, historial equilibrado",
      sport: "Baloncesto",
    },
  ])

  const [newBet, setNewBet] = useState({
    event: "",
    odds: "",
    category: "balanceada" as const,
    justification: "",
    sport: "futbol",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [hasActiveLadder] = useState(true) // En una implementación real, esto vendría del estado global

  const handleAddBet = () => {
    if (!newBet.event || !newBet.odds || !newBet.justification) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      })
      return
    }

    const bet: WaitingBet = {
      id: Date.now().toString(),
      event: newBet.event,
      odds: Number.parseFloat(newBet.odds),
      category: newBet.category,
      justification: newBet.justification,
      sport: newBet.sport,
    }

    setWaitingBets([...waitingBets, bet])
    setNewBet({
      event: "",
      odds: "",
      category: "balanceada",
      justification: "",
      sport: "futbol",
    })
    setIsDialogOpen(false)

    toast({
      title: "Apuesta añadida",
      description: "La apuesta ha sido añadida a la lista de espera.",
    })
  }

  const handleActivateLadder = (bet: WaitingBet) => {
    if (hasActiveLadder) {
      toast({
        title: "Escalera activa",
        description: "Ya tienes una escalera activa. Complétala antes de iniciar una nueva.",
        variant: "destructive",
      })
      return
    }

    // En una implementación real, aquí activarías la nueva escalera
    toast({
      title: "Nueva escalera activada",
      description: `Escalera iniciada con ${bet.event}.`,
    })

    // Remover de la lista de espera
    setWaitingBets(waitingBets.filter((b) => b.id !== bet.id))
  }

  const handleDeleteBet = (id: string) => {
    setWaitingBets(waitingBets.filter((bet) => bet.id !== id))
    toast({
      title: "Apuesta eliminada",
      description: "La apuesta ha sido eliminada de la lista de espera.",
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "segura":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "balanceada":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "arriesgada":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Próximas Escaleras</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Añadir
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Apuesta a Lista de Espera</DialogTitle>
              <DialogDescription>
                Planifica tu próxima escalera añadiendo apuestas analizadas a la lista de espera.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="event">Evento</Label>
                <Input
                  id="event"
                  value={newBet.event}
                  onChange={(e) => setNewBet({ ...newBet, event: e.target.value })}
                  placeholder="Ej: Barcelona vs Real Madrid"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="odds">Cuota</Label>
                  <Input
                    id="odds"
                    type="number"
                    step="0.01"
                    min="1"
                    value={newBet.odds}
                    onChange={(e) => setNewBet({ ...newBet, odds: e.target.value })}
                    placeholder="1.50"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={newBet.category}
                    onValueChange={(value: any) => setNewBet({ ...newBet, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="segura">Segura</SelectItem>
                      <SelectItem value="balanceada">Balanceada</SelectItem>
                      <SelectItem value="arriesgada">Arriesgada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="sport">Deporte</Label>
                <Select value={newBet.sport} onValueChange={(value) => setNewBet({ ...newBet, sport: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="futbol">Fútbol</SelectItem>
                    <SelectItem value="baloncesto">Baloncesto</SelectItem>
                    <SelectItem value="tenis">Tenis</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="justification">Justificación</Label>
                <Textarea
                  id="justification"
                  value={newBet.justification}
                  onChange={(e) => setNewBet({ ...newBet, justification: e.target.value })}
                  placeholder="Explica por qué esta apuesta es una buena opción..."
                  className="resize-none"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddBet}>Añadir a Lista</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {waitingBets.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No hay apuestas en la lista de espera.</p>
            <p className="text-sm">Añade apuestas analizadas para tu próxima escalera.</p>
          </div>
        ) : (
          waitingBets.map((bet) => (
            <Card key={bet.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{bet.event}</CardTitle>
                  <Badge variant="outline" className={getCategoryColor(bet.category)}>
                    {bet.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Cuota:</span>
                  <span className="font-medium">{bet.odds}</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{bet.justification}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    disabled={hasActiveLadder}
                    onClick={() => handleActivateLadder(bet)}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    {hasActiveLadder ? "Escalera Activa" : "Activar Escalera"}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteBet(bet.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

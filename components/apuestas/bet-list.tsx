"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Check, X, Clock, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export function BetList() {
  // Estos datos vendrían de tu base de datos
  const bets = [
    {
      id: "1",
      event: "Barcelona vs Real Madrid",
      market: "Over 2.5 goles",
      amount: 20,
      odds: 1.85,
      category: "Balanceada",
      decision: "Analizada",
      status: "Ganada",
      profit: 17,
      date: "2025-06-08T14:30:00",
    },
    {
      id: "2",
      event: "Liverpool vs Manchester City",
      market: "Ambos equipos marcan",
      amount: 15,
      odds: 1.65,
      category: "Segura",
      decision: "Analizada",
      status: "Ganada",
      profit: 9.75,
      date: "2025-06-08T12:00:00",
    },
    {
      id: "3",
      event: "PSG vs Marseille",
      market: "PSG gana",
      amount: 25,
      odds: 1.45,
      category: "Segura",
      decision: "Intuición",
      status: "Perdida",
      profit: -25,
      date: "2025-06-08T10:15:00",
    },
    {
      id: "4",
      event: "Bayern Munich vs Dortmund",
      market: "Over 9.5 corners",
      amount: 15,
      odds: 2.1,
      category: "Arriesgada",
      decision: "Analizada",
      status: "Ganada",
      profit: 16.5,
      date: "2025-06-07T18:45:00",
    },
    {
      id: "5",
      event: "Juventus vs Milan",
      market: "Under 2.5 goles",
      amount: 20,
      odds: 1.9,
      category: "Balanceada",
      decision: "Impulso",
      status: "Pendiente",
      profit: 0,
      date: "2025-06-08T20:00:00",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return (
      date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ganada":
        return <Check className="h-4 w-4 text-green-600" />
      case "Perdida":
        return <X className="h-4 w-4 text-red-600" />
      case "Pendiente":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Segura":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Balanceada":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Arriesgada":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Escalonada":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "Analizada":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
      case "Intuición":
        return "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300"
      case "Impulso":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Evento</TableHead>
            <TableHead>Mercado</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Cuota</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Decisión</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">P/L</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bets.map((bet) => (
            <TableRow key={bet.id}>
              <TableCell className="font-medium whitespace-nowrap">{formatDate(bet.date)}</TableCell>
              <TableCell className="max-w-[150px] truncate" title={bet.event}>
                {bet.event}
              </TableCell>
              <TableCell className="max-w-[120px] truncate" title={bet.market}>
                {bet.market}
              </TableCell>
              <TableCell>€{bet.amount}</TableCell>
              <TableCell>{bet.odds}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getCategoryColor(bet.category)}>
                  {bet.category}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getDecisionColor(bet.decision)}>
                  {bet.decision}
                </Badge>
              </TableCell>
              <TableCell>
                <Select
                  value={bet.status.toLowerCase()}
                  onValueChange={(value) => {
                    // En una implementación real, aquí actualizarías el estado en la base de datos
                    console.log(`Updating bet ${bet.id} status to ${value}`)
                    toast({
                      title: "Estado actualizado",
                      description: `La apuesta ha sido marcada como ${value}.`,
                    })
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(bet.status)}
                        <span>{bet.status}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <span>Pendiente</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ganada">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Ganada</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="perdida">
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-red-600" />
                        <span>Perdida</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell
                className={`text-right font-medium ${
                  bet.profit > 0
                    ? "text-green-600 dark:text-green-400"
                    : bet.profit < 0
                      ? "text-red-600 dark:text-red-400"
                      : ""
                }`}
              >
                {bet.profit > 0 ? "+" : ""}
                {bet.profit !== 0 ? `€${bet.profit}` : "-"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 dark:text-red-400">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

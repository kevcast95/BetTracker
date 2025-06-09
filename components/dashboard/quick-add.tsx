"use client"

import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QuickAdd() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Apuesta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Apuesta</DialogTitle>
          <DialogDescription>Añade una nueva apuesta a tu registro.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deporte" className="text-right">
              Deporte
            </Label>
            <Select defaultValue="futbol">
              <SelectTrigger id="deporte" className="col-span-3">
                <SelectValue placeholder="Selecciona un deporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="futbol">Fútbol</SelectItem>
                <SelectItem value="baloncesto">Baloncesto</SelectItem>
                <SelectItem value="tenis">Tenis</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="evento" className="text-right">
              Evento
            </Label>
            <Input id="evento" placeholder="Ej: Barcelona vs Real Madrid" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mercado" className="text-right">
              Mercado
            </Label>
            <Input id="mercado" placeholder="Ej: Over 2.5 goles" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cuota" className="text-right">
              Cuota
            </Label>
            <Input id="cuota" type="number" step="0.01" min="1" placeholder="1.50" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="monto" className="text-right">
              Monto €
            </Label>
            <Input id="monto" type="number" step="0.01" min="0" placeholder="20.00" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categoria" className="text-right">
              Categoría
            </Label>
            <Select defaultValue="balanceada">
              <SelectTrigger id="categoria" className="col-span-3">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="segura">Segura</SelectItem>
                <SelectItem value="balanceada">Balanceada</SelectItem>
                <SelectItem value="arriesgada">Arriesgada</SelectItem>
                <SelectItem value="escalonada">Escalonada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="decision" className="text-right">
              Decisión
            </Label>
            <Select defaultValue="analizada">
              <SelectTrigger id="decision" className="col-span-3">
                <SelectValue placeholder="Tipo de decisión" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="analizada">Analizada</SelectItem>
                <SelectItem value="intuicion">Intuición</SelectItem>
                <SelectItem value="impulso">Impulso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

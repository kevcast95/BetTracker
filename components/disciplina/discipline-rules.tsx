"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type Rule = {
  id: string
  title: string
  description: string
  active: boolean
}

export function DisciplineRules() {
  // Estos datos vendrían de tu base de datos
  const initialRules: Rule[] = [
    {
      id: "1",
      title: "No apostar en días de trabajo",
      description: "Evitar apostar durante días laborales para mantener el enfoque profesional.",
      active: true,
    },
    {
      id: "2",
      title: "Máximo 2 apuestas por partido",
      description: "Limitar a 2 apuestas por partido para evitar la sobreexposición.",
      active: true,
    },
    {
      id: "3",
      title: "No apostar después de beber alcohol",
      description: "El alcohol afecta la toma de decisiones. Evitar apostar bajo su influencia.",
      active: true,
    },
  ]

  const [rules, setRules] = useState<Rule[]>(initialRules)
  const [newRule, setNewRule] = useState({ title: "", description: "" })

  const handleToggleRule = (id: string) => {
    setRules(
      rules.map((rule) => {
        if (rule.id === id) {
          return { ...rule, active: !rule.active }
        }
        return rule
      }),
    )
  }

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id))
    toast({
      title: "Regla eliminada",
      description: "La regla ha sido eliminada correctamente.",
    })
  }

  const handleAddRule = () => {
    if (newRule.title.trim() === "") {
      toast({
        title: "Error",
        description: "El título de la regla no puede estar vacío.",
        variant: "destructive",
      })
      return
    }

    const newId = (Math.max(0, ...rules.map((r) => Number.parseInt(r.id))) + 1).toString()
    setRules([...rules, { id: newId, ...newRule, active: true }])
    setNewRule({ title: "", description: "" })
    toast({
      title: "Regla añadida",
      description: "La nueva regla ha sido añadida correctamente.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="flex items-start space-x-4 p-4 border rounded-md">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{rule.title}</h4>
                <Switch checked={rule.active} onCheckedChange={() => handleToggleRule(rule.id)} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleDeleteRule(rule.id)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Eliminar regla</span>
            </Button>
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Añadir Nueva Regla</h3>
        <div className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={newRule.title}
              onChange={(e) => setNewRule({ ...newRule, title: e.target.value })}
              placeholder="Ej: No apostar en ligas desconocidas"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={newRule.description}
              onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
              placeholder="Explica el propósito de esta regla..."
              className="resize-none"
            />
          </div>
          <Button onClick={handleAddRule}>Añadir Regla</Button>
        </div>
      </div>
    </div>
  )
}

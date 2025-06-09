"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  deporte: z.string().min(1, {
    message: "Por favor selecciona un deporte.",
  }),
  evento: z.string().min(3, {
    message: "El evento debe tener al menos 3 caracteres.",
  }),
  mercado: z.string().min(3, {
    message: "El mercado debe tener al menos 3 caracteres.",
  }),
  cuota: z.coerce.number().min(1, {
    message: "La cuota debe ser al menos 1.",
  }),
  monto: z.coerce.number().min(0.01, {
    message: "El monto debe ser mayor que 0.",
  }),
  categoria: z.string().min(1, {
    message: "Por favor selecciona una categoría.",
  }),
  decision: z.string().min(1, {
    message: "Por favor selecciona un tipo de decisión.",
  }),
  notas: z.string().optional(),
})

export function BetForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deporte: "futbol",
      evento: "",
      mercado: "",
      cuota: undefined,
      monto: undefined,
      categoria: "balanceada",
      decision: "analizada",
      notas: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // En una implementación real, aquí enviarías los datos a tu API
    console.log(values)
    toast({
      title: "Apuesta registrada",
      description: "Tu apuesta ha sido registrada correctamente.",
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="deporte"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deporte</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un deporte" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="futbol">Fútbol</SelectItem>
                  <SelectItem value="baloncesto">Baloncesto</SelectItem>
                  <SelectItem value="tenis">Tenis</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="evento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Evento</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Barcelona vs Real Madrid" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mercado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mercado</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Over 2.5 goles" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cuota"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuota</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="1" placeholder="1.50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="monto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto €</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" placeholder="20.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="segura">Segura</SelectItem>
                    <SelectItem value="balanceada">Balanceada</SelectItem>
                    <SelectItem value="arriesgada">Arriesgada</SelectItem>
                    <SelectItem value="escalonada">Escalonada</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="decision"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Decisión</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de decisión" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="analizada">Analizada</SelectItem>
                    <SelectItem value="intuicion">Intuición</SelectItem>
                    <SelectItem value="impulso">Impulso</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="notas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Añade notas o comentarios sobre esta apuesta"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Puedes añadir cualquier información adicional relevante.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Registrar Apuesta
        </Button>
      </form>
    </Form>
  )
}

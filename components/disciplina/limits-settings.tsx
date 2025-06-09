"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  maxBetsPerDay: z.coerce.number().min(1, {
    message: "Debes permitir al menos 1 apuesta por día.",
  }),
  maxDailyLoss: z.coerce.number().min(0, {
    message: "La pérdida máxima no puede ser negativa.",
  }),
  maxDailyLossType: z.enum(["amount", "percentage"]),
  dailyTarget: z.coerce.number().min(0, {
    message: "El objetivo diario no puede ser negativo.",
  }),
  dailyTargetType: z.enum(["amount", "percentage"]),
  autoRestAfterLoss: z.boolean(),
  consecutiveLossesForRest: z.coerce.number().min(1, {
    message: "Debe ser al menos 1 día.",
  }),
  alertsEnabled: z.boolean(),
})

export function LimitsSettings() {
  // Estos datos vendrían de tu base de datos
  const defaultValues = {
    maxBetsPerDay: 10,
    maxDailyLoss: 50,
    maxDailyLossType: "amount" as const,
    dailyTarget: 60,
    dailyTargetType: "amount" as const,
    autoRestAfterLoss: true,
    consecutiveLossesForRest: 2,
    alertsEnabled: true,
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // En una implementación real, aquí enviarías los datos a tu API
    console.log(values)
    toast({
      title: "Límites actualizados",
      description: "Tus límites han sido actualizados correctamente.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="maxBetsPerDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Máximo de apuestas por día</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Establece un límite para evitar excesos.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="maxDailyLoss"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pérdida máxima diaria</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxDailyLossType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="amount">Monto (€)</SelectItem>
                    <SelectItem value="percentage">Porcentaje (%)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dailyTarget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objetivo diario</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dailyTargetType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="amount">Monto (€)</SelectItem>
                    <SelectItem value="percentage">Porcentaje (%)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="autoRestAfterLoss"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Descanso automático</FormLabel>
                <FormDescription>
                  Activa el modo descanso automáticamente después de días consecutivos de pérdida
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consecutiveLossesForRest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Días consecutivos de pérdida para descanso</FormLabel>
              <FormControl>
                <Input type="number" {...field} disabled={!form.watch("autoRestAfterLoss")} />
              </FormControl>
              <FormDescription>
                Número de días consecutivos con pérdida que activarán un descanso obligatorio.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alertsEnabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Alertas</FormLabel>
                <FormDescription>Recibe notificaciones cuando te acerques a tus límites</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Guardar Configuración</Button>
      </form>
    </Form>
  )
}

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  impulso: z.enum(["si", "no", "parcial"], {
    required_error: "Por favor selecciona una opción.",
  }),
  recuperacion: z.enum(["si", "no", "parcial"], {
    required_error: "Por favor selecciona una opción.",
  }),
  limites: z.enum(["si", "no", "parcial"], {
    required_error: "Por favor selecciona una opción.",
  }),
  aprendizaje: z.string().min(10, {
    message: "El aprendizaje debe tener al menos 10 caracteres.",
  }),
})

export function EmotionalLog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      impulso: undefined,
      recuperacion: undefined,
      limites: undefined,
      aprendizaje: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // En una implementación real, aquí enviarías los datos a tu API
    console.log(values)
    toast({
      title: "Bitácora registrada",
      description: "Tu bitácora emocional ha sido registrada correctamente.",
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="impulso"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>¿Aposté por impulso hoy?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No, todas mis apuestas fueron planificadas</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="parcial" />
                    </FormControl>
                    <FormLabel className="font-normal">Parcialmente, algunas apuestas fueron impulsivas</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="si" />
                    </FormControl>
                    <FormLabel className="font-normal">Sí, la mayoría de mis apuestas fueron por impulso</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recuperacion"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>¿Intenté recuperar una pérdida?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No, mantuve mi estrategia independientemente de los resultados
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="parcial" />
                    </FormControl>
                    <FormLabel className="font-normal">Parcialmente, aumenté algunas apuestas tras perder</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="si" />
                    </FormControl>
                    <FormLabel className="font-normal">Sí, aposté más para intentar recuperar pérdidas</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="limites"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>¿Respeté mi límite diario?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="si" />
                    </FormControl>
                    <FormLabel className="font-normal">Sí, me mantuve dentro de mis límites establecidos</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="parcial" />
                    </FormControl>
                    <FormLabel className="font-normal">Parcialmente, me excedí ligeramente</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No, superé significativamente mis límites</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aprendizaje"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Qué aprendí hoy?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Reflexiona sobre tus decisiones y emociones del día..."
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Reflexiona sobre tus aciertos, errores y cómo mejorar.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Guardar Bitácora
        </Button>
      </form>
    </Form>
  )
}

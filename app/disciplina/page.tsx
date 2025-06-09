import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LimitsSettings } from "@/components/disciplina/limits-settings"
import { RestDays } from "@/components/disciplina/rest-days"
import { DisciplineRules } from "@/components/disciplina/discipline-rules"
import { DisciplineStats } from "@/components/disciplina/discipline-stats"

export default function DisciplinaPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sistema Disciplinario</h1>
        <p className="text-muted-foreground">Configura tus límites y reglas para mantener una disciplina adecuada.</p>
      </div>

      <DisciplineStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Límites</CardTitle>
            <CardDescription>Establece tus límites diarios para mantener el control</CardDescription>
          </CardHeader>
          <CardContent>
            <LimitsSettings />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Días de Descanso</CardTitle>
            <CardDescription>Programa tus días de descanso para recuperar claridad mental</CardDescription>
          </CardHeader>
          <CardContent>
            <RestDays />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reglas Disciplinarias</CardTitle>
          <CardDescription>Define reglas personalizadas para mejorar tu disciplina</CardDescription>
        </CardHeader>
        <CardContent>
          <DisciplineRules />
        </CardContent>
      </Card>
    </div>
  )
}

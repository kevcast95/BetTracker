import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActiveLadder } from "@/components/escaleras/active-ladder"
import { WaitingList } from "@/components/escaleras/waiting-list"
import { LadderStats } from "@/components/escaleras/ladder-stats"

export default function EscalerasPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Seguimiento Escalonado</h1>
        <p className="text-muted-foreground">
          Gestiona tu escalera de apuestas activa y planifica las siguientes con disciplina.
        </p>
      </div>

      <LadderStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Escalera Activa</CardTitle>
              <CardDescription>Tu escalera de apuestas actual con 3 niveles</CardDescription>
            </CardHeader>
            <CardContent>
              <ActiveLadder />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Lista de Espera</CardTitle>
              <CardDescription>Próximas escaleras planificadas</CardDescription>
            </CardHeader>
            <CardContent>
              <WaitingList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

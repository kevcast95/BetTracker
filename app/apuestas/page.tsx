import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BetForm } from "@/components/apuestas/bet-form"
import { BetList } from "@/components/apuestas/bet-list"
import { BetFilters } from "@/components/apuestas/bet-filters"

export default function ApuestasPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Apuestas</h1>
        <p className="text-muted-foreground">Registra y administra todas tus apuestas deportivas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Nueva Apuesta</CardTitle>
              <CardDescription>Registra una nueva apuesta deportiva</CardDescription>
            </CardHeader>
            <CardContent>
              <BetForm />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Historial de Apuestas</CardTitle>
                <CardDescription>Todas tus apuestas registradas</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <BetFilters />
              <BetList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

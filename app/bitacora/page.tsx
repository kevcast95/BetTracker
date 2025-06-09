import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmotionalLog } from "@/components/bitacora/emotional-log"
import { EmotionalHistory } from "@/components/bitacora/emotional-history"

export default function BitacoraPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bitácora Emocional</h1>
        <p className="text-muted-foreground">Registra y analiza tus emociones al apostar para mejorar tu disciplina.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Registro Diario</CardTitle>
              <CardDescription>Completa tu bitácora emocional del día</CardDescription>
            </CardHeader>
            <CardContent>
              <EmotionalLog />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Historial Emocional</CardTitle>
              <CardDescription>Revisa tu evolución emocional a lo largo del tiempo</CardDescription>
            </CardHeader>
            <CardContent>
              <EmotionalHistory />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

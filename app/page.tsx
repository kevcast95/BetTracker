import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DailyStats } from "@/components/dashboard/daily-stats"
import { BetSummary } from "@/components/dashboard/bet-summary"
import { GoalProgress } from "@/components/dashboard/goal-progress"
import { RecentBets } from "@/components/dashboard/recent-bets"
import { QuickAdd } from "@/components/dashboard/quick-add"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Gestiona tus apuestas de forma organizada y consciente.</p>
        </div>
        <QuickAdd />
      </div>

      <DailyStats />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Resumen de Apuestas</CardTitle>
            <CardDescription>Rendimiento de tus apuestas en los últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <BetSummary />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Meta Diaria</CardTitle>
            <CardDescription>Progreso hacia tu objetivo del día</CardDescription>
          </CardHeader>
          <CardContent>
            <GoalProgress />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Apuestas Recientes</CardTitle>
          <CardDescription>Tus últimas apuestas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentBets />
        </CardContent>
      </Card>
    </div>
  )
}

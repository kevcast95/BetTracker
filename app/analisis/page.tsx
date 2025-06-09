import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PerformanceChart } from "@/components/analisis/performance-chart"
import { CategoryAnalysis } from "@/components/analisis/category-analysis"
import { SportAnalysis } from "@/components/analisis/sport-analysis"
import { DecisionAnalysis } from "@/components/analisis/decision-analysis"
import { AnalysisFilters } from "@/components/analisis/analysis-filters"

export default function AnalisisPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Análisis y Evolución</h1>
        <p className="text-muted-foreground">Analiza el rendimiento de tus apuestas y mejora tu estrategia.</p>
      </div>

      <AnalysisFilters />

      <Card>
        <CardHeader>
          <CardTitle>Rendimiento General</CardTitle>
          <CardDescription>Evolución de ganancias y pérdidas en el tiempo</CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceChart />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Análisis por Categoría</CardTitle>
            <CardDescription>Rendimiento según el tipo de apuesta</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryAnalysis />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Análisis por Deporte</CardTitle>
            <CardDescription>Rendimiento según el deporte</CardDescription>
          </CardHeader>
          <CardContent>
            <SportAnalysis />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Análisis por Decisión</CardTitle>
            <CardDescription>Rendimiento según el origen de la decisión</CardDescription>
          </CardHeader>
          <CardContent>
            <DecisionAnalysis />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

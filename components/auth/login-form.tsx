"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Chrome, TrendingUp, Target, BarChart3 } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // Aquí iría la lógica de autenticación con Google
    // Por ahora solo simulamos el loading
    setTimeout(() => {
      setIsLoading(false)
      // Redirigir al dashboard después del login exitoso
      window.location.href = "/"
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Logo y título */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">BetTracker</h1>
        <p className="text-slate-600">Gestiona tus apuestas con disciplina</p>
      </div>

      {/* Card de login */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl">Iniciar Sesión</CardTitle>
          <CardDescription>Accede a tu cuenta para continuar gestionando tus apuestas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
            variant="outline"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                <span>Conectando...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Chrome className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Continuar con Google</span>
              </div>
            )}
          </Button>

          <div className="relative">
            <Separator className="my-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-xs text-slate-500">Características principales</span>
            </div>
          </div>

          {/* Features preview */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Control Disciplinario</p>
                <p className="text-xs text-slate-600">Límites y metas diarias</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Análisis Detallado</p>
                <p className="text-xs text-slate-600">Estadísticas y evolución</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Escaleras Inteligentes</p>
                <p className="text-xs text-slate-600">Gestión de bankroll</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs text-slate-500">
        <p>Al continuar, aceptas nuestros términos de servicio</p>
        <p className="mt-1">y política de privacidad</p>
      </div>
    </div>
  )
}

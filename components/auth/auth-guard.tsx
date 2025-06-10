"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Aquí iría la lógica para verificar si el usuario está autenticado
    // Por ahora simulamos que siempre está autenticado
    const checkAuth = () => {
      // Simular verificación de autenticación
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      setIsAuthenticated(isLoggedIn)

      if (!isLoggedIn) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // El router redirigirá a login
  }

  return <>{children}</>
}

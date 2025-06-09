"use client"

import { useEffect, useRef } from "react"

// Nota: En una implementación real, usarías una librería de gráficos como Chart.js o Recharts
export function BetSummary() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Configurar el canvas para alta resolución
    const dpr = window.devicePixelRatio || 1
    const rect = canvasRef.current.getBoundingClientRect()
    canvasRef.current.width = rect.width * dpr
    canvasRef.current.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Dibujar un gráfico simple (esto es solo un placeholder)
    const width = rect.width
    const height = rect.height

    // Datos de ejemplo (ganancia/pérdida por día)
    const data = [15, -5, 25, 10, -8, 30, 20]
    const maxValue = Math.max(...data.map((v) => Math.abs(v)))

    // Dibujar ejes
    ctx.strokeStyle = "#e5e7eb"
    ctx.beginPath()
    ctx.moveTo(40, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    // Dibujar barras
    const barWidth = (width - 60) / data.length - 10

    data.forEach((value, index) => {
      const x = 50 + index * (barWidth + 10)
      const barHeight = (Math.abs(value) / maxValue) * (height / 2 - 20)

      ctx.fillStyle = value >= 0 ? "#10b981" : "#ef4444"

      if (value >= 0) {
        ctx.fillRect(x, height / 2 - barHeight, barWidth, barHeight)
      } else {
        ctx.fillRect(x, height / 2, barWidth, barHeight)
      }

      // Añadir etiqueta del día
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`D${index + 1}`, x + barWidth / 2, height - 5)

      // Añadir valor
      ctx.fillStyle = "#111827"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      const textY = value >= 0 ? height / 2 - barHeight - 5 : height / 2 + barHeight + 12
      ctx.fillText(`€${value}`, x + barWidth / 2, textY)
    })
  }, [])

  return (
    <div className="w-full h-[250px]">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

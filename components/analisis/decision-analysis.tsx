"use client"

import { useEffect, useRef } from "react"

export function DecisionAnalysis() {
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

    // Datos de ejemplo
    const data = [
      { name: "Analizada", win: 75, loss: 25, color: "#10b981" },
      { name: "Intuición", win: 55, loss: 45, color: "#8b5cf6" },
      { name: "Impulso", win: 30, loss: 70, color: "#f43f5e" },
    ]

    const barHeight = 30
    const gap = 40
    const startY = 40

    // Dibujar barras
    data.forEach((item, index) => {
      const y = startY + index * gap

      // Etiqueta de decisión
      ctx.fillStyle = "#111827"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(item.name, 10, y - 5)

      // Barra de ganadas
      ctx.fillStyle = item.color
      ctx.fillRect(10, y, (width - 20) * (item.win / 100), barHeight)

      // Barra de perdidas
      ctx.fillStyle = "#e5e7eb"
      ctx.fillRect(10 + (width - 20) * (item.win / 100), y, (width - 20) * (item.loss / 100), barHeight)

      // Porcentaje de ganadas
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.win}%`, 10 + ((width - 20) * (item.win / 100)) / 2, y + barHeight / 2)

      // Porcentaje de perdidas
      ctx.fillStyle = "#6b7280"
      ctx.fillText(
        `${item.loss}%`,
        10 + (width - 20) * (item.win / 100) + ((width - 20) * (item.loss / 100)) / 2,
        y + barHeight / 2,
      )
    })

    // Añadir leyenda
    const legendY = height - 20
    ctx.fillStyle = "#10b981"
    ctx.fillRect(10, legendY - 8, 10, 10)
    ctx.fillStyle = "#111827"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Ganadas", 25, legendY - 2)

    ctx.fillStyle = "#e5e7eb"
    ctx.fillRect(90, legendY - 8, 10, 10)
    ctx.fillStyle = "#111827"
    ctx.fillText("Perdidas", 105, legendY - 2)
  }, [])

  return (
    <div className="w-full h-[200px]">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

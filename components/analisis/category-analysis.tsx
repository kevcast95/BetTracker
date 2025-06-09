"use client"

import { useEffect, useRef } from "react"

export function CategoryAnalysis() {
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
      { name: "Segura", value: 65, color: "#3b82f6" },
      { name: "Balanceada", value: 45, color: "#8b5cf6" },
      { name: "Arriesgada", value: -15, color: "#f97316" },
      { name: "Escalonada", value: 25, color: "#06b6d4" },
    ]

    const maxValue = Math.max(...data.map((d) => Math.abs(d.value)))
    const barHeight = (height - 60) / data.length - 10

    // Dibujar barras
    data.forEach((item, index) => {
      const y = 30 + index * (barHeight + 10)
      const barWidth = (Math.abs(item.value) / maxValue) * (width - 120)

      // Etiqueta de categoría
      ctx.fillStyle = "#111827"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(item.name, 80, y + barHeight / 2 + 4)

      // Barra
      ctx.fillStyle = item.color
      if (item.value >= 0) {
        ctx.fillRect(90, y, barWidth, barHeight)
      } else {
        ctx.fillRect(90 - barWidth, y, barWidth, barHeight)
      }

      // Valor
      ctx.fillStyle = "#111827"
      ctx.font = "10px sans-serif"
      ctx.textAlign = item.value >= 0 ? "left" : "right"
      ctx.fillText(`€${item.value}`, item.value >= 0 ? 90 + barWidth + 5 : 90 - barWidth - 5, y + barHeight / 2 + 3)
    })

    // Línea central
    ctx.strokeStyle = "#e5e7eb"
    ctx.beginPath()
    ctx.moveTo(90, 20)
    ctx.lineTo(90, height - 20)
    ctx.stroke()
  }, [])

  return (
    <div className="w-full h-[200px]">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

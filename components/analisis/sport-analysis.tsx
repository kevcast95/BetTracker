"use client"

import { useEffect, useRef } from "react"

export function SportAnalysis() {
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
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 30

    // Datos de ejemplo
    const data = [
      { name: "Fútbol", value: 60, color: "#3b82f6" },
      { name: "Baloncesto", value: 25, color: "#8b5cf6" },
      { name: "Tenis", value: 10, color: "#f97316" },
      { name: "Otros", value: 5, color: "#06b6d4" },
    ]

    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Dibujar gráfico de pastel
    let startAngle = 0
    data.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total

      // Dibujar sector
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = item.color
      ctx.fill()

      // Añadir etiqueta
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + labelRadius * Math.cos(midAngle)
      const labelY = centerY + labelRadius * Math.sin(midAngle)

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${Math.round(item.value)}%`, labelX, labelY)

      startAngle += sliceAngle
    })

    // Añadir leyenda
    const legendY = height - 20
    let legendX = 10
    data.forEach((item) => {
      // Cuadrado de color
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, legendY - 8, 10, 10)

      // Texto
      ctx.fillStyle = "#111827"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(item.name, legendX + 15, legendY - 2)

      legendX += ctx.measureText(item.name).width + 30
    })
  }, [])

  return (
    <div className="w-full h-[200px]">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

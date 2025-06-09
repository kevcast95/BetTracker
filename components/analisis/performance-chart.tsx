"use client"

import { useEffect, useRef } from "react"

export function PerformanceChart() {
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

    // Datos de ejemplo (balance acumulado por día)
    const data = [0, 15, 10, 35, 27, 19, 49, 69, 54, 46, 66, 78, 65, 85, 95]
    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)
    const range = Math.max(Math.abs(maxValue), Math.abs(minValue))

    // Dibujar ejes
    ctx.strokeStyle = "#e5e7eb"
    ctx.beginPath()
    ctx.moveTo(40, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, height - 20)
    ctx.stroke()

    // Dibujar línea de balance
    const pointWidth = (width - 60) / (data.length - 1)

    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.beginPath()

    data.forEach((value, index) => {
      const x = 40 + index * pointWidth
      const y = height / 2 - (value / range) * (height / 2 - 40)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Añadir punto
      ctx.fillStyle = value >= 0 ? "#10b981" : "#ef4444"
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()

      // Añadir etiqueta del día
      if (index % 2 === 0) {
        ctx.fillStyle = "#6b7280"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(`D${index + 1}`, x, height - 5)
      }
    })

    ctx.stroke()

    // Añadir etiquetas de valores
    const yLabels = [range, range / 2, 0, -range / 2, -range]
    yLabels.forEach((value, index) => {
      const y = 20 + (index * (height - 40)) / 4
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(`€${value.toFixed(0)}`, 35, y + 3)
    })

    // Añadir área bajo la curva
    ctx.beginPath()
    ctx.moveTo(40, height / 2)

    data.forEach((value, index) => {
      const x = 40 + index * pointWidth
      const y = height / 2 - (value / range) * (height / 2 - 40)
      ctx.lineTo(x, y)
    })

    ctx.lineTo(40 + (data.length - 1) * pointWidth, height / 2)
    ctx.closePath()
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
    ctx.fill()
  }, [])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

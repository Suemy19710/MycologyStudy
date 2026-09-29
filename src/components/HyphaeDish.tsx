import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext'

// A petri dish with fungal threads (hyphae) that grow outward from the centre.
// Drawn on a canvas. Animates once on first load; redraws instantly on resize or theme change.

interface Segment {
  x1: number
  y1: number
  x2: number
  y2: number
  step: number
  width: number
}
interface Spore {
  x: number
  y: number
  step: number
}

export default function HyphaeDish() {
  const { t } = useLang()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let hasAnimated = false
    let frameId = 0
    let lastWidth = 0

    function draw() {
      if (!canvas) return
      cancelAnimationFrame(frameId)
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      lastWidth = rect.width
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.scale(dpr, dpr)

      const styles = getComputedStyle(document.documentElement)
      const threadColour = styles.getPropertyValue('--accent').trim()
      const sporeColour = styles.getPropertyValue('--amber').trim()

      const W = rect.width
      const H = rect.height
      const cx = W / 2
      const cy = H / 2
      const radius = W * 0.4
      const stepLength = Math.max(1.4, W / 150)

      // Seeded random numbers so the drawing looks the same every time.
      let seed = 7
      const rnd = () => {
        seed = (seed * 16807) % 2147483647
        return seed / 2147483647
      }

      let tips = Array.from({ length: 9 }, (_, i) => ({
        x: cx,
        y: cy,
        angle: (i / 9) * Math.PI * 2 + rnd() * 0.3,
        age: 0,
      }))
      const segments: Segment[] = []
      const spores: Spore[] = []
      const totalSteps = 150

      for (let step = 0; step < totalSteps; step++) {
        const nextTips: typeof tips = []
        for (const t of tips) {
          const nx = t.x + Math.cos(t.angle) * stepLength
          const ny = t.y + Math.sin(t.angle) * stepLength
          if (Math.hypot(nx - cx, ny - cy) > radius) {
            spores.push({ x: t.x, y: t.y, step })
            continue
          }
          segments.push({ x1: t.x, y1: t.y, x2: nx, y2: ny, step, width: Math.max(0.5, 1.8 - step / 100) })
          const angle = t.angle + (rnd() - 0.5) * 0.35
          nextTips.push({ x: nx, y: ny, angle, age: t.age + 1 })
          // Occasionally branch.
          if (t.age > 10 && rnd() < 0.045 && nextTips.length < 260) {
            nextTips.push({ x: nx, y: ny, angle: angle + (rnd() < 0.5 ? -1 : 1) * (0.5 + rnd() * 0.5), age: 0 })
          }
        }
        tips = nextTips
      }
      for (const t of tips) spores.push({ x: t.x, y: t.y, step: totalSteps })

      const animate = !hasAnimated && !reduceMotion
      hasAnimated = true
      let frame = animate ? 0 : totalSteps + 2

      const paint = () => {
        ctx.clearRect(0, 0, W, H)
        ctx.lineCap = 'round'
        ctx.strokeStyle = threadColour
        ctx.globalAlpha = 0.75
        for (const s of segments) {
          if (s.step > frame) continue
          ctx.lineWidth = s.width
          ctx.beginPath()
          ctx.moveTo(s.x1, s.y1)
          ctx.lineTo(s.x2, s.y2)
          ctx.stroke()
        }
        ctx.fillStyle = sporeColour
        ctx.globalAlpha = 0.9
        for (const s of spores) {
          if (s.step > frame) continue
          ctx.beginPath()
          ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
        if (frame < totalSteps + 2) {
          frame += 2
          frameId = requestAnimationFrame(paint)
        }
      }
      paint()
    }

    draw()

    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (canvas.getBoundingClientRect().width !== lastWidth) draw()
      }, 200)
    }
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    window.addEventListener('resize', onResize)
    darkQuery.addEventListener('change', draw)

    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      darkQuery.removeEventListener('change', draw)
    }
  }, [])

  return (
    <div
      className="dish"
      role="img"
      aria-label={t({ en: 'Fungal threads growing across a petri dish', vi: 'Sợi nấm lan rộng trên đĩa petri' })}
    >
      <canvas ref={canvasRef} />
      <span className="dish-label">{t({ en: 'day 3 · 25 °C · malt agar', vi: 'ngày 3 · 25 °C · thạch mạch nha' })}</span>
    </div>
  )
}

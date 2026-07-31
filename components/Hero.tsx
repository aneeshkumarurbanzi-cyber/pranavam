'use client'
import { useEffect, useRef } from 'react'
import { T, Lang } from '@/lib/data'

type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'products'
  | 'travel'
  | 'gallery'
  | 'community'
  | 'school'
  | 'contact'

interface HeroProps {
  lang: Lang
  go: (page: Page) => void
}

export default function Hero({ lang, go }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const heroCRef = useRef<HTMLDivElement>(null)
  const t = T[lang]

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const mouse = { x: null as number | null, y: null as number | null, radius: 140 }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse.x = null; mouse.y = null }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const cols = ['#ffd700', '#d4af37', '#ff8c42', '#ff6b35', '#f5e6c8']
    const pts = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.6,
      vy: -(Math.random() * 0.45 + 0.15),
      vx: (Math.random() - 0.5) * 0.22,
      a: Math.random() * 0.8 + 0.2,
      ad: Math.random() > 0.5 ? 1 : -1,
      as: Math.random() * 0.005 + 0.002,
      c: cols[Math.floor(Math.random() * cols.length)]
    }))

    const sparks: Array<{x:number;y:number;vx:number;vy:number;r:number;life:number;c:string}> = []

    let rafId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Constellation lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 75) {
            ctx.save()
            ctx.globalAlpha = (1 - dist / 75) * 0.15
            ctx.strokeStyle = '#d4af37'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      // Embers
      pts.forEach(p => {
        p.y += p.vy
        p.x += p.vx
        p.a += p.ad * p.as
        if (p.a >= 1 || p.a <= 0.1) p.ad *= -1
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius
            const angle = Math.atan2(dy, dx)
            p.x += Math.cos(angle) * force * 2.2
            p.y += Math.sin(angle) * force * 2.2
          }
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, p.a) * 0.85
        ctx.shadowBlur = 10
        ctx.shadowColor = p.c
        ctx.fillStyle = p.c
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.life -= 0.025
        if (s.life <= 0) { sparks.splice(i, 1); continue }
        ctx.save()
        ctx.globalAlpha = s.life
        ctx.shadowBlur = 12
        ctx.shadowColor = s.c
        ctx.fillStyle = s.c
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      rafId = requestAnimationFrame(draw)
    }
    draw()

    const onCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 4 + 1.5
        sparks.push({ x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: Math.random() * 2.5 + 1, life: 1.0, c: cols[Math.floor(Math.random() * cols.length)] })
      }
      pts.forEach(p => {
        const dx = p.x - cx
        const dy = p.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 220) {
          const force = (220 - dist) / 220
          const angle = Math.atan2(dy, dx)
          p.x += Math.cos(angle) * force * 40
          p.y += Math.sin(angle) * force * 40
        }
      })
    }
    canvas.addEventListener('click', onCanvasClick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('click', onCanvasClick)
    }
  }, [])

  // Parallax effect
  useEffect(() => {
    const heroSection = document.getElementById('home')
    const bg = bgRef.current
    const heroC = heroCRef.current
    if (!heroSection || !bg) return

    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0
    let heroCX = 0, heroCY = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect()
      const normX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const normY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
      targetX = -normX * 26
      targetY = -normY * 26
    }
    const onMouseLeave = () => { targetX = 0; targetY = 0 }

    heroSection.addEventListener('mousemove', onMouseMove, { passive: true })
    heroSection.addEventListener('mouseleave', onMouseLeave)

    const renderParallax = () => {
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05
      bg.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) scale(1.06)`
      if (heroC) {
        heroCX += (-targetX * 0.22 - heroCX) * 0.05
        heroCY += (-targetY * 0.22 - heroCY) * 0.05
        heroC.style.transform = `translate3d(${heroCX.toFixed(2)}px, ${heroCY.toFixed(2)}px, 0)`
      }
      rafId = requestAnimationFrame(renderParallax)
    }
    renderParallax()

    return () => {
      heroSection.removeEventListener('mousemove', onMouseMove)
      heroSection.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="hero" id="home">
      <div className="pooja-hall-bg" id="pooja-hall-bg" ref={bgRef}></div>
      <div className="hero-vid"></div>
      <div className="hero-ovl"></div>
      <canvas id="pc" ref={canvasRef}></canvas>
      <div className="om">ॐ</div>

      <div className="hero-c" ref={heroCRef}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <div className="diya-lamp" title="Diya Lamp">
            <span className="diya-base"></span>
            <span className="diya-flame"></span>
          </div>
          <span className="eyebrow" style={{ marginBottom: 0 }}>{t.hero.ey}</span>
          <div className="diya-lamp" title="Diya Lamp">
            <span className="diya-base"></span>
            <span className="diya-flame"></span>
          </div>
        </div>
        <h1 className="hero-title">
          <span className="ln">{t.hero.t[0]}</span>
          <span className="ln">{t.hero.t[1]}</span>
          <span className="ln">{t.hero.t[2]}</span>
        </h1>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-ctas">
          <button className="btn b-pri" onClick={() => go('contact')}>{t.hero.ct1}</button>
          <button className="btn b-out" onClick={() => go('services')}>{t.hero.ct2}</button>
        </div>
      </div>
      <div className="hscroll">{t.hero.sc}</div>
    </section>
  )
}

'use client'
import { useEffect } from 'react'

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = document.getElementById('cursor-dot')
    const aura = document.getElementById('cursor-aura')
    if (!dot || !aura) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let auraX = mouseX
    let auraY = mouseY
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    const renderAura = () => {
      auraX += (mouseX - auraX) * 0.16
      auraY += (mouseY - auraY) * 0.16
      aura.style.left = auraX + 'px'
      aura.style.top = auraY + 'px'
      rafId = requestAnimationFrame(renderAura)
    }
    renderAura()

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const hoverEls = document.querySelectorAll('a, button, .sv-c, .gal-card, .news-card, .ts-c, .diya-lamp, input, select, textarea')
    const addHover = () => document.body.classList.add('cursor-hover')
    const removeHover = () => document.body.classList.remove('cursor-hover')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  return (
    <>
      <div id="cursor-dot"></div>
      <div id="cursor-aura"></div>
    </>
  )
}

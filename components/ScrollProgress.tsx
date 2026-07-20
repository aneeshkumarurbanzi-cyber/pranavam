'use client'
import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      const progEl = document.getElementById('scroll-progress')
      if (progEl) progEl.style.width = progressPercent + '%'

      const btt = document.getElementById('back-to-top')
      if (btt) {
        if (scrollTop > 400) btt.classList.add('show')
        else btt.classList.remove('show')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}

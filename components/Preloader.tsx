'use client'
import { useEffect, useRef } from 'react'
import { T, Lang } from '@/lib/data'

export default function Preloader({ lang }: { lang: Lang }) {
  const percentRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const preloaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textArray = T[lang].preloader as readonly string[]
    let count = 0

    const updateProgressUI = (val: number) => {
      if (percentRef.current) percentRef.current.textContent = val + '%'
      if (barRef.current) barRef.current.style.width = val + '%'
      if (statusRef.current) {
        const statusIdx = Math.min(Math.floor((val / 100) * textArray.length), textArray.length - 1)
        statusRef.current.textContent = textArray[statusIdx]
      }
    }

    const timer = setInterval(() => {
      if (count < 88) {
        count += Math.floor(Math.random() * 4) + 1
        if (count > 88) count = 88
        updateProgressUI(count)
      }
    }, 70)

    const onLoad = () => {
      clearInterval(timer)
      let finishCount = count
      const finishTimer = setInterval(() => {
        if (finishCount < 100) {
          finishCount += 5
          if (finishCount > 100) finishCount = 100
          updateProgressUI(finishCount)
        } else {
          clearInterval(finishTimer)
          setTimeout(() => {
            if (preloaderRef.current) {
              preloaderRef.current.classList.add('fade-out')
            }
          }, 300)
        }
      }, 20)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad)
    }

    return () => {
      clearInterval(timer)
      window.removeEventListener('load', onLoad)
    }
  }, [lang])

  return (
    <div id="preloader" ref={preloaderRef}>
      <div className="preloader-curtain left"></div>
      <div className="preloader-curtain right"></div>
      <div className="loader-container">
        <div className="mandala-wrapper">
          <div className="mandala-glow-ring"></div>
          <svg className="mandala-svg-outer" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" strokeDasharray="3 1.5" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="url(#goldGrad)" strokeWidth="0.75" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
            <path d="M50 6 L55 24 L74 18 L61 34 L79 42 L61 50 L79 58 L61 66 L74 82 L55 76 L50 94 L45 76 L26 82 L39 66 L21 58 L39 50 L21 42 L39 34 L26 18 L45 24 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="0.75" />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#aa7c11" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="mandala-svg-inner" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g stroke="url(#saffronGrad)" strokeWidth="0.6" fill="none">
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(30 50 50)"/>
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(60 50 50)"/>
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(90 50 50)"/>
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(120 50 50)"/>
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(150 50 50)"/>
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(180 50 50)"/>
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(210 50 50)"/>
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(240 50 50)"/>
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(270 50 50)"/>
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(300 50 50)"/>
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(330 50 50)"/>
              <path d="M50 18 C53 28 47 28 50 18 Z" transform="rotate(360 50 50)"/>
            </g>
            <circle cx="50" cy="50" r="22" fill="none" stroke="url(#saffronGrad)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="14" fill="none" stroke="url(#saffronGrad)" strokeWidth="0.5" strokeDasharray="1 1" />
            <defs>
              <linearGradient id="saffronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A227" />
                <stop offset="50%" stopColor="#C45B1A" />
                <stop offset="100%" stopColor="#7B1E2E" />
              </linearGradient>
            </defs>
          </svg>
          <div className="om-symbol">ॐ</div>
        </div>
        <div className="loader-percentage" ref={percentRef}>0%</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar-fill" ref={barRef}></div>
        </div>
        <div className="loader-status" ref={statusRef}>Aligning with the Cosmos...</div>
      </div>
    </div>
  )
}

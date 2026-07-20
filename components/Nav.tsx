'use client'
import { useEffect, useState } from 'react'
import { T, Lang } from '@/lib/data'

type Page = 'home' | 'about' | 'services' | 'travel' | 'gallery' | 'community' | 'school' | 'contact'

interface NavProps {
  lang: Lang
  currentPage: Page
  go: (page: Page) => void
  toggleLang: () => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  openPaypalModal: (service: string, amount: number) => void
}

export default function Nav({ lang, currentPage, go, toggleLang, menuOpen, setMenuOpen, openPaypalModal }: NavProps) {
  const [solid, setSolid] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const t = T[lang]

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const toggleAudio = () => setAudioPlaying(p => !p)

  const pages: Page[] = ['home', 'about', 'services', 'travel', 'gallery', 'community', 'school', 'contact']

  return (
    <nav id="nav" className={solid ? 'solid' : ''}>
      <a className="logo" onClick={() => go('home')} style={{ cursor: 'pointer' }}>
        <span>{t.nav.home === 'Home' ? 'Kerala Rituals · Vedic Jyotish' : 'Ритуалы Кералы · Ведическая Джйотиш'}</span>
        Gourishankaram
      </a>
      <div className="nav-links">
        {pages.map(page => (
          <a
            key={page}
            onClick={() => go(page)}
            className={currentPage === page ? 'nav-active' : ''}
          >
            {t.nav[page as keyof typeof t.nav]}
          </a>
        ))}
      </div>
      <div className="nav-r">
        <button
          className={`audio-btn${audioPlaying ? ' playing' : ''}`}
          onClick={toggleAudio}
          title="Toggle ambient sacred sound"
        >
          <span className="audio-pulse-dot"></span>
          <span id="audio-btn-txt">{audioPlaying ? 'Sound On' : 'Sound Off'}</span>
        </button>
        <button className="lang-btn" onClick={toggleLang}>{t.lang}</button>
        <button className="book-btn" onClick={() => openPaypalModal('Pooja & Homam', 108)}>
          {t.nav.book}
        </button>
        <button
          className={`ham${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          id="ham"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

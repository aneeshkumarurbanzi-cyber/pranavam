'use client'
import { T, Lang } from '@/lib/data'

type Page = 'home' | 'about' | 'services' | 'travel' | 'gallery' | 'community' | 'school' | 'contact'

interface MobileMenuProps {
  lang: Lang
  go: (page: Page) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  openPaypalModal: (service: string, amount: number) => void
}

export default function MobileMenu({ lang, go, menuOpen, setMenuOpen, openPaypalModal }: MobileMenuProps) {
  const t = T[lang]
  const pages: Page[] = ['home', 'about', 'services', 'travel', 'gallery', 'community', 'school', 'contact']

  const handleNav = (page: Page) => {
    go(page)
    setMenuOpen(false)
  }

  const handleBook = () => {
    openPaypalModal('Pooja & Homam', 108)
    setMenuOpen(false)
  }

  return (
    <div className={`mmenu${menuOpen ? ' open' : ''}`} id="mmenu">
      {pages.map(page => (
        <a key={page} onClick={() => handleNav(page)}>
          {t.nav[page as keyof typeof t.nav]}
        </a>
      ))}
      <button className="btn b-pri" onClick={handleBook}>{t.nav.book}</button>
    </div>
  )
}

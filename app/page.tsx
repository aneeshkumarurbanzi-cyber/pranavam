'use client'
import { useState, useEffect } from 'react'
import { Lang } from '@/lib/data'
import Preloader from '@/components/Preloader'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import Nav from '@/components/Nav'
import MobileMenu from '@/components/MobileMenu'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import ProductsPage from '@/components/pages/ProductsPage'
import Travel from '@/components/Travel'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import BackToTop from '@/components/BackToTop'
import PaypalModal from '@/components/PaypalModal'
import Lightbox from '@/components/Lightbox'
import AboutPage from '@/components/pages/AboutPage'
import ServicesPage from '@/components/pages/ServicesPage'
import TravelPage from '@/components/pages/TravelPage'
import GalleryPage from '@/components/pages/GalleryPage'
import CommunityPage from '@/components/pages/CommunityPage'
import SchoolPage from '@/components/pages/SchoolPage'
import ContactPage from '@/components/pages/ContactPage'

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

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [paypalModal, setPaypalModal] = useState<{ service: string; amount: number } | null>(null)
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null)

  const go = (page: Page) => {
    setCurrentPage(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleLang = () => setLang(l => l === 'en' ? 'ru' : 'en')

  // Intersection Observer for scroll reveals + tilt + specular + magnetic buttons
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
        }
      })
    }, { threshold: 0.1 })

    const elements = document.querySelectorAll('.rv, .rvl, .rvr')
    elements.forEach(el => obs.observe(el))

    return () => obs.disconnect()
  }, [currentPage])

  // Tilt effect for cards
  useEffect(() => {
    const grids = document.querySelectorAll('.sv-g, .news-grid, .gal-grid, .comm-layout')
    const handlers: Array<{ el: Element; move: EventListener; leave: EventListener }> = []

    grids.forEach(grid => {
      const move = (e: Event) => {
        const me = e as MouseEvent
        const card = (me.target as Element).closest('.sv-c, .gal-card, .news-card') as HTMLElement | null
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = me.clientX - rect.left
        const y = me.clientY - rect.top
        const w = rect.width
        const h = rect.height
        const rx = ((y - h / 2) / (h / 2)) * -5
        const ry = ((x - w / 2) / (w / 2)) * 5
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
      }
      const leave = (e: Event) => {
        const me = e as MouseEvent
        const card = (me.target as Element).closest('.sv-c, .gal-card, .news-card') as HTMLElement | null
        if (!card) return
        card.style.transform = ''
      }
      grid.addEventListener('mousemove', move)
      grid.addEventListener('mouseleave', leave, true)
      handlers.push({ el: grid, move, leave })
    })

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave, true)
      })
    }
  }, [currentPage])

  // Specular reflection for cards
  useEffect(() => {
    const cards = document.querySelectorAll('.sv-c, .gal-card, .news-card, .ts-c')
    const handlers: Array<{ el: Element; fn: EventListener }> = []

    cards.forEach(card => {
      const fn = (e: Event) => {
        const me = e as MouseEvent
        const rect = (card as HTMLElement).getBoundingClientRect()
        const x = ((me.clientX - rect.left) / rect.width) * 100
        const y = ((me.clientY - rect.top) / rect.height) * 100
        ;(card as HTMLElement).style.setProperty('--mx', `${x}%`)
        ;(card as HTMLElement).style.setProperty('--my', `${y}%`)
      }
      card.addEventListener('mousemove', fn)
      handlers.push({ el: card, fn })
    })

    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener('mousemove', fn))
    }
  }, [currentPage])

  // Magnetic buttons
  useEffect(() => {
    const btns = document.querySelectorAll<HTMLElement>('.book-btn, .btn.b-pri, .lang-btn, .audio-btn')
    const handlers: Array<{ el: HTMLElement; move: EventListener; leave: EventListener }> = []

    btns.forEach(btn => {
      const move = (e: Event) => {
        const me = e as MouseEvent
        const rect = btn.getBoundingClientRect()
        const x = me.clientX - rect.left - rect.width / 2
        const y = me.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`
      }
      const leave = () => { btn.style.transform = 'translate(0px, 0px)' }
      btn.addEventListener('mousemove', move)
      btn.addEventListener('mouseleave', leave)
      handlers.push({ el: btn, move, leave })
    })

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [currentPage])

  return (
    <>
      <Preloader lang={lang} />
      <CustomCursor />
      <ScrollProgress />
      <div id="scroll-progress" />
      <Nav
        lang={lang}
        currentPage={currentPage}
        go={go}
        toggleLang={toggleLang}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        openPaypalModal={(s, a) => setPaypalModal({ service: s, amount: a })}
      />
      <MobileMenu
        lang={lang}
        go={go}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        openPaypalModal={(s, a) => setPaypalModal({ service: s, amount: a })}
      />

      {/* Home page */}
      <div className={`page-container${currentPage === 'home' ? ' active' : ''}`} id="page-home">
        <Hero lang={lang} go={go} />
        <div className="gd" />
        <About lang={lang} />
        <div className="gd" />
        <Services lang={lang} go={go} openPaypalModal={(s, a) => setPaypalModal({ service: s, amount: a })} />
        <div className="gd" />
        <Travel lang={lang} go={go} />
        <div className="gd" />
        <Testimonials lang={lang} />
        <div className="gd" />
        <Contact lang={lang} />
        
      </div>

      {/* Detail pages */}
      <div className={`page-container${currentPage === 'about' ? ' active' : ''}`} id="page-about">
        <AboutPage lang={lang} />
      </div>
      <div className={`page-container${currentPage === 'services' ? ' active' : ''}`} id="page-services">
        <ServicesPage lang={lang} openPaypalModal={(s, a) => setPaypalModal({ service: s, amount: a })} />
      </div>
      <div
  className={`page-container${currentPage === 'products' ? ' active' : ''}`}
  id="page-products"
>
  <ProductsPage />
</div>
      <div className={`page-container${currentPage === 'travel' ? ' active' : ''}`} id="page-travel">
        <TravelPage lang={lang} go={go} openPaypalModal={(s, a) => setPaypalModal({ service: s, amount: a })} />
      </div>
      <div className={`page-container${currentPage === 'gallery' ? ' active' : ''}`} id="page-gallery">
        <GalleryPage lang={lang} openLightbox={(i) => setLightbox({ index: i })} />
      </div>
      <div className={`page-container${currentPage === 'community' ? ' active' : ''}`} id="page-community">
        <CommunityPage lang={lang} />
      </div>
      <div className={`page-container${currentPage === 'school' ? ' active' : ''}`} id="page-school">
        <SchoolPage lang={lang} />
      </div>
      <div className={`page-container${currentPage === 'contact' ? ' active' : ''}`} id="page-contact">
        <ContactPage lang={lang} />
      </div>

      <Footer lang={lang} go={go} />
      <FloatingButtons />
      <BackToTop />

      {paypalModal && (
        <PaypalModal
          lang={lang}
          service={paypalModal.service}
          amount={paypalModal.amount}
          onClose={() => setPaypalModal(null)}
        />
      )}
      {lightbox && (
        <Lightbox
          lang={lang}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}

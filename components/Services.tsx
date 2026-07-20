'use client'
import { T, Lang } from '@/lib/data'

type Page = 'home' | 'about' | 'services' | 'travel' | 'gallery' | 'community' | 'school' | 'contact'

interface ServicesProps {
  lang: Lang
  go: (page: Page) => void
  openPaypalModal: (service: string, amount: number) => void
}

export default function Services({ lang, go, openPaypalModal }: ServicesProps) {
  const t = T[lang]
  const items = (t.services.items as ReadonlyArray<{ ic: string; nm: string; tg: string; ds: string; price: number }>).slice(0, 6)

  return (
    <section className="sec" id="services">
      <div className="s-bg">
        <img src="https://images.unsplash.com/photo-1697729444936-8c6a6f643312?w=1920&h=1080&fit=crop&q=85" alt="" aria-hidden="true" loading="lazy" />
      </div>
      <div className="inn">
        <div className="sh rv" id="sv-head">
          <span className="eyebrow">{t.services.ey}</span>
          <h2 className="st">{t.services.tl}</h2>
          <p className="ss">{t.services.sub}</p>
        </div>
        <div className="sv-g" id="sv-grid">
          {items.map((s, i) => (
            <div key={i} className="sv-c rv in" onClick={() => go('services')}>
              <span className="sv-ic">{s.ic}</span>
              <div className="sv-tag">{s.tg}</div>
              <div className="sv-nm">{s.nm}</div>
              <div className="sv-ds">{s.ds}</div>
              <span className="sv-ct" onClick={e => { e.stopPropagation(); go('services') }}>{t.services.cta} →</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button className="btn b-pri" onClick={() => go('services')}>
            {lang === 'en' ? 'View All 16 Rituals →' : 'Смотреть все 16 ритуалов →'}
          </button>
        </div>
      </div>
    </section>
  )
}

'use client'
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

interface TravelProps {
  lang: Lang
  go: (page: Page) => void
}

export default function Travel({ lang, go }: TravelProps) {
  const t = T[lang]
  const dest = t.travel.dest as readonly string[]

  return (
    <section className="sec dk2-s" id="travel">
      <div className="s-bg">
        <img src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&h=1080&fit=crop&q=85" alt="" aria-hidden="true" loading="lazy" />
      </div>
      <div className="inn">
        <div className="tr-g">
          <div className="rvl" id="tr-l">
            <span className="eyebrow">{t.travel.ey}</span>
            <h2 className="st" style={{ textAlign: 'left' }}>{t.travel.tl}</h2>
            <p style={{ color: 'var(--crd)', fontSize: '1.02rem', marginBottom: '0.8rem', fontWeight: 300 }}>{t.travel.sub}</p>
            <div className="dest-wrap" id="dest-wrap">
              {dest.map((d, i) => (
                <span key={i} className="dt">{d}</span>
              ))}
            </div>
            <button className="btn b-go" onClick={() => go('contact')}>{t.travel.cta}</button>
          </div>
          <div className="rvr" id="tr-r" style={{ transitionDelay: '.2s' }}>
            <div className="tr-frame">
              <img
                className="tr-image"
                src="/pranavam_images/keralatravel.png"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1625807161536-27903f2200fa?w=800&h=600&fit=crop&q=85' }}
                alt="Sacred Temples of Kerala"
              />
              <div className="tr-overlay">{t.travel.lbl}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'
import { T, Lang } from '@/lib/data'

type Page = 'home' | 'about' | 'services' | 'travel' | 'gallery' | 'community' | 'school' | 'contact'

interface TravelPageProps {
  lang: Lang
  go: (page: Page) => void
  openPaypalModal: (service: string, amount: number) => void
}

const TOUR_FALLBACKS = [
  '1625807161536-27903f2200fa','1582510003544-4d00b7f74220','1619239632374-9e6651c2b7bb',
  '1697730420879-dc2a8dbaa31f','1578326526526-fd998049d297'
]

export default function TravelPage({ lang, go, openPaypalModal }: TravelPageProps) {
  const t = T[lang]
  const dt = t.detTravel
  const items = dt.items as ReadonlyArray<{ nm: string; ds: string; duration: string; price: string; amt: number }>

  return (
    <section className="sec dk2-s">
      <div className="inn">
        <div className="sh rv">
          <span className="eyebrow">{dt.ey}</span>
          <h2 className="st">{dt.tl}</h2>
          <p className="ss">{dt.sub}</p>
        </div>
        <div className="page-banner rv">
          <img
            src="/pranavam_images/travel_banner.png"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1641666017842-f94246ef2961?w=1200&h=400&fit=crop&q=85' }}
            alt="Kerala Pilgrimage Banner"
          />
        </div>
        <div className="news-grid" style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
          {items.map((tour, idx) => (
            <div key={idx} className="news-card rv in flex-card">
              <div className="card-img-wrap">
                <img
                  className="card-img"
                  src={`/pranavam_images/tour_${idx + 1}.png`}
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-${TOUR_FALLBACKS[idx % TOUR_FALLBACKS.length]}?w=400&h=250&fit=crop&q=85` }}
                  alt={tour.nm}
                />
              </div>
              <div className="card-body-content">
                <div className="news-meta">
                  <span className="news-date">{tour.duration}</span>
                </div>
                <h3 style={{ margin: '0.5rem 0' }}>{tour.nm}</h3>
                <p style={{ marginBottom: '1rem' }}>{tour.ds}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--cx)', color: 'var(--gb)', fontWeight: 700 }}>{tour.price}</span>
                  <button className="btn b-pri" onClick={() => openPaypalModal(`${tour.nm} Booking Deposit`, tour.amt)}>
                    {t.services.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sch-form-wrap" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <h3>{dt.formTl}</h3>
          <p>{dt.formSub}</p>
          <button className="btn b-pri" onClick={() => go('contact')}>{dt.formBtn}</button>
        </div>
      </div>
    </section>
  )
}

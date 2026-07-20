'use client'
import { T, Lang } from '@/lib/data'

interface TestimonialsProps {
  lang: Lang
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const t = T[lang]
  const items = t.testimonials.items as ReadonlyArray<{ nm: string; lc: string; tx: string }>

  return (
    <section className="sec" id="testimonials">
      <div className="s-bg">
        <img src="https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?w=1920&h=1080&fit=crop&q=85" alt="" aria-hidden="true" loading="lazy" />
      </div>
      <div className="inn">
        <div className="sh rv" id="ts-head">
          <span className="eyebrow">{t.testimonials.ey}</span>
          <h2 className="st">{t.testimonials.tl}</h2>
        </div>
        <div className="ts-g" id="ts-grid">
          {items.map((item, i) => (
            <div key={i} className="ts-c rv in">
              <div className="ts-stars">★★★★★</div>
              <p className="ts-txt">&ldquo;{item.tx}&rdquo;</p>
              <div className="ts-nm">{item.nm}</div>
              <div className="ts-lc">{item.lc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

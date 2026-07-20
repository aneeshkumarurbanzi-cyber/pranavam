'use client'
import { useState } from 'react'
import { T, Lang } from '@/lib/data'

const LB_FALLBACKS = [
  '1675597056623-74d1e05dc3f0','1697729444936-8c6a6f643312','1582510003544-4d00b7f74220',
  '1617875216004-78f15839c578','1625807161536-27903f2200fa','1666694051761-cd972857da30',
  '1619239632374-9e6651c2b7bb','1605292356183-a77d0a9c9d1d','1633368516165-f7b04d6428d1',
  '1697730420879-dc2a8dbaa31f','1605302977545-3a09913be1dd','1578326526526-fd998049d297'
]

interface GalleryPageProps {
  lang: Lang
  openLightbox: (index: number) => void
}

type FilterCat = 'all' | 'temple' | 'ritual' | 'guruji'

export default function GalleryPage({ lang, openLightbox }: GalleryPageProps) {
  const [filter, setFilter] = useState<FilterCat>('all')
  const t = T[lang]
  const g = t.gallery
  const items = g.items as ReadonlyArray<{ title: string; cat: string; desc: string }>
  const cats = g.cats as { all: string; temple: string; ritual: string; guruji: string }

  const filterKeys: FilterCat[] = ['all', 'temple', 'ritual', 'guruji']

  return (
    <section className="sec">
      <div className="inn">
        <div className="sh rv">
          <span className="eyebrow">{g.ey}</span>
          <h2 className="st">{g.tl}</h2>
          <p className="ss">{g.sub}</p>
        </div>
        <div className="gal-filters">
          {filterKeys.map(cat => (
            <button
              key={cat}
              className={`gal-btn${filter === cat ? ' active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cats[cat]}
            </button>
          ))}
        </div>
        <div className="gal-grid">
          {items.map((item, idx) => {
            const isVisible = filter === 'all' || item.cat === filter
            if (!isVisible) return null
            return (
              <div key={idx} className="gal-card rv in" onClick={() => openLightbox(idx)}>
                <div className="gal-img-wrap">
                  <img
                    className="gal-img"
                    src={`/pranavam_images/gallery_${idx + 1}.png`}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-${LB_FALLBACKS[idx % LB_FALLBACKS.length]}?w=400&h=300&fit=crop&q=85` }}
                    alt={item.title}
                  />
                  <div className="gal-overlay">
                    <span className="gal-cat">{cats[item.cat as FilterCat]}</span>
                    <div className="gal-title">{item.title}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

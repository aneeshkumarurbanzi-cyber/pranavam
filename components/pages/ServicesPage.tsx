'use client'

import { useState } from 'react'
import Image from 'next/image'
import { T, Lang } from '@/lib/data'

interface ServicesPageProps {
  lang: Lang
  openPaypalModal: (service: string, amount: number) => void
}

type ServiceItem = {
  ic: string
  nm: string
  tg: string
  cat: string
  ds: string
  bts: readonly string[]
  price: number
}

export default function ServicesPage({ lang, openPaypalModal }: ServicesPageProps) {
  const t = T[lang]
  const ds = t.detServices
  const items = t.services.items as ReadonlyArray<ServiceItem>
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? items : items.filter(s => s.cat === filter)

  const tabs = [
    { key: 'all', label: ds.filterAll, count: items.length },
    { key: 'homam', label: ds.filterHomam, count: items.filter(s => s.cat === 'homam').length },
    { key: 'pooja', label: ds.filterPooja, count: items.filter(s => s.cat === 'pooja').length },
  ]

  return (
    <section className="sec">
      <div className="inn">
        <div className="sh rv">
          <span className="eyebrow">{ds.ey}</span>
          <h2 className="st">{ds.tl}</h2>
          <p className="ss">{ds.sub}</p>
        </div>

        {/* Category filter tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.6rem',
          marginBottom: '3rem',
          flexWrap: 'wrap',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.4rem',
                borderRadius: '2rem',
                border: `1.5px solid ${filter === tab.key ? 'var(--gb)' : 'rgba(154,123,30,0.25)'}`,
                background: filter === tab.key
                  ? 'linear-gradient(135deg, var(--gold) 0%, var(--gb) 100%)'
                  : 'rgba(255,255,255,0.6)',
                color: filter === tab.key ? '#fff' : 'var(--gold)',
                fontFamily: 'var(--cx)',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: filter === tab.key ? '0 4px 18px rgba(154,123,30,0.25)' : 'none',
              }}
            >
              {tab.label}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '1.3rem',
                height: '1.3rem',
                borderRadius: '50%',
                background: filter === tab.key ? 'rgba(255,255,255,0.25)' : 'rgba(154,123,30,0.12)',
                fontSize: '0.65rem',
                fontFamily: 'var(--lt)',
                fontWeight: 700,
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="sv-g" id="det-sv-grid">
          {filtered.map((s, i) => (
            <div key={`${filter}-${i}`} className="sv-c rv in" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
  className="sv-ic"
  style={{
    display: 'flex',
   
    marginBottom: '1rem',
  }}
>
  <Image
    src={s.ic}
    alt={s.nm}
    width={30}
    height={30}
    className="object-contain"
  />
</div>
              <div className="sv-tag">{s.tg}</div>
              <div className="sv-nm">{s.nm}</div>
              <div className="sv-ds" style={{ marginBottom: '0.75rem' }}>{s.ds}</div>

              {/* Benefit bullets */}
              <ul style={{
                margin: '0 0 auto',
                padding: '0',
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}>
                {s.bts.map((b, bi) => (
                  <li key={bi} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--crd)',
                    lineHeight: 1.55,
                  }}>
                    <span style={{ color: 'var(--gb)', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.6rem' }}>◆</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Price + Book */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(212,175,55,0.18)',
              }}>
               
                <button
                  className="btn b-pri"
                  style={{ padding: '0.45rem 1.2rem', fontSize: '0.75rem' }}
                  onClick={() => openPaypalModal(s.nm, s.price)}
                >
                  {ds.book}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'
import { T, Lang } from '@/lib/data'

interface CommunityPageProps {
  lang: Lang
}

const NEWS_FALLBACKS = [
  '1633368516165-f7b04d6428d1','1666694051761-cd972857da30','1697729444936-8c6a6f643312',
  '1605302977545-3a09913be1dd','1601220840366-d29aedc7e987'
]

export default function CommunityPage({ lang }: CommunityPageProps) {
  const t = T[lang]
  const com = t.community
  const news = com.news as ReadonlyArray<{ date: string; title: string; desc: string }>
  const calendar = com.calendar as ReadonlyArray<{ date: string; name: string; cat: string; desc: string }>

  return (
    <section className="sec dk-s">
      <div className="inn">
        <div className="sh rv">
          <span className="eyebrow">{com.ey}</span>
          <h2 className="st">{com.tl}</h2>
          <p className="ss">{com.sub}</p>
        </div>
        <div className="page-banner rv">
          <img
            src="/pranavam_images/community_banner.png"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1605378624981-f9c7d3bd8c23?w=1200&h=400&fit=crop&q=85' }}
            alt="Community Banner"
          />
        </div>
        <div className="comm-layout">
          <div className="news-grid">
            {news.map((post, idx) => (
              <div key={idx} className="news-card rv in flex-card">
                <div className="card-img-wrap">
                  <img
                    className="card-img"
                    src={`/pranavam_images/news_${idx + 1}.png`}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-${NEWS_FALLBACKS[idx % NEWS_FALLBACKS.length]}?w=400&h=250&fit=crop&q=85` }}
                    alt={post.title}
                  />
                </div>
                <div className="card-body-content">
                  <div className="news-meta">
                    <span className="news-date">{post.date}</span>
                    <span>•</span>
                    <span>Guruji Manish</span>
                  </div>
                  <h3 style={{ margin: '0.5rem 0' }}>{post.title}</h3>
                  <p style={{ marginBottom: '1rem' }}>{post.desc}</p>
                  <a className="news-read" href="https://t.me/pranavam_astro" target="_blank" rel="noopener noreferrer">
                    {com.readMore} →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="cal-sidebar">
            <div className="cal-title">
              <span>📅</span>
              <span>{com.calendarTitle}</span>
            </div>
            <div className="cal-list">
              {calendar.map((item, idx) => (
                <div key={idx} className={`cal-item ${item.cat}`}>
                  <div className="cal-item-date">{item.date}</div>
                  <div className="cal-item-name">{item.name}</div>
                  <div className="cal-item-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

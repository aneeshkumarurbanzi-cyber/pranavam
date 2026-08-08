'use client'
import { T, Lang } from '@/lib/data'

interface AboutPageProps {
  lang: Lang
}

type TimelineItem = { period: string; title: string; desc: string }
type Guru = { nm: string; role: string; desc: string }

export default function AboutPage({ lang }: AboutPageProps) {
  const t = T[lang]
  const da = t.detAbout
  const timeline = da.timeline as ReadonlyArray<TimelineItem>
  const gurus = da.gurus as ReadonlyArray<Guru>
  const credentials = da.credentials as ReadonlyArray<string>

  return (
    <section className="sec dk-s" style={{ paddingTop: '5rem' }}>
      <div className="inn">

        {/* ── Hero Header ── */}
        <div className="sh rv" style={{ marginBottom: '4rem' }}>
          <span className="eyebrow">{da.ey}</span>
          <h2 className="st">{da.tl}</h2>
          <p className="ss" style={{ maxWidth: '680px', margin: '0 auto' }}>{da.sub}</p>
        </div>

        {/* ── Intro: Photo + Text ── */}
        <div
  className="ab-intro-grid"
  style={{
    display: 'grid',
    gap: '3.5rem',
    alignItems: 'start',
    marginBottom: '5rem',
  }}
>
         <div className="ab-photo">
            <div className="ph-container" style={{ maxWidth: '320px', margin: '0 auto' }}>
              <div className="ph-frame">
                <img
                  className="ph-image"
                  src="/pranavam_images/gurujii.png"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1617875216004-78f15839c578?w=480&h=640&fit=crop&q=85' }}
                  alt="Guruji Maneesh Madhusoodanan Potti"
                />
                <div className="ph-label">{t.about.lbl}</div>
              </div>
              <div className="ph-border-decor ph-decor-tl" />
              <div className="ph-border-decor ph-decor-tr" />
              <div className="ph-border-decor ph-decor-bl" />
              <div className="ph-border-decor ph-decor-br" />
            </div>

            {/* Quick stats under photo */}
            <div style={{
              marginTop: '2rem',
             padding: 'clamp(.9rem,3vw,1.5rem)',
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '12px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              backdropFilter: 'blur(8px)',
            }}>
              {[
                { n: '20+', l: lang === 'en' ? 'Years Practice' : 'Лет практики' },
                { n: '1000+', l: lang === 'en' ? 'Rituals Done' : 'Ритуалов' },
                { n: '5', l: lang === 'en' ? 'Lineage Gurus' : 'Учителей' },
                { n: '12+', l: lang === 'en' ? 'Countries' : 'Стран' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--cx)', color: 'var(--gb)', fontSize: '1.4rem', fontWeight: 700 }}>{s.n}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--crd)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Biography text */}
          <div>
            <h3 style={{
              fontFamily: 'var(--cx)',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'var(--gold)',
              marginBottom: '1.75rem',
              letterSpacing: '0.04em',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(212,175,55,0.2)',
            }}>{da.bioTitle}</h3>
            {[da.p1, da.p2, da.p3, da.p4, da.p5, da.p6].map((p, i) => (
              <p key={i} style={{
                color: 'var(--crd)',
                fontSize: '0.975rem',
                lineHeight: 1.9,
                marginBottom: '1.4rem',
                fontWeight: 300,
              }}>{p}</p>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div style={{ marginBottom: '5rem' }}>
          <div className="sh rv" style={{ marginBottom: '2.5rem' }}>
            <h3 style={{
              fontFamily: 'var(--cx)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              color: 'var(--cr)',
              letterSpacing: '0.04em',
            }}>{da.timelineTitle}</h3>
          </div>
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            {/* vertical line */}
            <div style={{
              position: 'absolute',
              left: '0.45rem',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, var(--gb), rgba(201,162,39,0.1))',
            }} />
            {timeline.map((item, i) => (
              <div key={i} style={{
                position: 'relative',
                paddingLeft: '2rem',
                paddingBottom: i < timeline.length - 1 ? '2.5rem' : 0,
              }}>
                {/* dot */}
                <div style={{
                  position: 'absolute',
                  left: '-1.57rem',
                  top: '0.35rem',
                  width: '0.9rem',
                  height: '0.9rem',
                  borderRadius: '50%',
                  background: 'var(--gb)',
                  border: '2px solid var(--bk)',
                  boxShadow: '0 0 0 3px rgba(201,162,39,0.25)',
                }} />
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, var(--gold) 0%, var(--gb) 100%)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--cx)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.2rem 0.75rem',
                  borderRadius: '2rem',
                  marginBottom: '0.5rem',
                }}>{item.period}</div>
                <h4 style={{
                  fontFamily: 'var(--cx)',
                  color: 'var(--cr)',
                  fontSize: '1rem',
                  marginBottom: '0.4rem',
                  fontWeight: 600,
                }}>{item.title}</h4>
                <p style={{
                  color: 'var(--crd)',
                  fontSize: '0.875rem',
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Guru Parampara ── */}
        <div style={{ marginBottom: '5rem' }}>
          <div className="sh rv" style={{ marginBottom: '0.75rem' }}>
            <h3 style={{
              fontFamily: 'var(--cx)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              color: 'var(--cr)',
              letterSpacing: '0.04em',
            }}>{da.guruTitle}</h3>
          </div>
          <p style={{
            textAlign: 'center',
            color: 'var(--crd)',
            fontSize: '0.9rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8,
          }}>{da.guruSub}</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {gurus.map((g, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '12px',
                padding: '1.75rem',
                backdropFilter: 'blur(8px)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, var(--gold) ${i * 20}%, var(--gb) 100%)`,
                }} />
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(154,123,30,0.15) 0%, rgba(201,162,39,0.2) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  fontSize: '1rem',
                  fontFamily: 'var(--cx)',
                  color: 'var(--gb)',
                  fontWeight: 700,
                }}>{i + 1}</div>
                <div style={{ fontFamily: 'var(--cx)', fontSize: '1rem', color: 'var(--cr)', fontWeight: 700, marginBottom: '0.3rem' }}>{g.nm}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--saf)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.85rem' }}>{g.role}</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--crd)', lineHeight: 1.75, fontWeight: 300 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Credentials ── */}
        <div style={{
          background: 'rgba(28,21,18,0.04)',
          border: '1px solid rgba(212,175,55,0.18)',
          borderRadius: '16px',
          padding: 'clamp(2rem, 4vw, 3rem)',
          backdropFilter: 'blur(8px)',
        }}>
          <h3 style={{
            fontFamily: 'var(--cx)',
            color: 'var(--gb)',
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            marginBottom: '1.75rem',
            letterSpacing: '0.05em',
            textAlign: 'center',
          }}>{da.h4}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {credentials.map((c, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '0.85rem',
                alignItems: 'flex-start',
                padding: '1.1rem 1.25rem',
                background: 'rgba(255,255,255,0.6)',
                borderRadius: '10px',
                border: '1px solid rgba(212,175,55,0.12)',
              }}>
                <span style={{ color: 'var(--gb)', fontSize: '1rem', flexShrink: 0, marginTop: '0.1rem' }}>✦</span>
                <span style={{ color: 'var(--crd)', fontSize: '0.875rem', lineHeight: 1.7, fontWeight: 300 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

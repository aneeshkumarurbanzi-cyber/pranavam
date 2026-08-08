'use client'
import { useEffect, useRef } from 'react'
import { T, Lang } from '@/lib/data'

interface AboutProps {
  lang: Lang
}

export default function About({ lang }: AboutProps) {
  const t = T[lang]
  const countersRun = useRef(false)

  const runCounters = () => {
    if (countersRun.current) return
    countersRun.current = true
    const cfg = [
      { id: 's1', target: 20, suffix: '+' },
      { id: 's2', target: 1000, suffix: '+' },
      { id: 's3', target: 12, suffix: '' },
      { id: 's4', target: 98, suffix: '%' }
    ]
    cfg.forEach(({ id, target, suffix }) => {
      let v = 0
      const el = document.getElementById(id)
      if (!el) return
      const step = target / 50
      const tmr = setInterval(() => {
        v += step
        if (v >= target) { v = target; clearInterval(tmr) }
        el.textContent = Math.floor(v) + suffix
      }, 25)
    })
  }

  useEffect(() => {
    const abTxt = document.getElementById('ab-txt')
    if (!abTxt) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setTimeout(runCounters, 300)
      })
    }, { threshold: 0.1 })
    obs.observe(abTxt)
    return () => obs.disconnect()
  }, [])

  const sl = t.about.sl as readonly string[]

  return (
    <section className="sec dk-s" id="about">
      <div className="s-bg">
        <img src="https://images.unsplash.com/photo-1675597056623-74d1e05dc3f0?w=1920&h=1080&fit=crop&q=85" alt="" aria-hidden="true" loading="lazy" />
      </div>
      <div className="inn">
        <div className="ab-g">
          <div className="rvl" id="ab-txt">
            <span className="eyebrow">{t.about.ey}</span>
            <h2 className="st" style={{ textAlign: 'left', marginBottom: '1.4rem' }}>{t.about.tl}</h2>
            <p>{t.about.p1}</p>
           

            <div className="st-g">
              <div className="stt">
                <div className="stn" id="s1">0+</div>
                <div className="stl" id="sl1">{sl[0]}</div>
              </div>
              <div className="stt">
                <div className="stn" id="s2">0+</div>
                <div className="stl" id="sl2">{sl[1]}</div>
              </div>
              <div className="stt">
                <div className="stn" id="s3">0</div>
                <div className="stl" id="sl3">{sl[2]}</div>
              </div>
              <div className="stt">
                <div className="stn" id="s4">0%</div>
                <div className="stl" id="sl4">{sl[3]}</div>
              </div>
            </div>
          </div>

          <div className="rvr" id="ab-ph" style={{ transitionDelay: '.2s' }}>
            <div className="ph-container">
              <div className="ph-frame">
                <img
                  className="ph-image"
                  src="/pranavam_images/guruji.png"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1617875216004-78f15839c578?w=480&h=640&fit=crop&q=85' }}
                  alt="Guruji Manish Madhusoodanan"
                />
                <div className="ph-label">{t.about.lbl}</div>
              </div>
              <div className="ph-border-decor ph-decor-tl"></div>
              <div className="ph-border-decor ph-decor-tr"></div>
              <div className="ph-border-decor ph-decor-bl"></div>
              <div className="ph-border-decor ph-decor-br"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

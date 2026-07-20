'use client'
import { useEffect, useState } from 'react'
import { T, Lang } from '@/lib/data'

interface SchoolPageProps {
  lang: Lang
}

export default function SchoolPage({ lang }: SchoolPageProps) {
  const t = T[lang]
  const sch = t.school
  const [countdown, setCountdown] = useState({ d: '00', h: '00', m: '00', s: '00' })
  const [submitted, setSubmitted] = useState(false)

  const cdLabels = lang === 'en'
    ? { d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds' }
    : { d: 'Дней', h: 'Часов', m: 'Минут', s: 'Секунд' }

  useEffect(() => {
    const targetDate = new Date('December 31, 2026 00:00:00').getTime()
    const pad = (n: number) => n.toString().padStart(2, '0')

    const update = () => {
      const now = new Date().getTime()
      const diff = targetDate - now
      if (diff <= 0) return
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setCountdown({ d: pad(days), h: pad(hours), m: pad(minutes), s: pad(seconds) })
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="sec">
      <div className="inn">
        <div className="sch-hero rv">
          <span className="eyebrow">{sch.ey}</span>
          <h2 className="st">{sch.tl}</h2>
          <p>{sch.sub}</p>
        </div>
        <div className="count-wrap">
          <div className="count-box">
            <div className="count-num">{countdown.d}</div>
            <div className="count-lbl">{cdLabels.d}</div>
          </div>
          <div className="count-box">
            <div className="count-num">{countdown.h}</div>
            <div className="count-lbl">{cdLabels.h}</div>
          </div>
          <div className="count-box">
            <div className="count-num">{countdown.m}</div>
            <div className="count-lbl">{cdLabels.m}</div>
          </div>
          <div className="count-box">
            <div className="count-num">{countdown.s}</div>
            <div className="count-lbl">{cdLabels.s}</div>
          </div>
        </div>
        <div className="sch-form-wrap rv">
          <h3>{sch.formTl}</h3>
          <p>{sch.formDs}</p>
          {submitted ? (
            <div className="success-msg">{sch.success}</div>
          ) : (
            <form className="sch-group" onSubmit={handleSubmit}>
              <input type="email" placeholder={sch.emailPl} required />
              <button className="btn b-pri" type="submit">{sch.btn}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

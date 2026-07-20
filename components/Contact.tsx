'use client'
import { T, Lang } from '@/lib/data'

interface ContactProps {
  lang: Lang
}

export default function Contact({ lang }: ContactProps) {
  const t = T[lang]

  return (
    <section className="sec dk-s" id="contact">
      <div className="s-bg">
        <img src="https://images.unsplash.com/photo-1601220840366-d29aedc7e987?w=1920&h=1080&fit=crop&q=85" alt="" aria-hidden="true" loading="lazy" />
      </div>
      <div className="inn">
        <div className="sh rv" id="ct-head">
          <span className="eyebrow">{t.contact.ey}</span>
          <h2 className="st">{t.contact.tl}</h2>
          <p className="ss">{t.contact.sub}</p>
        </div>
        <div className="ct-g">
          <div className="ct-cards rvl" id="ct-cards">
            <div className="ct-cd">
              <div className="ct-tl">{t.contact.intl}</div>
              <div className="ct-ln">📍 Thrissur, Kerala, India 680001</div>
              <div className="ct-ln">📱 WhatsApp: +91 98765 43210</div>
              <div className="ct-ln">📧 info@pranavaastrology.com</div>
              <div className="ct-ln">🕐 9:00 AM – 7:00 PM IST</div>
            </div>
            <div className="ct-cd">
              <div className="ct-tl">{t.contact.rutl}</div>
              <div className="ct-ln">📍 Moscow, Russia</div>
              <div className="ct-ln">✈️ Telegram: @pranavam_astro</div>
              <div className="ct-ln">📱 WhatsApp: +7 999 123 4567</div>
              <div className="ct-ln">🕐 10:00 AM – 6:00 PM MSK</div>
            </div>
            <div className="ct-bs">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn b-pri">{t.contact.wa}</a>
              <a href="https://t.me/pranavam_astro" target="_blank" rel="noopener noreferrer" className="btn b-go">{t.contact.tg}</a>
            </div>
          </div>
          <div className="rvr" id="ct-form" style={{ transitionDelay: '.2s' }}>
            <div className="cf">
              <input type="text" placeholder={t.contact.nm} />
              <input type="email" placeholder={t.contact.em} />
              <select>
                <option value="">{t.contact.sv}</option>
                <option>Pooja &amp; Homam</option>
                <option>Tantram</option>
                <option>Dosha Pariharam</option>
                <option>Jyotish Consultation</option>
                <option>Vastu Shastram</option>
                <option>Raksha &amp; Elass</option>
                <option>Kerala Sacred Travel</option>
              </select>
              <textarea placeholder={t.contact.mg}></textarea>
              <button className="btn b-pri" style={{ width: '100%' }}>{t.contact.sd}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

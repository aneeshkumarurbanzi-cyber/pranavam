'use client'

import { T, Lang } from '@/lib/data'

interface ContactPageProps {
  lang: Lang
}

export default function ContactPage({ lang }: ContactPageProps) {
  const t = T[lang]

  return (
    <section className="sec dk-s">
      <div className="inn">

        <div className="sh rv">
          <span className="eyebrow">{t.contact.ey}</span>
          <h2 className="st">{t.contact.tl}</h2>
          <p className="ss">{t.contact.sub}</p>
        </div>

        <div className="ct-g">

          {/* Contact Cards */}

          <div className="ct-cards rv in">

            {/* India */}

            <div className="ct-cd">
              <div className="ct-tl">{t.contact.intl}</div>

              <div className="ct-ln">
                📍 {t.contact.indiaAddress}
              </div>

              <div className="ct-ln">
                📱 {t.contact.whatsapp}: +91 98765 43210
              </div>

              <div className="ct-ln">
                📧 {t.contact.email}: info@pranavaastrology.com
              </div>

              <div className="ct-ln">
                🕐 9:00 AM – 7:00 PM {t.contact.ist}
              </div>
            </div>

            {/* Russia */}

            <div className="ct-cd">
              <div className="ct-tl">{t.contact.rutl}</div>

              <div className="ct-ln">
                📍 {t.contact.russiaAddress}
              </div>

              <div className="ct-ln">
                ✈️ {t.contact.telegram}: @pranavam_astro
              </div>

              <div className="ct-ln">
                📱 {t.contact.whatsapp}: +7 999 123 4567
              </div>

              <div className="ct-ln">
                🕐 10:00 AM – 6:00 PM {t.contact.msk}
              </div>
            </div>

            {/* Buttons */}

            <div className="ct-bs">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn b-pri"
              >
                {t.contact.wa}
              </a>

              <a
                href="https://t.me/pranavam_astro"
                target="_blank"
                rel="noopener noreferrer"
                className="btn b-go"
              >
                {t.contact.tg}
              </a>
            </div>

          </div>

          {/* Contact Form */}

          <div className="rv in">

            <div className="cf">

              <input
                type="text"
                placeholder={t.contact.nm}
              />

              <input
                type="email"
                placeholder={t.contact.em}
              />

              <select>
                <option value="">
                  {t.contact.sv}
                </option>

                <option>{t.contact.service1}</option>
                <option>{t.contact.service2}</option>
                <option>{t.contact.service3}</option>
                <option>{t.contact.service4}</option>
                <option>{t.contact.service5}</option>
                <option>{t.contact.service6}</option>
                <option>{t.contact.service7}</option>
              </select>

              <textarea
                placeholder={t.contact.mg}
              />

              <button
                className="btn b-pri"
                style={{ width: '100%' }}
              >
                {t.contact.sd}
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
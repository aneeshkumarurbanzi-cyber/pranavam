'use client'

import { T, Lang } from '@/lib/data'

type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'products'
  | 'travel'
  | 'gallery'
  | 'community'
  | 'school'
  | 'contact'

interface FooterProps {
  lang: Lang
  go: (page: Page) => void
}

export default function Footer({ lang, go }: FooterProps) {
  const t = T[lang]

  return (
    <footer>
      <div className="ft-in">

        <div className="ft-div"></div>

        <div className="ft-t">

          {/* Logo */}

          <div>
            <div className="ft-lg">{t.footer.logo}</div>
            <p className="ft-tg">{t.footer.tag}</p>
          </div>

          {/* Services */}

          <div>

            <div className="ftct">{t.footer.sv}</div>

            <a className="ftlk" onClick={() => go('services')}>
              {t.footer.service1}
            </a>

            <a className="ftlk" onClick={() => go('services')}>
              {t.footer.service2}
            </a>

            <a className="ftlk" onClick={() => go('services')}>
              {t.footer.service3}
            </a>

            <a className="ftlk" onClick={() => go('services')}>
              {t.footer.service4}
            </a>

            <a className="ftlk" onClick={() => go('services')}>
              {t.footer.service5}
            </a>

            <a className="ftlk" onClick={() => go('services')}>
              {t.footer.service6}
            </a>

          </div>

          {/* Contact */}

          <div>

            <div className="ftct">{t.footer.cn}</div>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="ftlk"
            >
              {t.footer.india}
            </a>

            <a
              href="https://t.me/pranavam_astro"
              target="_blank"
              rel="noopener noreferrer"
              className="ftlk"
            >
              {t.footer.telegram}
            </a>

            <a
              href="https://wa.me/79991234567"
              target="_blank"
              rel="noopener noreferrer"
              className="ftlk"
            >
              {t.footer.russia}
            </a>

          </div>

        </div>

        <div className="ft-b">
          <span>{t.footer.cp}</span>
          <span>{t.footer.sr}</span>
        </div>

      </div>
    </footer>
  )
}
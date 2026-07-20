'use client'
import { T, Lang } from '@/lib/data'

type Page = 'home' | 'about' | 'services' | 'travel' | 'gallery' | 'community' | 'school' | 'contact'

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
          <div>
            <div className="ft-lg">Gourishankaram</div>
            <p className="ft-tg">{t.footer.tag}</p>
          </div>
          <div>
            <div className="ftct">{t.footer.sv}</div>
            <a className="ftlk" onClick={() => go('services')}>Pooja &amp; Homam</a>
            <a className="ftlk" onClick={() => go('services')}>Tantram</a>
            <a className="ftlk" onClick={() => go('services')}>Dosha Pariharam</a>
            <a className="ftlk" onClick={() => go('services')}>Jyotish Consultation</a>
            <a className="ftlk" onClick={() => go('services')}>Vastu Shastram</a>
            <a className="ftlk" onClick={() => go('services')}>Raksha &amp; Elass</a>
          </div>
          <div>
            <div className="ftct">{t.footer.cn}</div>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="ftlk">WhatsApp India</a>
            <a href="https://t.me/pranavam_astro" target="_blank" rel="noopener noreferrer" className="ftlk">Telegram Bot</a>
            <a href="https://wa.me/79991234567" target="_blank" rel="noopener noreferrer" className="ftlk">WhatsApp Russia</a>
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

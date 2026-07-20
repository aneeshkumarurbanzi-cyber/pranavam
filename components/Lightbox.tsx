'use client'
import { T, Lang } from '@/lib/data'

const LB_FALLBACKS = [
  '1675597056623-74d1e05dc3f0','1697729444936-8c6a6f643312','1582510003544-4d00b7f74220',
  '1617875216004-78f15839c578','1625807161536-27903f2200fa','1666694051761-cd972857da30',
  '1619239632374-9e6651c2b7bb','1605292356183-a77d0a9c9d1d','1633368516165-f7b04d6428d1',
  '1697730420879-dc2a8dbaa31f','1605302977545-3a09913be1dd','1578326526526-fd998049d297'
]

interface LightboxProps {
  lang: Lang
  index: number
  onClose: () => void
}

export default function Lightbox({ lang, index, onClose }: LightboxProps) {
  const t = T[lang]
  const items = t.gallery.items as ReadonlyArray<{ title: string; cat: string; desc: string }>
  const item = items[index]
  const fallbackSrc = `https://images.unsplash.com/photo-${LB_FALLBACKS[index % LB_FALLBACKS.length]}?w=800&h=600&fit=crop&q=85`

  return (
    <div
      className="lightbox active"
      style={{ display: 'flex' }}
      onClick={onClose}
    >
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>×</button>
        <img
          className="lightbox-img"
          src={`/pranavam_images/gallery_${index + 1}.png`}
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackSrc }}
          alt={item?.title}
        />
        <div className="lightbox-caption">{item?.title}</div>
        <div className="lightbox-desc">{item?.desc}</div>
      </div>
    </div>
  )
}

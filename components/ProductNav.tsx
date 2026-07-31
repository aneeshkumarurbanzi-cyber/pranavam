'use client'

import Link from 'next/link'
import { Lang } from '@/lib/data'

interface Props {
  lang: Lang
}

export default function ProductNav({ lang }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

        <Link href="/" className="text-2xl font-bold">
          Guruji
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/">{lang === 'en' ? 'Home' : 'Главная'}</Link>
          <Link href="/?page=products">
            {lang === 'en' ? 'Products' : 'Товары'}
          </Link>
          <Link href="/?page=services">
            {lang === 'en' ? 'Services' : 'Услуги'}
          </Link>
          <Link href="/?page=contact">
            {lang === 'en' ? 'Contact' : 'Контакты'}
          </Link>
        </nav>

      </div>
    </header>
  )
}
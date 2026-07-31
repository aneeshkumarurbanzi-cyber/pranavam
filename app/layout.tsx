import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gourishankaram - Sacred Wisdom & Vedic Rituals',
  description: 'Traditional Kerala Rituals & Vedic Astrology by Guruji Manish Madhusoodanan Potti',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD" async />
      </head>
      <body>{children}</body>
    </html>
  )
}

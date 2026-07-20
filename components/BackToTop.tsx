'use client'

export default function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button id="back-to-top" onClick={scrollToTop} title="Back to top">↑</button>
  )
}

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', textAlign: 'center' }}>
      <div>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🕉️</div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Page Not Found</h2>
        <p style={{ color: '#888' }}>Return to the sacred home.</p>
        <a href="/" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#C9A227', textDecoration: 'underline' }}>← Go Home</a>
      </div>
    </div>
  )
}

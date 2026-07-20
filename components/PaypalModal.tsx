'use client'
import { useEffect, useRef, useState } from 'react'
import { T, Lang } from '@/lib/data'

declare const paypal: any // eslint-disable-line @typescript-eslint/no-explicit-any

interface PaypalModalProps {
  lang: Lang
  service: string
  amount: number
  onClose: () => void
}

interface SuccessState {
  name: string
  txId: string
}

export default function PaypalModal({ lang, service, amount, onClose }: PaypalModalProps) {
  const t = T[lang].paypal
  const containerRef = useRef<HTMLDivElement>(null)
  const [success, setSuccess] = useState<SuccessState | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const tryRender = () => {
      if (typeof paypal === 'undefined') {
        container.innerHTML = '<p style="color:var(--red);font-size:0.9rem;text-align:center;">PayPal SDK loading failed. Please check network connection.</p>'
        return
      }
      container.innerHTML = ''
      paypal.Buttons({
        createOrder: (_data: unknown, actions: any) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount.toString(), currency_code: 'USD' }, description: service }]
          })
        },
        onApprove: (_data: unknown, actions: any) => {
          return actions.order.capture().then((details: any) => {
            const nameVal = nameRef.current?.value || details.payer?.name?.given_name || 'Customer'
            setSuccess({ name: nameVal, txId: details.id })
          })
        },
        onError: (err: unknown) => {
          console.error(err)
          alert('An error occurred during payment processing.')
        }
      }).render(container)
    }

    // Give PayPal SDK a moment to load
    const timer = setTimeout(tryRender, 500)
    return () => clearTimeout(timer)
  }, [service, amount])

  const successMsg = success
    ? t.successDs
        .replace('{name}', success.name)
        .replace('{service}', service)
    : ''

  return (
    <div className="modal-overlay active" style={{ display: 'flex' }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>×</button>
        {success ? (
          <div className="checkout-success">
            <div className="success-icon">✓</div>
            <h4>{t.successTl}</h4>
            <p dangerouslySetInnerHTML={{ __html: successMsg.replace(success.name, `<strong>${success.name}</strong>`).replace(service, `<strong>${service}</strong>`) }} />
            <div className="success-tx-info">
              <span>{t.txId}</span> <strong>{success.txId}</strong>
            </div>
            <button className="btn b-pri" onClick={onClose}>Close</button>
          </div>
        ) : (
          <div>
            <h3>{t.tl}</h3>
            <div className="modal-info-row">
              <span className="modal-info-lbl">{t.srv}</span>
              <span className="modal-info-val">{service}</span>
            </div>
            <div className="modal-info-row">
              <span className="modal-info-lbl">{t.amt}</span>
              <span className="modal-info-val">${amount.toFixed(2)}</span>
            </div>
            <form className="modal-form" onSubmit={e => e.preventDefault()}>
              <input type="text" ref={nameRef} placeholder={t.name} required />
              <input type="email" placeholder={t.email} required />
              <input type="text" placeholder={t.phone} required />
              <input type="date" required />
              <div className="paypal-btn-wrap" ref={containerRef}></div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

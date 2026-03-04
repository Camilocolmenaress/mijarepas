import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { router } from './router'

const CLAVE = '0103'

function PantallaClave({ onAcceso }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleDigit = (d) => {
    if (pin.length >= 4) return
    const next = pin + d
    setPin(next)
    setError(false)
    if (next.length === 4) {
      if (next === CLAVE) {
        sessionStorage.setItem('mija_auth', '1')
        onAcceso()
      } else {
        setError(true)
        setTimeout(() => { setPin(''); setError(false) }, 600)
      }
    }
  }

  const handleBorrar = () => {
    setPin(pin.slice(0, -1))
    setError(false)
  }

  const dots = Array.from({ length: 4 }, (_, i) => (
    <div key={i} style={{
      width: '18px', height: '18px', borderRadius: '50%',
      border: `2px solid ${error ? '#eb1e55' : '#f9ac31'}`,
      background: i < pin.length ? (error ? '#eb1e55' : '#f9ac31') : 'transparent',
      transition: 'all 0.15s ease',
      transform: error ? `translateX(${i % 2 === 0 ? '-6px' : '6px'})` : 'none',
    }} />
  ))

  const teclas = ['1','2','3','4','5','6','7','8','9','','0','⌫']

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#42261a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <img src="/images/logo-transparente.png" alt="Mijarepas" style={{ width: '120px', marginBottom: '24px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }} />
      <p className="font-healing" style={{ color: '#f9ac31', fontSize: '22px', marginBottom: '24px' }}>
        Ingresa la clave
      </p>
      <div style={{ display: 'flex', gap: '14px', marginBottom: '32px' }}>
        {dots}
      </div>
      {error && <p className="font-brinnan" style={{ color: '#eb1e55', fontSize: '13px', marginBottom: '12px', marginTop: '-20px' }}>Clave incorrecta</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 72px)', gap: '12px' }}>
        {teclas.map((t, i) => (
          t === '' ? <div key={i} /> : (
            <button
              key={i}
              onClick={() => t === '⌫' ? handleBorrar() : handleDigit(t)}
              className="font-chreed"
              style={{
                width: '72px', height: '72px', borderRadius: '50%',
                border: '2px solid rgba(255,241,210,0.25)',
                background: 'transparent', color: '#fff1d2',
                fontSize: t === '⌫' ? '24px' : '28px',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {t}
            </button>
          )
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [autenticado, setAutenticado] = useState(() => sessionStorage.getItem('mija_auth') === '1')

  if (!autenticado) {
    return <PantallaClave onAcceso={() => setAutenticado(true)} />
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'mijarepas-toast',
          style: { maxWidth: '320px' },
        }}
      />
      <RouterProvider router={router} />
    </>
  )
}

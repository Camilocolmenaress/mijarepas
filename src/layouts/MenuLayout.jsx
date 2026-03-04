import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom'
import Header from '../components/Header'
import useCartStore from '../store/useCartStore'

const TELEFONOS_SEDE = {
  Aurora: '+573183237090',
  Lagos: '+573196049254',
  Mutis: '+573144456989',
  Piedecuesta: '+573105548313',
}

export default function MenuLayout() {
  const location = useLocation()
  const sede = useCartStore(s => s.sede)
  const tel = sede ? TELEFONOS_SEDE[sede] : null

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--crema)' }}>
      <ScrollRestoration />
      <Header />
      <Outlet key={location.pathname} />

      {/* Floating call button */}
      {tel && (
        <a
          href={`tel:${tel}`}
          aria-label={`Llamar a sede ${sede}`}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '15px',
            zIndex: 90,
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: '#007d3e',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            boxShadow: '0 4px 16px rgba(0,125,62,0.45)',
            textDecoration: 'none',
            transition: 'transform 0.15s ease',
          }}
        >
          📞
        </a>
      )}
    </div>
  )
}

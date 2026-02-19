import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'

export default function Header() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const { items } = useCartStore()
  const totalItems = items.reduce((a, i) => a + i.qty, 0)
  const [badgeKey, setBadgeKey] = useState(0)
  const prevTotal = useRef(totalItems)

  useEffect(() => {
    if (totalItems > prevTotal.current) {
      setBadgeKey(k => k + 1)
    }
    prevTotal.current = totalItems
  }, [totalItems])

  const handleSearch = (value) => {
    setSearchParams(prev => {
      if (value) {
        prev.set('search', value)
      } else {
        prev.delete('search')
      }
      return prev
    })
  }

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'var(--blanco)',
        boxShadow: '0 2px 12px rgba(44,26,14,0.10)',
        padding: '10px 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', maxWidth: '640px', margin: '0 auto' }}>
        {/* Logo — click to go to menu */}
        <div
          onClick={() => navigate('/menu')}
          style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>🫓</span>
          <span
            className="font-fredoka"
            style={{ fontSize: '1.25rem', color: 'var(--rojo-mijarepas)', lineHeight: 1 }}
          >
            Mijarepas
          </span>
        </div>

        {/* Search bar */}
        <div
          style={{
            flex: 1,
            display: 'flex', alignItems: 'center',
            background: 'var(--crema)',
            borderRadius: '50px',
            padding: '8px 14px',
            gap: '8px',
            border: '1.5px solid var(--crema-oscuro)',
          }}
        >
          <span style={{ fontSize: '0.9rem', color: 'var(--cafe-medio)', flexShrink: 0 }}>🔍</span>
          <input
            type="search"
            placeholder="Buscar platillo..."
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className="font-nunito"
            style={{
              border: 'none', background: 'transparent', outline: 'none',
              width: '100%', fontSize: '0.875rem', color: 'var(--cafe-oscuro)',
              fontWeight: 600,
            }}
            aria-label="Buscar en el menú"
            onFocus={() => {
              // Navigate to /menu if we're not there, so search results display properly
              if (!window.location.pathname.startsWith('/menu')) {
                navigate('/menu')
              }
            }}
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              aria-label="Limpiar búsqueda"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--cafe-medio)', fontSize: '0.9rem', padding: 0,
                flexShrink: 0, lineHeight: 1,
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Cart button — navigates to /carrito */}
        <button
          onClick={() => navigate('/carrito')}
          aria-label={`Carrito con ${totalItems} items`}
          style={{
            position: 'relative', background: 'var(--rojo-mijarepas)',
            border: 'none', borderRadius: '50px',
            width: '48px', height: '48px',
            flexShrink: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem',
            boxShadow: '0 3px 12px rgba(200,51,74,0.35)',
          }}
        >
          🛒
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                key={badgeKey}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  background: 'var(--dorado-mijarepas)',
                  color: 'var(--cafe-oscuro)',
                  borderRadius: '50%', width: '20px', height: '20px',
                  fontSize: '0.7rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Nunito', sans-serif",
                  border: '2px solid white',
                }}
              >
                {totalItems > 9 ? '9+' : totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  )
}

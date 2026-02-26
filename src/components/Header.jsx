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
    if (totalItems > prevTotal.current) setBadgeKey(k => k + 1)
    prevTotal.current = totalItems
  }, [totalItems])

  const handleSearch = (value) => {
    setSearchParams(prev => {
      if (value) prev.set('search', value)
      else prev.delete('search')
      return prev
    })
  }

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'var(--cafe)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.28)',
        padding: '8px 16px',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* ── Fila única: logo imagen + buscador + carrito ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

          {/* Logo oficial — imagen */}
          <div
            onClick={() => navigate('/menu')}
            style={{ flexShrink: 0, cursor: 'pointer', lineHeight: 0 }}
          >
            <img
              src="/images/logo-transparente.png"
              alt="Mijarepas"
              style={{
                height: '44px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>

          {/* Buscador */}
          <div
            style={{
              flex: 1,
              display: 'flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.10)',
              borderRadius: '50px',
              padding: '7px 13px', gap: '8px',
              border: '1.5px solid rgba(255,255,255,0.18)',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,241,210,0.6)', flexShrink: 0 }}>🔍</span>
            <input
              type="search"
              placeholder="Buscar platillo..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              className="font-brinnan"
              style={{
                border: 'none', background: 'transparent', outline: 'none',
                width: '100%', fontSize: '0.875rem', color: 'var(--crema)', fontWeight: 600,
              }}
              aria-label="Buscar en el menú"
              onFocus={() => {
                if (!window.location.pathname.startsWith('/menu')) navigate('/menu')
              }}
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                aria-label="Limpiar búsqueda"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,241,210,0.7)', fontSize: '0.9rem', padding: 0,
                  flexShrink: 0, lineHeight: 1,
                }}
              >✕</button>
            )}
          </div>

          {/* Carrito */}
          <button
            onClick={() => navigate('/carrito')}
            aria-label={`Carrito con ${totalItems} items`}
            style={{
              position: 'relative', background: 'var(--primario)',
              border: 'none', borderRadius: '50px',
              width: '46px', height: '46px', flexShrink: 0,
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '1.25rem',
              boxShadow: '0 3px 12px rgba(235,30,85,0.45)',
            }}
          >
            🛒
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={badgeKey}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  style={{
                    position: 'absolute', top: '-4px', right: '-4px',
                    background: 'var(--secundario)', color: 'var(--cafe)',
                    borderRadius: '50%', width: '20px', height: '20px',
                    fontSize: '0.7rem', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Brinnan', sans-serif",
                    border: '2px solid var(--cafe)',
                  }}
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

      </div>
    </header>
  )
}

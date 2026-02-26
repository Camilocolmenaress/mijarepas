import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'
import CartaMenu from '../components/CartaMenu'

export default function MenuPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const hintShown = useRef(false)

  const { items } = useCartStore()
  const totalItems = items.reduce((a, i) => a + i.qty, 0)
  const totalPrice = items.reduce((a, i) => a + i.precio * i.qty, 0)

  // Auto-dismiss swipe hint after 3s
  useEffect(() => {
    if (!showSwipeHint) return
    const t = setTimeout(() => setShowSwipeHint(false), 3000)
    return () => clearTimeout(t)
  }, [showSwipeHint])

  // Dismiss on first horizontal scroll inside CartaMenu
  useEffect(() => {
    if (!showSwipeHint) return
    const handleScroll = () => {
      if (!hintShown.current) {
        hintShown.current = true
        setShowSwipeHint(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Also listen on touch move
    const handleTouch = () => {
      hintShown.current = true
      setShowSwipeHint(false)
    }
    window.addEventListener('touchmove', handleTouch, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchmove', handleTouch)
    }
  }, [showSwipeHint])

  return (
    <>
      {/* Hero banner — solo sin búsqueda, fuera del scroll horizontal */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{ width: '100%', lineHeight: 0, flexShrink: 0, position: 'relative' }}
        >
          <img
            src="/images/hero-banner.jpeg"
            alt="Mijarepas — El sabor de Ocaña"
            style={{
              width: '100%',
              height: 'clamp(140px, 28vw, 200px)',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
          {/* Swipe hint overlay */}
          <AnimatePresence>
            {showSwipeHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.45)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '8px', pointerEvents: 'none',
                }}
              >
                {/* Animated arrow */}
                <motion.span
                  animate={{ x: [0, 14, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ fontSize: '2rem', lineHeight: 1 }}
                >
                  👉
                </motion.span>
                <p className="font-brinnan" style={{
                  color: '#ffffff', fontSize: '0.88rem', fontWeight: 700,
                  margin: 0, letterSpacing: '0.03em',
                  textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                }}>
                  Desliza para ver más
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Carta tipo menú físico con scroll horizontal */}
      <CartaMenu searchQuery={searchQuery} />

      {/* ── Barra inferior sticky ── */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
              paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
            }}
          >
            <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 12px' }}>
              <div style={{
                background: 'var(--cafe)',
                borderRadius: '18px', padding: '12px 16px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: '12px',
                boxShadow: '0 -2px 20px rgba(66,38,26,0.25), 0 8px 24px rgba(66,38,26,0.3)',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span className="font-brinnan" style={{ color: 'rgba(255,241,210,0.7)', fontSize: '0.72rem', lineHeight: 1 }}>
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                  </span>
                  <span className="font-chreed" style={{ color: 'var(--secundario)', fontSize: '1.2rem', lineHeight: 1.1 }}>
                    {formatCOP(totalPrice)}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/carrito')}
                  className="font-chreed"
                  style={{
                    background: 'var(--primario)', color: 'white',
                    border: 'none', borderRadius: '50px', padding: '10px 22px',
                    fontSize: '1rem', cursor: 'pointer', minHeight: '44px',
                    flexShrink: 0, boxShadow: '0 3px 12px rgba(235,30,85,0.45)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Ver pedido 🛒
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

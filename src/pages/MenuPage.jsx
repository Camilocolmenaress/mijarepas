import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'
import CategoryTabs from '../components/CategoryTabs'
import ProductGrid from '../components/ProductGrid'

export default function MenuPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('cat') || 'clasicas'
  const searchQuery = searchParams.get('search') || ''

  const { items } = useCartStore()
  const totalItems = items.reduce((a, i) => a + i.qty, 0)
  const totalPrice = items.reduce((a, i) => a + i.precio * i.qty, 0)

  const handleCategorySelect = (catId) => {
    setSearchParams(prev => {
      prev.set('cat', catId)
      prev.delete('search')
      return prev
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        style={{ paddingBottom: totalItems > 0 ? '80px' : '0' }}
      >
        {/* ── Cambio 2: Hero banner — solo cuando NO hay búsqueda ── */}
        {!searchQuery && (
          <div style={{ width: '100%', lineHeight: 0 }}>
            <img
              src="/images/hero-banner.jpeg"
              alt="Mijarepas — El sabor de Ocaña"
              style={{
                width: '100%',
                height: 'clamp(180px, 35vw, 260px)',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* Tabs de categorías */}
        {!searchQuery && (
          <CategoryTabs activeCategory={activeCategory} onSelect={handleCategorySelect} />
        )}

        {/* Cambio 3: Separador farallones — entre categorías y grid, solo sin búsqueda */}
        {!searchQuery && (
          <div style={{ width: '100%', lineHeight: 0 }}>
            <img
              src="/images/farallones.jpeg"
              alt="Farallones de Ocaña"
              style={{
                width: '100%',
                height: 'clamp(140px, 25vw, 200px)',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        )}

        <ProductGrid activeCategory={activeCategory} searchQuery={searchQuery} />
      </motion.div>

      {/* ── Barra inferior sticky (móvil) ── */}
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
              <div
                style={{
                  background: 'var(--cafe)',
                  borderRadius: '18px', padding: '12px 16px',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: '12px',
                  boxShadow: '0 -2px 20px rgba(66,38,26,0.25), 0 8px 24px rgba(66,38,26,0.3)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span className="font-nunito" style={{ color: 'rgba(255,241,210,0.7)', fontSize: '0.72rem', fontWeight: 700, lineHeight: 1 }}>
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                  </span>
                  <span className="font-fredoka" style={{ color: 'var(--secundario)', fontSize: '1.2rem', lineHeight: 1.1 }}>
                    {formatCOP(totalPrice)}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/carrito')}
                  className="font-fredoka"
                  style={{
                    background: 'var(--primario)',
                    color: 'white', border: 'none',
                    borderRadius: '50px', padding: '10px 22px',
                    fontSize: '1rem', cursor: 'pointer',
                    minHeight: '44px', flexShrink: 0,
                    boxShadow: '0 3px 12px rgba(235,30,85,0.45)',
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

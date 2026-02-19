import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'
import BannerCarousel from '../components/BannerCarousel'
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
        /* Extra bottom padding so content isn't hidden behind sticky bar */
        style={{ paddingBottom: totalItems > 0 ? '80px' : '0' }}
      >
        {/* Banners and category tabs hidden during search */}
        {!searchQuery && <BannerCarousel />}

        {!searchQuery && (
          <CategoryTabs
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />
        )}

        <ProductGrid
          activeCategory={activeCategory}
          searchQuery={searchQuery}
        />
      </motion.div>

      {/* ── Sticky bottom cart bar (mobile) ── */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{
              position: 'fixed',
              bottom: 0, left: 0, right: 0,
              zIndex: 200,
              /* Only visible on mobile — hide on wide screens via inline media workaround */
              paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
            }}
          >
            <div
              style={{
                maxWidth: '640px',
                margin: '0 auto',
                padding: '0 12px 0',
              }}
            >
              <div
                style={{
                  background: 'var(--cafe-oscuro)',
                  borderRadius: '18px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  boxShadow: '0 -2px 20px rgba(44,26,14,0.25), 0 8px 24px rgba(44,26,14,0.3)',
                }}
              >
                {/* Left: item count + subtotal */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span
                    className="font-nunito"
                    style={{
                      color: 'rgba(255,245,228,0.7)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                  </span>
                  <span
                    className="font-fredoka"
                    style={{
                      color: 'var(--dorado-mijarepas)',
                      fontSize: '1.2rem',
                      lineHeight: 1.1,
                    }}
                  >
                    {formatCOP(totalPrice)}
                  </span>
                </div>

                {/* Right: Ver pedido button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/carrito')}
                  className="font-fredoka"
                  style={{
                    background: 'var(--rojo-mijarepas)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '10px 22px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    minHeight: '44px',
                    flexShrink: 0,
                    boxShadow: '0 3px 12px rgba(200,51,74,0.45)',
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

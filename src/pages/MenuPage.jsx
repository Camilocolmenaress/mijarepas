import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'
import CartaMenu from '../components/CartaMenu'
import PromoBanner from '../components/PromoBanner'
import PromoPopup from '../components/PromoPopup'
import usePromos from '../hooks/usePromos'

export default function MenuPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const { items } = useCartStore()
  const totalItems = items.reduce((a, i) => a + i.qty, 0)
  const totalPrice = items.reduce((a, i) => a + i.precio * i.qty, 0)

  const { promos, loading } = usePromos()
  const [showPromoPopup, setShowPromoPopup] = useState(false)

  // Mostrar popup de promo una vez por sesion
  useEffect(() => {
    if (loading) return
    if (promos.length === 0) return
    const seen = sessionStorage.getItem('mijarepas_promo_popup_seen')
    if (!seen) {
      sessionStorage.setItem('mijarepas_promo_popup_seen', '1')
      setShowPromoPopup(true)
    }
  }, [loading, promos])

  return (
    <>
      {/* Hero banner / Carrusel de promos — solo sin busqueda */}
      {!searchQuery && (
        !loading && promos.length > 0
          ? <PromoBanner promos={promos} />
          : (
            <div style={{ width: '100%', lineHeight: 0, flexShrink: 0 }}>
              <img
                src="/images/LOGOSYRECURSOS-12.jpg"
                alt="Mijarepas — El sabor de Ocana"
                style={{
                  width: '100%',
                  height: 'clamp(140px, 28vw, 200px)',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            </div>
          )
      )}

      {/* Carta menu con scroll horizontal */}
      <CartaMenu searchQuery={searchQuery} />

      {/* ── Barra inferior sticky ── */}
      {totalItems > 0 && (
        <div
          className="anim-slideUp"
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
            paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          }}
        >
          <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 12px' }}>
            <div style={{
              background: 'var(--cafe)', borderRadius: '18px', padding: '12px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
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
              <button
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
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up de promo */}
      {showPromoPopup && promos.length > 0 && (
        <PromoPopup
          promo={promos[0]}
          onClose={() => setShowPromoPopup(false)}
        />
      )}
    </>
  )
}

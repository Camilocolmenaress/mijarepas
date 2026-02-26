import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, updateQty } = useCartStore()
  const total = items.reduce((a, i) => a + i.precio * i.qty, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        maxWidth: '640px', margin: '0 auto',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        minHeight: 'calc(100dvh - 68px)',
      }}
    >
      {/* Encabezado */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 16px 8px',
        borderBottom: '1px solid var(--crema-oscuro)',
      }}>
        <h2 className="font-chreed" style={{ fontSize: '1.4rem', color: 'var(--cafe)' }}>
          Tu Pedido 🛒
        </h2>
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver al menú"
          style={{
            background: 'var(--crema-oscuro)', border: 'none', borderRadius: '50%',
            width: '34px', height: '34px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', color: 'var(--cafe-medio)',
          }}
        >←</button>
      </div>

      <div style={{ padding: '0 16px' }}>

        {/* Estado vacío */}
        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 16px' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>🍽️</div>
            <p className="font-chreed" style={{ fontSize: '1.2rem', color: 'var(--cafe)', marginBottom: '6px' }}>
              Tu pedido está vacío
            </p>
            <p className="font-brinnan" style={{ color: 'var(--cafe-medio)', fontSize: '0.9rem', marginBottom: '20px' }}>
              ¡Elige algo delicioso!
            </p>
            <button
              onClick={() => navigate('/menu')}
              className="font-chreed"
              style={{
                background: 'var(--primario)', color: 'white',
                border: 'none', borderRadius: '12px', padding: '12px 28px',
                fontSize: '1rem', cursor: 'pointer',
              }}
            >
              Ver el menú
            </button>
          </div>
        )}

        {/* Lista de productos */}
        {items.length > 0 && (
          <>
            <div style={{ padding: '12px 0' }}>
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 0',
                      borderBottom: '1px solid var(--crema-oscuro)',
                    }}
                  >
                    <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{item.emoji}</span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="font-brinnan" style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--cafe)', lineHeight: 1.3 }}>
                        {item.nombre}
                      </p>
                      {item.nota && (
                        <p className="font-brinnan" style={{ fontSize: '0.72rem', color: 'var(--cafe-medio)', fontStyle: 'italic' }}>
                          {item.nota}
                        </p>
                      )}
                      {/* Precio — Brinnan bold */}
                      <p className="font-brinnan" style={{ color: 'var(--primario)', fontSize: '0.9rem', fontWeight: 800 }}>
                        {formatCOP(item.precio * item.qty)}
                      </p>
                    </div>

                    {/* Controles de cantidad */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => updateQty(item.key, -1)}
                        aria-label="Reducir cantidad"
                        style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          border: '1.5px solid var(--crema-oscuro)',
                          background: 'white', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1rem', color: 'var(--cafe-medio)',
                        }}
                      >−</button>
                      <span className="font-chreed" style={{ minWidth: '20px', textAlign: 'center', color: 'var(--cafe)' }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.key, 1)}
                        aria-label="Aumentar cantidad"
                        style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          border: 'none', background: 'var(--primario)',
                          color: 'white', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1rem',
                        }}
                      >+</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Total */}
            <div style={{
              borderTop: '2px solid var(--crema-oscuro)',
              paddingTop: '14px', marginTop: '4px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '20px',
            }}>
              <span className="font-brinnan" style={{ color: 'var(--cafe-medio)', fontWeight: 700, fontSize: '0.9rem' }}>
                Total
              </span>
              <span className="font-chreed" style={{ color: 'var(--cafe)', fontSize: '1.6rem' }}>
                {formatCOP(total)}
              </span>
            </div>

            {/* CTA ir a checkout */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/checkout')}
              className="font-chreed"
              style={{
                width: '100%', background: 'var(--primario)',
                color: 'white', border: 'none', borderRadius: '12px',
                padding: '16px', fontSize: '1.15rem',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(235,30,85,0.4)',
                minHeight: '54px', marginBottom: '8px',
              }}
            >
              Continuar con el pedido →
            </motion.button>

            <p className="font-brinnan" style={{ textAlign: 'center', color: 'var(--cafe-medio)', fontSize: '0.75rem', marginTop: '6px' }}>
              💰 Pago al recibir
            </p>
          </>
        )}
      </div>
    </motion.div>
  )
}

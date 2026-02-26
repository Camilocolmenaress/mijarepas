import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'

/* ─── Datos de métodos de pago ──────────────────────────────────────── */
const PAYMENT_METHODS = [
  {
    id: 'nequi',
    label: 'Nequi',
    emoji: '📱',
    color: '#9B59B6',
    bg: '#f3eafa',
    detail: (
      <div style={{ padding: '12px 14px' }}>
        <p className="font-brinnan" style={{ fontSize: '0.82rem', color: '#42261a', fontWeight: 700, marginBottom: '4px' }}>
          Número Nequi:
        </p>
        <p className="font-chreed" style={{ fontSize: '1.2rem', color: '#9B59B6', letterSpacing: '0.05em' }}>
          315 064 2289
        </p>
        <p className="font-brinnan" style={{ fontSize: '0.76rem', color: '#7a4d35', marginTop: '4px' }}>
          Envía el comprobante por WhatsApp al confirmar tu pedido.
        </p>
      </div>
    ),
  },
  {
    id: 'bancolombia',
    label: 'Bancolombia',
    emoji: '🏦',
    color: '#F5A623',
    bg: '#fffaf0',
    detail: (
      <div style={{ padding: '12px 14px' }}>
        <p className="font-brinnan" style={{ fontSize: '0.82rem', color: '#42261a', fontWeight: 700, marginBottom: '4px' }}>
          Número de cuenta:
        </p>
        <p className="font-chreed" style={{ fontSize: '1.1rem', color: '#F5A623', letterSpacing: '0.05em' }}>
          000-000000-00
        </p>
        <p className="font-brinnan" style={{ fontSize: '0.82rem', color: '#42261a', fontWeight: 700, marginBottom: '4px', marginTop: '8px' }}>
          Titular:
        </p>
        <p className="font-brinnan" style={{ fontSize: '0.82rem', color: '#7a4d35' }}>
          Mijarepas S.A.S
        </p>
        <p className="font-brinnan" style={{ fontSize: '0.76rem', color: '#7a4d35', marginTop: '4px' }}>
          Envía el comprobante por WhatsApp al confirmar tu pedido.
        </p>
      </div>
    ),
  },
  {
    id: 'efectivo',
    label: 'Efectivo',
    emoji: '💵',
    color: '#007d3e',
    bg: '#f0faf4',
    detail: (
      <div style={{ padding: '12px 14px' }}>
        <p className="font-brinnan" style={{ fontSize: '0.82rem', color: '#42261a', lineHeight: 1.5 }}>
          Paga en efectivo al momento de recibir tu pedido. Si necesitas cambio, indícalo en las notas al confirmar por WhatsApp.
        </p>
      </div>
    ),
  },
]

export default function CartPage() {
  const navigate = useNavigate()
  const { items, updateQty, extras, setExtras, paymentMethod, setPaymentMethod } = useCartStore()
  const subtotal = items.reduce((a, i) => a + i.precio * i.qty, 0)

  // Salsas max: 1 unidad por producto en el carrito
  const maxSalsas = items.reduce((a, i) => a + i.qty, 0)

  const handleServilletas = (v) => setExtras({ ...extras, servilletas: v })
  const handleSalsas = (v) => {
    if (!v) setExtras({ ...extras, salsas: false, tartara: 0, pina: 0 })
    else setExtras({ ...extras, salsas: true })
  }
  const changeSalsa = (tipo, delta) => {
    const curr = extras[tipo]
    const newVal = Math.max(0, Math.min(maxSalsas, curr + delta))
    setExtras({ ...extras, [tipo]: newVal })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        maxWidth: '640px', margin: '0 auto',
        paddingBottom: 'max(40px, env(safe-area-inset-bottom))',
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

            {/* Total parcial */}
            <div style={{
              borderTop: '2px solid var(--crema-oscuro)',
              paddingTop: '14px', marginTop: '4px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '24px',
            }}>
              <span className="font-brinnan" style={{ color: 'var(--cafe-medio)', fontWeight: 700, fontSize: '0.9rem' }}>
                Subtotal
              </span>
              <span className="font-chreed" style={{ color: 'var(--cafe)', fontSize: '1.6rem' }}>
                {formatCOP(subtotal)}
              </span>
            </div>

            {/* ── SECCIÓN A: ¿Deseas agregar? ── */}
            <div style={{
              background: '#fff',
              border: '1.5px solid var(--crema-oscuro)',
              borderRadius: '16px', padding: '16px',
              marginBottom: '16px',
            }}>
              <h3 className="font-chreed" style={{ fontSize: '1rem', color: 'var(--cafe)', marginBottom: '14px' }}>
                🍟 ¿Deseas agregar?
              </h3>

              {/* Servilletas */}
              <label style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', marginBottom: '12px',
              }}>
                <span className="font-brinnan" style={{ fontSize: '0.9rem', color: 'var(--cafe)', fontWeight: 700 }}>
                  🧻 Servilletas
                </span>
                <div
                  onClick={() => handleServilletas(!extras.servilletas)}
                  style={{
                    width: '44px', height: '24px', borderRadius: '12px',
                    background: extras.servilletas ? 'var(--verde)' : 'var(--crema-oscuro)',
                    position: 'relative', cursor: 'pointer', flexShrink: 0,
                    transition: 'background 0.25s ease',
                  }}
                >
                  <motion.div
                    animate={{ x: extras.servilletas ? 20 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    style={{
                      position: 'absolute', top: '2px', left: '2px',
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </div>
              </label>

              {/* Salsas */}
              <label style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer',
              }}>
                <span className="font-brinnan" style={{ fontSize: '0.9rem', color: 'var(--cafe)', fontWeight: 700 }}>
                  🥫 Salsas
                </span>
                <div
                  onClick={() => handleSalsas(!extras.salsas)}
                  style={{
                    width: '44px', height: '24px', borderRadius: '12px',
                    background: extras.salsas ? 'var(--verde)' : 'var(--crema-oscuro)',
                    position: 'relative', cursor: 'pointer', flexShrink: 0,
                    transition: 'background 0.25s ease',
                  }}
                >
                  <motion.div
                    animate={{ x: extras.salsas ? 20 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    style={{
                      position: 'absolute', top: '2px', left: '2px',
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </div>
              </label>

              {/* Contadores de salsas — visible solo si salsas=true */}
              <AnimatePresence>
                {extras.salsas && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p className="font-brinnan" style={{ fontSize: '0.75rem', color: 'var(--cafe-medio)', margin: 0 }}>
                        Máx. 1 salsa por producto pedido ({maxSalsas} en total)
                      </p>
                      {/* Tártara */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span className="font-brinnan" style={{ fontSize: '0.88rem', color: 'var(--cafe)', fontWeight: 700 }}>
                          🥣 Tártara
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button onClick={() => changeSalsa('tartara', -1)} style={counterBtnStyle('#42261a')}>−</button>
                          <span className="font-chreed" style={{ minWidth: '18px', textAlign: 'center', color: 'var(--cafe)', fontSize: '1rem' }}>
                            {extras.tartara}
                          </span>
                          <button
                            onClick={() => changeSalsa('tartara', 1)}
                            disabled={extras.tartara + extras.pina >= maxSalsas}
                            style={counterBtnStyle('var(--primario)', extras.tartara + extras.pina >= maxSalsas)}
                          >+</button>
                        </div>
                      </div>
                      {/* Piña */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span className="font-brinnan" style={{ fontSize: '0.88rem', color: 'var(--cafe)', fontWeight: 700 }}>
                          🍍 Piña
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button onClick={() => changeSalsa('pina', -1)} style={counterBtnStyle('#42261a')}>−</button>
                          <span className="font-chreed" style={{ minWidth: '18px', textAlign: 'center', color: 'var(--cafe)', fontSize: '1rem' }}>
                            {extras.pina}
                          </span>
                          <button
                            onClick={() => changeSalsa('pina', 1)}
                            disabled={extras.tartara + extras.pina >= maxSalsas}
                            style={counterBtnStyle('var(--primario)', extras.tartara + extras.pina >= maxSalsas)}
                          >+</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── SECCIÓN B: ¿Cómo vas a pagar? ── */}
            <div style={{
              background: '#fff',
              border: '1.5px solid var(--crema-oscuro)',
              borderRadius: '16px', padding: '16px',
              marginBottom: '20px',
            }}>
              <h3 className="font-chreed" style={{ fontSize: '1rem', color: 'var(--cafe)', marginBottom: '14px' }}>
                💳 ¿Cómo vas a pagar?
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PAYMENT_METHODS.map(pm => (
                  <div key={pm.id}>
                    <button
                      onClick={() => setPaymentMethod(paymentMethod === pm.id ? null : pm.id)}
                      style={{
                        width: '100%', border: `2px solid ${paymentMethod === pm.id ? pm.color : 'var(--crema-oscuro)'}`,
                        borderRadius: '12px', padding: '12px 14px',
                        background: paymentMethod === pm.id ? pm.bg : '#fff',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{pm.emoji}</span>
                      <span className="font-brinnan" style={{
                        fontWeight: 800, fontSize: '0.9rem',
                        color: paymentMethod === pm.id ? pm.color : 'var(--cafe)',
                        flex: 1, textAlign: 'left',
                      }}>
                        {pm.label}
                      </span>
                      <motion.span
                        animate={{ rotate: paymentMethod === pm.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ fontSize: '0.8rem', color: 'var(--cafe-medio)', flexShrink: 0 }}
                      >
                        ▶
                      </motion.span>
                    </button>

                    {/* Panel de detalle */}
                    <AnimatePresence>
                      {paymentMethod === pm.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          style={{
                            overflow: 'hidden',
                            background: pm.bg,
                            border: `1.5px solid ${pm.color}`,
                            borderTop: 'none',
                            borderRadius: '0 0 12px 12px',
                          }}
                        >
                          {pm.detail}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
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
              {paymentMethod
                ? `💳 Pagarás con ${PAYMENT_METHODS.find(p => p.id === paymentMethod)?.label}`
                : '💰 Pago al recibir'}
            </p>
          </>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Estilos de botones contador ───────────────────────────────────── */
function counterBtnStyle(bg, disabled = false) {
  return {
    width: '28px', height: '28px', borderRadius: '50%',
    border: 'none', background: disabled ? 'var(--crema-oscuro)' : bg,
    color: 'white', cursor: disabled ? 'default' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1rem', opacity: disabled ? 0.45 : 1, flexShrink: 0,
  }
}

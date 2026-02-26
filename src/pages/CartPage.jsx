import { useNavigate } from 'react-router-dom'
import {
  ShoppingCart, Banknote, Smartphone, Building2,
  UtensilsCrossed, ScrollText, Droplets, ChevronRight,
  Minus, Plus, ArrowLeft,
} from 'lucide-react'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'

/* ─── Icono helper ──────────────────────────────────────────────────── */
const IC = ({ icon: Icon, size = 18, color = '#42261a', style = {} }) => (
  <Icon size={size} color={color} strokeWidth={2} style={{ flexShrink: 0, ...style }} />
)

/* ─── Datos de métodos de pago ──────────────────────────────────────── */
const PAYMENT_METHODS = [
  {
    id: 'nequi',
    label: 'Nequi',
    Icon: Smartphone,
    color: '#9B59B6',
    bg: '#f3eafa',
    detail: (
      <div style={{ padding: '12px 14px' }}>
        <p className="font-brinnan" style={{ fontSize: '0.82rem', color: '#42261a', fontWeight: 700, marginBottom: '4px' }}>Número Nequi:</p>
        <p className="font-chreed" style={{ fontSize: '1.2rem', color: '#9B59B6', letterSpacing: '0.05em' }}>315 064 2289</p>
        <p className="font-brinnan" style={{ fontSize: '0.76rem', color: '#7a4d35', marginTop: '4px' }}>
          Envía el comprobante por WhatsApp al confirmar tu pedido.
        </p>
      </div>
    ),
  },
  {
    id: 'bancolombia',
    label: 'Bancolombia',
    Icon: Building2,
    color: '#F5A623',
    bg: '#fffaf0',
    detail: (
      <div style={{ padding: '12px 14px' }}>
        <p className="font-brinnan" style={{ fontSize: '0.82rem', color: '#42261a', fontWeight: 700, marginBottom: '4px' }}>Número de cuenta:</p>
        <p className="font-chreed" style={{ fontSize: '1.1rem', color: '#F5A623', letterSpacing: '0.05em' }}>000-000000-00</p>
        <p className="font-brinnan" style={{ fontSize: '0.82rem', color: '#42261a', fontWeight: 700, margin: '8px 0 4px' }}>Titular:</p>
        <p className="font-brinnan" style={{ fontSize: '0.82rem', color: '#7a4d35' }}>Mijarepas S.A.S</p>
        <p className="font-brinnan" style={{ fontSize: '0.76rem', color: '#7a4d35', marginTop: '4px' }}>
          Envía el comprobante por WhatsApp al confirmar tu pedido.
        </p>
      </div>
    ),
  },
  {
    id: 'efectivo',
    label: 'Efectivo',
    Icon: Banknote,
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

/* ─── Toggle switch (CSS puro) ──────────────────────────────────────── */
function Toggle({ active, onToggle }) {
  return (
    <div
      onClick={onToggle}
      role="switch"
      aria-checked={active}
      style={{
        width: '44px', height: '24px', borderRadius: '12px',
        background: active ? '#007d3e' : '#d4c5b2',
        position: 'relative', cursor: 'pointer', flexShrink: 0,
        transition: 'background 0.25s ease',
      }}
    >
      <div style={{
        position: 'absolute', top: '2px',
        left: active ? '22px' : '2px',
        width: '20px', height: '20px', borderRadius: '50%',
        background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        transition: 'left 0.22s ease',
      }} />
    </div>
  )
}

/* ─── Fila de contador ──────────────────────────────────────────────── */
function CounterRow({ value, onDec, onInc, maxReached }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <button
        onClick={onDec}
        style={{
          width: '28px', height: '28px', borderRadius: '50%',
          border: '1.5px solid var(--crema-oscuro)',
          background: 'white', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Minus size={13} color="#42261a" strokeWidth={2} />
      </button>
      <span className="font-chreed" style={{ minWidth: '18px', textAlign: 'center', color: 'var(--cafe)', fontSize: '1rem' }}>
        {value}
      </span>
      <button
        onClick={onInc}
        disabled={maxReached}
        style={{
          width: '28px', height: '28px', borderRadius: '50%',
          border: 'none',
          background: maxReached ? '#e8ddd4' : 'var(--primario)',
          cursor: maxReached ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: maxReached ? 0.5 : 1,
        }}
      >
        <Plus size={13} color="#fff" strokeWidth={2} />
      </button>
    </div>
  )
}

export default function CartPage() {
  const navigate = useNavigate()
  const { items, updateQty, extras, setExtras, paymentMethod, setPaymentMethod } = useCartStore()
  const subtotal = items.reduce((a, i) => a + i.precio * i.qty, 0)

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
    <div
      className="page-enter"
      style={{
        maxWidth: '640px', margin: '0 auto',
        paddingBottom: 'max(40px, env(safe-area-inset-bottom))',
        minHeight: 'calc(100dvh - 68px)',
      }}
    >
      {/* ── Encabezado ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 16px 8px', borderBottom: '1px solid var(--crema-oscuro)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IC icon={ShoppingCart} size={20} color="var(--cafe)" />
          <h2 className="font-chreed" style={{ fontSize: '1.4rem', color: 'var(--cafe)' }}>Tu Pedido</h2>
        </div>
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver al menú"
          style={{
            background: 'var(--crema-oscuro)', border: 'none', borderRadius: '50%',
            width: '34px', height: '34px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <IC icon={ArrowLeft} size={16} color="var(--cafe-medio)" />
        </button>
      </div>

      <div style={{ padding: '0 16px' }}>

        {/* ── Estado vacío ── */}
        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 16px' }}>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
              <ShoppingCart size={52} color="#d4c5b2" strokeWidth={1.5} />
            </div>
            <p className="font-chreed" style={{ fontSize: '1.2rem', color: 'var(--cafe)', marginBottom: '6px' }}>Tu pedido está vacío</p>
            <p className="font-brinnan" style={{ color: 'var(--cafe-medio)', fontSize: '0.9rem', marginBottom: '20px' }}>¡Elige algo delicioso!</p>
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

        {/* ── Lista de productos ── */}
        {items.length > 0 && (
          <>
            <div style={{ padding: '12px 0' }}>
              {items.map(item => (
                <div
                  key={item.key}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 0', borderBottom: '1px solid var(--crema-oscuro)',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <button
                      onClick={() => updateQty(item.key, -1)}
                      aria-label="Reducir cantidad"
                      style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        border: '1.5px solid var(--crema-oscuro)',
                        background: 'white', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <IC icon={Minus} size={13} color="var(--cafe-medio)" />
                    </button>
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
                      }}
                    >
                      <IC icon={Plus} size={13} color="#fff" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div style={{
              borderTop: '2px solid var(--crema-oscuro)', paddingTop: '14px', marginTop: '4px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px',
            }}>
              <span className="font-brinnan" style={{ color: 'var(--cafe-medio)', fontWeight: 700, fontSize: '0.9rem' }}>Subtotal</span>
              <span className="font-chreed" style={{ color: 'var(--cafe)', fontSize: '1.6rem' }}>{formatCOP(subtotal)}</span>
            </div>

            {/* ── SECCIÓN A: ¿Deseas agregar? ── */}
            <div style={{
              background: '#faf8f5', border: '1.5px solid var(--crema-oscuro)',
              borderRadius: '16px', padding: '16px', marginBottom: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <IC icon={UtensilsCrossed} size={18} color="#42261a" />
                <h3 className="font-chreed" style={{ fontSize: '1rem', color: 'var(--cafe)', margin: 0 }}>¿Deseas agregar?</h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IC icon={ScrollText} size={16} color="#42261a" />
                  <span className="font-brinnan" style={{ fontSize: '0.9rem', color: 'var(--cafe)', fontWeight: 700 }}>Servilletas</span>
                </div>
                <Toggle active={extras.servilletas} onToggle={() => handleServilletas(!extras.servilletas)} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IC icon={Droplets} size={16} color="#42261a" />
                  <span className="font-brinnan" style={{ fontSize: '0.9rem', color: 'var(--cafe)', fontWeight: 700 }}>Salsas</span>
                </div>
                <Toggle active={extras.salsas} onToggle={() => handleSalsas(!extras.salsas)} />
              </div>

              {/* Contadores de salsas — CSS collapse */}
              <div
                className={'collapse-panel' + (extras.salsas ? ' open' : ' closed')}
                style={{ marginTop: extras.salsas ? '14px' : 0 }}
              >
                <p className="font-brinnan" style={{ fontSize: '0.75rem', color: 'var(--cafe-medio)', margin: '0 0 10px' }}>
                  Máx. 1 salsa por producto pedido ({maxSalsas} en total)
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span className="font-brinnan" style={{ fontSize: '0.88rem', color: 'var(--cafe)', fontWeight: 700 }}>Tártara</span>
                  <CounterRow value={extras.tartara} onDec={() => changeSalsa('tartara', -1)} onInc={() => changeSalsa('tartara', 1)} maxReached={extras.tartara + extras.pina >= maxSalsas} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="font-brinnan" style={{ fontSize: '0.88rem', color: 'var(--cafe)', fontWeight: 700 }}>Piña</span>
                  <CounterRow value={extras.pina} onDec={() => changeSalsa('pina', -1)} onInc={() => changeSalsa('pina', 1)} maxReached={extras.tartara + extras.pina >= maxSalsas} />
                </div>
              </div>
            </div>

            {/* ── SECCIÓN B: ¿Cómo vas a pagar? ── */}
            <div style={{
              background: '#faf8f5', border: '1.5px solid var(--crema-oscuro)',
              borderRadius: '16px', padding: '16px', marginBottom: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <IC icon={Banknote} size={18} color="#42261a" />
                <h3 className="font-chreed" style={{ fontSize: '1rem', color: 'var(--cafe)', margin: 0 }}>¿Cómo vas a pagar?</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PAYMENT_METHODS.map(pm => (
                  <div key={pm.id}>
                    <button
                      onClick={() => setPaymentMethod(paymentMethod === pm.id ? null : pm.id)}
                      style={{
                        width: '100%',
                        border: `2px solid ${paymentMethod === pm.id ? pm.color : '#e8ddd4'}`,
                        borderRadius: paymentMethod === pm.id ? '12px 12px 0 0' : '12px',
                        padding: '12px 14px',
                        background: paymentMethod === pm.id ? pm.bg : '#fff',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <pm.Icon
                        size={20}
                        color={paymentMethod === pm.id ? pm.color : '#42261a'}
                        strokeWidth={2}
                        style={{ flexShrink: 0 }}
                      />
                      <span className="font-brinnan" style={{
                        fontWeight: 800, fontSize: '0.9rem',
                        color: paymentMethod === pm.id ? pm.color : 'var(--cafe)',
                        flex: 1, textAlign: 'left',
                      }}>
                        {pm.label}
                      </span>
                      <ChevronRight
                        size={16}
                        color="var(--cafe-medio)"
                        strokeWidth={2}
                        style={{
                          flexShrink: 0,
                          transition: 'transform 0.2s ease',
                          transform: paymentMethod === pm.id ? 'rotate(90deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>

                    <div
                      className={'collapse-panel' + (paymentMethod === pm.id ? ' open' : ' closed')}
                      style={{
                        background: pm.bg,
                        border: paymentMethod === pm.id ? `2px solid ${pm.color}` : 'none',
                        borderTop: 'none',
                        borderRadius: '0 0 12px 12px',
                      }}
                    >
                      {pm.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="font-chreed"
              style={{
                width: '100%', background: 'var(--primario)',
                color: 'white', border: 'none', borderRadius: '12px',
                padding: '16px', fontSize: '1.15rem', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(235,30,85,0.4)',
                minHeight: '54px', marginBottom: '8px',
              }}
            >
              Continuar con el pedido →
            </button>

            <p className="font-brinnan" style={{ textAlign: 'center', color: 'var(--cafe-medio)', fontSize: '0.75rem', marginTop: '6px', marginBottom: '4px' }}>
              {paymentMethod
                ? `Pagarás con ${PAYMENT_METHODS.find(p => p.id === paymentMethod)?.label}`
                : 'Pago al recibir'}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

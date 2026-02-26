import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'

const WHATSAPP_NUMBER = '573150642289'

const CAT_LABELS = {
  clasicas:     { label: 'Arepas Clásicas',      emoji: '🫓' },
  especiales:   { label: 'Arepas Especiales',     emoji: '🌟' },
  desgranadas:  { label: 'Arepas Desgranadas',    emoji: '🌽' },
  chicharronas: { label: 'Arepas Chicharronas',   emoji: '🐷' },
  hamburguesas: { label: 'Arepas Hamburguesa',    emoji: '🍔' },
  parrilla:     { label: 'Parrilla',              emoji: '🥩' },
  delicias:     { label: 'Delicias de mi Tierra', emoji: '🍲' },
  frias:        { label: 'Bebidas Frías',         emoji: '🍹' },
  calientes:    { label: 'Bebidas Calientes',     emoji: '☕' },
  adicionales:  { label: 'Adicionales',           emoji: '➕' },
  quesudita:    { label: 'Tu Quesudita',          emoji: '🧀' },
}

const CAT_ORDER = ['clasicas','especiales','desgranadas','chicharronas','hamburguesas','parrilla','delicias','frias','calientes','quesudita','adicionales']

export default function ConfirmacionPage() {
  const navigate  = useNavigate()
  const { lastOrder, clearCart, sede } = useCartStore()
  const fired = useRef(false)

  useEffect(() => {
    if (!lastOrder) navigate('/menu', { replace: true })
  }, [lastOrder, navigate])

  useEffect(() => {
    if (!lastOrder || fired.current) return
    fired.current = true
    const burst = (ratio, opts) =>
      confetti({
        origin: { y: 0.55 },
        colors: ['#ffffff', '#f9ac31', '#fff1d2', '#eb1e55', '#42261a'],
        particleCount: Math.floor(220 * ratio),
        ...opts,
      })
    setTimeout(() => {
      burst(0.25, { spread: 26, startVelocity: 55 })
      burst(0.20, { spread: 60 })
      burst(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
      burst(0.10, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
      burst(0.10, { spread: 120, startVelocity: 45 })
    }, 180)
  }, [lastOrder])

  if (!lastOrder) return null

  const pedido = lastOrder

  /* ── Construir mensaje WhatsApp con categorías (AJUSTE 4) ── */
  const itemsByCat = {}
  pedido.items.forEach(item => {
    const cat = item.cat || 'adicionales'
    if (!itemsByCat[cat]) itemsByCat[cat] = []
    itemsByCat[cat].push(item)
  })
  const catsPresentes = CAT_ORDER.filter(c => itemsByCat[c]?.length > 0)

  const lineasPorCategoria = catsPresentes.map(cat => {
    const catInfo = CAT_LABELS[cat] || { label: cat, emoji: '📦' }
    const lineasCat = itemsByCat[cat].map(i => {
      let linea = `  • ${i.qty}× ${i.nombre} — ${formatCOP(i.subtotal)}`
      if (i.cat === 'quesudita' && i.nota) {
        linea += `\n    ${i.nota}`
      } else if (i.nota) {
        linea += `\n    📝 ${i.nota}`
      }
      return linea
    }).join('\n')
    return `${catInfo.emoji} ${catInfo.label}:\n${lineasCat}`
  }).join('\n\n')

  const extrasLinea = pedido.extras
    ? [
        pedido.extras.servilletas && '🧻 Servilletas',
        pedido.extras.tartara > 0 && `Salsa Tártara ×${pedido.extras.tartara}`,
        pedido.extras.pina > 0 && `Salsa Piña ×${pedido.extras.pina}`,
      ].filter(Boolean).join(', ')
    : ''

  const PAYMENT_LABELS = { nequi: 'Nequi 📱', bancolombia: 'Bancolombia 🏦', efectivo: 'Efectivo 💵' }

  const waTexto = encodeURIComponent(
    `¡Hola! Acabo de hacer un pedido en Mijarepas 🫓\n\n` +
    `👤 Nombre: ${pedido.nombre}\n` +
    `📞 Teléfono: ${pedido.telefono}\n` +
    (sede ? `🏪 Sede: ${sede}\n` : '') +
    `📍 Dirección: ${pedido.direccion || 'No especificada'}\n` +
    (pedido.especificaciones ? `📝 Especificaciones: ${pedido.especificaciones}\n` : '') +
    `\n` +
    `🛒 Pedido:\n${lineasPorCategoria}\n\n` +
    (extrasLinea ? `➕ Extras: ${extrasLinea}\n\n` : '') +
    `💰 Total: ${formatCOP(pedido.total)}\n` +
    `🛵 + Valor del domicilio cobrado por la empresa encargada\n` +
    (pedido.paymentMethod ? `💳 Método de pago: ${PAYMENT_LABELS[pedido.paymentMethod] || pedido.paymentMethod}\n` : '') +
    `\n¡Por favor confirmen mi pedido! 🙏`
  )
  const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${waTexto}`

  const handleReset = () => {
    clearCart()
    navigate('/menu', { replace: true })
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundImage: 'url(/images/ilustracion-confirmacion.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {/* Overlay fucsia */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(235,30,85,0.88)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="anim-fadeIn"
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%', maxWidth: '500px',
            padding: '52px 20px 80px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '22px', textAlign: 'center',
          }}
        >

          {/* ✅ Check animado */}
          <div className="anim-scaleInBounce" style={{ fontSize: '5.5rem', lineHeight: 1, filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))' }}>
            ✅
          </div>

          {/* Título + subtítulo */}
          <div className="anim-fadeInUp-d1" style={{ width: '100%' }}>
            <h1
              className="font-chreed"
              style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 7vw, 2.4rem)', lineHeight: 1.15, margin: '0 0 10px' }}
            >
              ¡Gracias por tu pedido! 🎉
            </h1>
            <p
              className="font-brinnan"
              style={{ color: 'rgba(255,241,210,0.93)', fontSize: '0.95rem', lineHeight: 1.55, margin: 0 }}
            >
              Recibimos tu pedido con éxito,{' '}
              <strong style={{ color: '#fff' }}>{pedido.nombre}</strong>.
              {pedido.telefono && (
                <>
                  {' '}Nos contactaremos al{' '}
                  <strong style={{ color: '#fff' }}>{pedido.telefono}</strong>{' '}
                  para coordinar la entrega.
                </>
              )}
            </p>
          </div>

          {/* Resumen del pedido — agrupado por categoría */}
          <div
            className="anim-fadeInUp-d2"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.97)',
              borderRadius: '20px', padding: '20px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
              textAlign: 'left',
            }}
          >
            {/* Badge domicilio */}
            <div style={{ marginBottom: '14px' }}>
              <span
                className="font-brinnan"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  background: 'var(--crema)', borderRadius: '50px',
                  padding: '5px 13px', fontSize: '0.82rem',
                  fontWeight: 800, color: 'var(--cafe-medio)',
                }}
              >
                🛵 Domicilio
              </span>
            </div>

            {sede && (
              <p className="font-brinnan" style={{ fontSize: '0.8rem', color: 'var(--cafe-medio)', marginBottom: '4px' }}>
                🏪 Sede {sede}
              </p>
            )}
            {pedido.direccion && (
              <p className="font-brinnan" style={{ fontSize: '0.8rem', color: 'var(--cafe-medio)', marginBottom: pedido.especificaciones ? '4px' : '12px' }}>
                📍 {pedido.direccion}
              </p>
            )}
            {pedido.especificaciones && (
              <p className="font-brinnan" style={{ fontSize: '0.78rem', color: 'var(--cafe-medio)', marginBottom: '12px', lineHeight: 1.4, opacity: 0.85 }}>
                📝 {pedido.especificaciones}
              </p>
            )}

            {/* Lista agrupada por categoría */}
            <div style={{ borderTop: '1px solid var(--crema-oscuro)', paddingTop: '12px', marginBottom: '8px' }}>
              {catsPresentes.map((cat, catIdx) => {
                const catInfo = CAT_LABELS[cat] || { label: cat, emoji: '📦' }
                return (
                  <div key={cat} style={{ marginBottom: '10px' }}>
                    <p className="font-chreed" style={{ fontSize: '0.82rem', color: '#42261a', margin: '0 0 6px' }}>
                      {catInfo.emoji} {catInfo.label}
                    </p>
                    {itemsByCat[cat].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '6px', paddingLeft: '8px' }}>
                        <div style={{ flex: 1 }}>
                          <span className="font-brinnan" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cafe)' }}>
                            ×{item.qty} {item.nombre}
                          </span>
                          {item.cat === 'quesudita' && item.nota && (
                            <span className="font-brinnan" style={{ display: 'block', fontSize: '0.7rem', fontStyle: 'italic', color: 'var(--cafe-medio)', marginTop: '1px' }}>
                              {item.nota}
                            </span>
                          )}
                          {item.cat !== 'quesudita' && item.nota && (
                            <span className="font-brinnan" style={{ display: 'block', fontSize: '0.7rem', fontStyle: 'italic', color: '#eb1e55', marginTop: '1px' }}>
                              📝 {item.nota}
                            </span>
                          )}
                        </div>
                        <span className="font-chreed" style={{ fontSize: '0.85rem', color: 'var(--cafe)', flexShrink: 0 }}>
                          {formatCOP(item.subtotal)}
                        </span>
                      </div>
                    ))}
                    {catIdx < catsPresentes.length - 1 && (
                      <div style={{ borderBottom: '1px dashed var(--crema-oscuro)', margin: '8px 0' }} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Subtotal / Domicilio / Total */}
            <div style={{ borderTop: '1.5px solid var(--crema-oscuro)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="font-brinnan" style={{ fontSize: '0.82rem', color: 'var(--cafe-medio)' }}>Subtotal</span>
                <span className="font-brinnan" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cafe)' }}>{formatCOP(pedido.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className="font-brinnan" style={{ fontSize: '0.79rem', color: 'var(--cafe-medio)', lineHeight: 1.4, opacity: 0.9 }}>
                  🛵 + Valor del domicilio cobrado por la empresa encargada
                </span>
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderTop: '2px solid var(--crema-oscuro)', paddingTop: '9px', marginTop: '2px',
              }}>
                <span className="font-brinnan" style={{ fontWeight: 800, color: 'var(--cafe-medio)', fontSize: '0.9rem' }}>Total</span>
                <span className="font-chreed" style={{ fontSize: '1.55rem', color: 'var(--primario)' }}>{formatCOP(pedido.total)}</span>
              </div>
            </div>

            {/* Método de pago */}
            <div style={{ background: 'var(--crema)', borderRadius: '10px', padding: '9px 13px', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span>💳</span>
              <span className="font-brinnan" style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--cafe-medio)' }}>
                {pedido.paymentMethod
                  ? ({ nequi: 'Nequi 📱', bancolombia: 'Bancolombia 🏦', efectivo: 'Efectivo 💵' }[pedido.paymentMethod] || 'Pago al recibir')
                  : 'Pago al recibir'}
              </span>
            </div>
            {/* Extras */}
            {pedido.extras && (pedido.extras.servilletas || pedido.extras.tartara > 0 || pedido.extras.pina > 0) && (
              <div style={{ background: 'var(--crema)', borderRadius: '10px', padding: '9px 13px', marginTop: '8px' }}>
                <span className="font-brinnan" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--cafe-medio)' }}>
                  ➕ Extras:{' '}
                  {[
                    pedido.extras.servilletas && '🧻 Servilletas',
                    pedido.extras.tartara > 0 && `Tártara ×${pedido.extras.tartara}`,
                    pedido.extras.pina > 0 && `Piña ×${pedido.extras.pina}`,
                  ].filter(Boolean).join(' · ')}
                </span>
              </div>
            )}
          </div>

          {/* Tiempo estimado */}
          <div
            className="anim-fadeInUp-d3"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.28)',
              borderRadius: '16px', padding: '14px 18px',
            }}
          >
            <p className="font-brinnan" style={{ margin: 0, color: '#fff', fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.45 }}>
              🚀 ¡Tu pedido saldrá lo más pronto posible!
            </p>
          </div>

          {/* Botón WhatsApp */}
          <a
            href={waURL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-chreed anim-fadeInUp-d4"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              width: '100%', background: '#25D366', color: '#fff',
              borderRadius: '50px', padding: '16px 24px',
              fontSize: '1.1rem', minHeight: '54px',
              boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
              textDecoration: 'none', cursor: 'pointer',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22" style={{ flexShrink: 0 }} aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Confirmar por WhatsApp 💬
          </a>

          {/* Hacer otro pedido */}
          <button
            onClick={handleReset}
            className="font-chreed anim-fadeInUp-d5"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.15)',
              color: '#fff', border: '2px solid rgba(255,255,255,0.55)',
              borderRadius: '50px', padding: '14px 24px',
              fontSize: '1rem', minHeight: '52px', cursor: 'pointer',
            }}
          >
            Hacer otro pedido 🫓
          </button>

        </div>
      </div>
    </div>
  )
}

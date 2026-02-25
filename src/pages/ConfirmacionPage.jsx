import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'

const WHATSAPP_NUMBER = '573150642289'

/* ─── tiny spring helper ─────────────────────────────────────────── */
const spring = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay },
})

export default function ConfirmacionPage() {
  const navigate  = useNavigate()
  const { lastOrder, clearCart } = useCartStore()
  const fired = useRef(false)

  /* ── guard: acceso directo sin pedido → menu ── */
  useEffect(() => {
    if (!lastOrder) navigate('/menu', { replace: true })
  }, [lastOrder, navigate])

  /* ── confetti al montar ── */
  useEffect(() => {
    if (!lastOrder || fired.current) return
    fired.current = true
    const burst = (ratio, opts) =>
      confetti({
        origin: { y: 0.55 },
        colors: ['#ffffff', '#F0A500', '#FFF5E4', '#C8334A', '#5C3317'],
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

  /* ── WhatsApp message ── */
  const lineas = pedido.items
    .map(i => `• ${i.qty}× ${i.nombre}${i.nota ? ` (${i.nota})` : ''} — ${formatCOP(i.subtotal)}`)
    .join('\n')

  const waTexto = encodeURIComponent(
    `¡Hola! Acabo de hacer un pedido en Mijarepas 🫓\n\n` +
    `👤 Nombre: ${pedido.nombre}\n` +
    `📞 Teléfono: ${pedido.telefono}\n` +
    `📍 Dirección: ${pedido.direccion || 'No especificada'}\n\n` +
    `🛒 Pedido:\n${lineas}\n\n` +
    `Subtotal: ${formatCOP(pedido.subtotal)}\n` +
    `🛵 Domicilio: ${formatCOP(pedido.costoDomicilio)}\n` +
    `💰 Total: ${formatCOP(pedido.total)}\n\n` +
    `¡Por favor confirmen mi pedido! 🙏`
  )
  const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${waTexto}`

  /* ── reset: limpiar carrito + lastOrder + ir al menu ── */
  const handleReset = () => {
    clearCart()
    navigate('/menu', { replace: true })
  }

  return (
    <motion.div
      className="grain-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        background: 'var(--primario)',
        minHeight: '100dvh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '52px 20px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '22px',
          textAlign: 'center',
        }}
      >

        {/* ── ✅ Check animado ── */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
          style={{ fontSize: '5.5rem', lineHeight: 1, filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.25))' }}
        >
          ✅
        </motion.div>

        {/* ── Título + subtítulo ── */}
        <motion.div {...spring(0.28)} style={{ width: '100%' }}>
          <h1
            className="font-fredoka"
            style={{
              color: '#ffffff',
              fontSize: 'clamp(1.8rem, 7vw, 2.4rem)',
              lineHeight: 1.15,
              margin: '0 0 10px',
            }}
          >
            ¡Gracias por tu pedido! 🎉
          </h1>
          <p
            className="font-nunito"
            style={{
              color: 'rgba(255,245,228,0.92)',
              fontSize: '0.95rem',
              lineHeight: 1.55,
              margin: 0,
            }}
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
        </motion.div>

        {/* ── Resumen del pedido ── */}
        <motion.div
          {...spring(0.42)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.22)',
            textAlign: 'left',
          }}
        >
          {/* Badge domicilio */}
          <div style={{ marginBottom: '14px' }}>
            <span
              className="font-nunito"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'var(--crema)',
                borderRadius: '50px',
                padding: '5px 13px',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: 'var(--cafe-medio)',
              }}
            >
              🛵 Domicilio
            </span>
          </div>

          {/* Dirección */}
          {pedido.direccion && (
            <p
              className="font-nunito"
              style={{
                fontSize: '0.8rem',
                color: 'var(--cafe-medio)',
                marginBottom: '12px',
              }}
            >
              📍 {pedido.direccion}
            </p>
          )}

          {/* Lista de productos */}
          <div
            style={{
              borderTop: '1px solid var(--crema-oscuro)',
              paddingTop: '12px',
              marginBottom: '8px',
            }}
          >
            {pedido.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginBottom: '9px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <span
                    className="font-nunito"
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: 'var(--cafe-oscuro)',
                    }}
                  >
                    ×{item.qty} {item.nombre}
                  </span>
                  {item.nota && (
                    <span
                      className="font-nunito"
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        fontStyle: 'italic',
                        color: 'var(--cafe-medio)',
                        marginTop: '1px',
                      }}
                    >
                      {item.nota}
                    </span>
                  )}
                </div>
                <span
                  className="font-fredoka"
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--cafe-oscuro)',
                    flexShrink: 0,
                  }}
                >
                  {formatCOP(item.subtotal)}
                </span>
              </div>
            ))}
          </div>

          {/* Subtotal / Domicilio / Total */}
          <div
            style={{
              borderTop: '1.5px solid var(--crema-oscuro)',
              paddingTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="font-nunito" style={{ fontSize: '0.82rem', color: 'var(--cafe-medio)' }}>
                Subtotal
              </span>
              <span className="font-nunito" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cafe-oscuro)' }}>
                {formatCOP(pedido.subtotal)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="font-nunito" style={{ fontSize: '0.82rem', color: 'var(--cafe-medio)' }}>
                🛵 Domicilio
              </span>
              <span className="font-nunito" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cafe-oscuro)' }}>
                {formatCOP(pedido.costoDomicilio)}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '2px solid var(--crema-oscuro)',
                paddingTop: '9px',
                marginTop: '2px',
              }}
            >
              <span className="font-nunito" style={{ fontWeight: 800, color: 'var(--cafe-medio)', fontSize: '0.9rem' }}>
                Total
              </span>
              <span className="font-fredoka" style={{ fontSize: '1.55rem', color: 'var(--primario)' }}>
                {formatCOP(pedido.total)}
              </span>
            </div>
          </div>

          {/* Pago al recibir */}
          <div
            style={{
              background: 'var(--crema)',
              borderRadius: '10px',
              padding: '9px 13px',
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
            }}
          >
            <span style={{ fontSize: '1rem' }}>💰</span>
            <span className="font-nunito" style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--cafe-medio)' }}>
              Pago al recibir
            </span>
          </div>
        </motion.div>

        {/* ── Tiempo estimado ── */}
        <motion.div
          {...spring(0.54)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.28)',
            borderRadius: '16px',
            padding: '14px 18px',
          }}
        >
          <p
            className="font-nunito"
            style={{
              margin: 0,
              color: '#fff',
              fontSize: '0.92rem',
              fontWeight: 700,
              lineHeight: 1.45,
            }}
          >
            ⏱️ Tu domicilio llegará en aproximadamente{' '}
            <strong>40 minutos</strong>
          </p>
        </motion.div>

        {/* ── Botón WhatsApp ── */}
        <motion.a
          href={waURL}
          target="_blank"
          rel="noopener noreferrer"
          {...spring(0.64)}
          whileTap={{ scale: 0.96 }}
          className="font-fredoka"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            background: '#25D366',
            color: '#fff',
            borderRadius: '50px',
            padding: '16px 24px',
            fontSize: '1.1rem',
            minHeight: '54px',
            boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="22"
            height="22"
            style={{ flexShrink: 0 }}
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          Confirmar por WhatsApp 💬
        </motion.a>

        {/* ── Botón "Hacer otro pedido" ── */}
        <motion.button
          {...spring(0.72)}
          whileTap={{ scale: 0.96 }}
          onClick={handleReset}
          className="font-fredoka"
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.15)',
            color: '#fff',
            border: '2px solid rgba(255,255,255,0.55)',
            borderRadius: '50px',
            padding: '14px 24px',
            fontSize: '1rem',
            minHeight: '52px',
            cursor: 'pointer',
          }}
        >
          Hacer otro pedido 🫓
        </motion.button>

      </div>
    </motion.div>
  )
}

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { formatCOP } from '../utils/formatCOP'

const WHATSAPP_NUMBER = '573150642289'

export default function SuccessScreen({ pedido, onReset }) {
  const confettiFired = useRef(false)

  useEffect(() => {
    if (confettiFired.current) return
    confettiFired.current = true

    // Multi-burst confetti
    const fire = (particleRatio, opts) => {
      confetti({
        origin: { y: 0.6 },
        colors: ['#C8334A', '#F0A500', '#FFF5E4', '#5C3317', '#ffffff'],
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      })
    }

    setTimeout(() => {
      fire(0.25, { spread: 26, startVelocity: 55 })
      fire(0.2, { spread: 60 })
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
      fire(0.1, { spread: 120, startVelocity: 45 })
    }, 200)
  }, [])

  // Build a personalised WhatsApp message including the customer's name
  const whatsappMsg = encodeURIComponent(
    `Hola, acabo de hacer un pedido en Mijarepas. Mi nombre es ${pedido.nombre} y mi número es ${pedido.telefono}.`
  )
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`

  return (
    <motion.div
      className="grain-overlay"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'var(--rojo-mijarepas)',
        minHeight: '100dvh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
      }}
    >
      <div style={{
        width: '100%', maxWidth: '500px', padding: '48px 24px 80px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '20px', textAlign: 'center',
      }}>
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.15 }}
          style={{ fontSize: '5rem', lineHeight: 1 }}
        >
          ✅
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h1 className="font-fredoka" style={{ color: 'white', fontSize: '2.2rem', marginBottom: '6px' }}>
            ¡Gracias por tu pedido! 🎉
          </h1>
          <p className="font-nunito" style={{ color: 'rgba(255,245,228,0.9)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Recibimos tu pedido con éxito, <strong>{pedido.nombre}</strong>.
            {pedido.telefono && (
              <>
                {' '}Nos pondremos en contacto contigo al{' '}
                <strong>{pedido.telefono}</strong> para coordinar la entrega.
              </>
            )}
          </p>
        </motion.div>

        {/* Order summary card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: 'var(--blanco)', borderRadius: '20px',
            padding: '20px', width: '100%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          {/* Domicilio badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'var(--crema)', borderRadius: '50px',
            padding: '6px 14px', marginBottom: '16px',
          }}>
            <span className="font-nunito" style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--cafe-medio)' }}>
              🛵 Domicilio
            </span>
          </div>

          {pedido.direccion && (
            <p className="font-nunito" style={{ fontSize: '0.8rem', color: 'var(--cafe-medio)', marginBottom: '12px', textAlign: 'left' }}>
              📍 {pedido.direccion}
            </p>
          )}

          {/* Items list */}
          <div style={{ borderTop: '1px solid var(--crema-oscuro)', paddingTop: '12px' }}>
            {pedido.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: '8px',
                  gap: '8px',
                }}
              >
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <span className="font-nunito" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--cafe-oscuro)' }}>
                    ×{item.qty} {item.nombre}
                  </span>
                  {item.nota && (
                    <span className="font-nunito" style={{ fontSize: '0.72rem', color: 'var(--cafe-medio)', display: 'block', fontStyle: 'italic' }}>
                      {item.nota}
                    </span>
                  )}
                </div>
                <span className="font-fredoka" style={{ color: 'var(--cafe-oscuro)', fontSize: '0.9rem', flexShrink: 0 }}>
                  {formatCOP(item.subtotal)}
                </span>
              </div>
            ))}
          </div>

          {/* Cost breakdown */}
          <div style={{ borderTop: '1px solid var(--crema-oscuro)', marginTop: '8px', paddingTop: '10px' }}>
            {/* Subtotal row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span className="font-nunito" style={{ fontSize: '0.8rem', color: 'var(--cafe-medio)' }}>Subtotal</span>
              <span className="font-nunito" style={{ fontSize: '0.8rem', color: 'var(--cafe-oscuro)', fontWeight: 700 }}>
                {formatCOP(pedido.subtotal ?? pedido.total)}
              </span>
            </div>
            {/* Domicilio row */}
            {pedido.costoDomicilio != null && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="font-nunito" style={{ fontSize: '0.8rem', color: 'var(--cafe-medio)' }}>🛵 Domicilio</span>
                <span className="font-nunito" style={{ fontSize: '0.8rem', color: 'var(--cafe-oscuro)', fontWeight: 700 }}>
                  {formatCOP(pedido.costoDomicilio)}
                </span>
              </div>
            )}
            {/* Total row */}
            <div style={{
              borderTop: '2px solid var(--crema-oscuro)',
              marginTop: '6px', paddingTop: '10px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span className="font-nunito" style={{ fontWeight: 800, color: 'var(--cafe-medio)' }}>Total</span>
              <span className="font-fredoka" style={{ fontSize: '1.5rem', color: 'var(--rojo-mijarepas)' }}>
                {formatCOP(pedido.total)}
              </span>
            </div>
          </div>

          {/* Payment notice */}
          <div style={{
            background: 'var(--crema)', borderRadius: '12px',
            padding: '10px 14px', marginTop: '12px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>💰</span>
            <span className="font-nunito" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cafe-medio)' }}>
              Pago al recibir
            </span>
          </div>
        </motion.div>

        {/* ── Estimated time ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '16px',
            padding: '14px 20px',
            width: '100%',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          <p
            className="font-nunito"
            style={{
              color: 'var(--cafe-oscuro)',
              fontSize: '0.9rem',
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            ⏱️ Tu domicilio llegará en aproximadamente <strong>40 minutos</strong>
          </p>
        </motion.div>

        {/* ── WhatsApp confirmation button ── */}
        <motion.a
          href={whatsappURL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          whileTap={{ scale: 0.96 }}
          className="font-fredoka"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            background: '#25D366',
            color: 'white',
            borderRadius: '50px',
            padding: '15px 28px',
            fontSize: '1.05rem',
            cursor: 'pointer',
            minHeight: '52px',
            boxShadow: '0 4px 18px rgba(37,211,102,0.4)',
            textDecoration: 'none',
          }}
        >
          {/* WhatsApp SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="22"
            height="22"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Confirmar por WhatsApp
        </motion.a>

        {/* Reset CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          whileTap={{ scale: 0.96 }}
          onClick={onReset}
          className="font-fredoka"
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white', border: '2px solid rgba(255,255,255,0.5)',
            borderRadius: '50px', padding: '14px 32px',
            fontSize: '1rem', cursor: 'pointer', minHeight: '52px',
          }}
        >
          Hacer otro pedido 🫓
        </motion.button>
      </div>
    </motion.div>
  )
}

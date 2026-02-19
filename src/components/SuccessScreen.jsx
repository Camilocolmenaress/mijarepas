import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { formatCOP } from '../utils/formatCOP'

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

  const tipoLabel = pedido.tipo === 'domicilio' ? '🛵 Domicilio' : '🪑 Para la Mesa'

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
            ¡Pedido enviado!
          </h1>
          <p className="font-nunito" style={{ color: 'rgba(255,245,228,0.9)', fontSize: '1rem' }}>
            Gracias, <strong>{pedido.nombre}</strong> 🎉
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
          {/* Type badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'var(--crema)', borderRadius: '50px',
            padding: '6px 14px', marginBottom: '16px',
          }}>
            <span className="font-nunito" style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--cafe-medio)' }}>
              {tipoLabel}
            </span>
            {pedido.mesa && (
              <span className="font-nunito" style={{ fontSize: '0.85rem', color: 'var(--cafe-medio)' }}>
                — Mesa {pedido.mesa}
              </span>
            )}
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

          {/* Total */}
          <div style={{
            borderTop: '2px solid var(--crema-oscuro)',
            marginTop: '8px', paddingTop: '12px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span className="font-nunito" style={{ fontWeight: 800, color: 'var(--cafe-medio)' }}>Total</span>
            <span className="font-fredoka" style={{ fontSize: '1.5rem', color: 'var(--rojo-mijarepas)' }}>
              {formatCOP(pedido.total)}
            </span>
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

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
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

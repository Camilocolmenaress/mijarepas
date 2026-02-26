import { useEffect } from 'react'

export default function PromoPopup({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="anim-fadeIn"
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(66,38,26,0.65)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        className="anim-scaleIn"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Promoción del día"
        style={{
          background: '#ffffff', borderRadius: '24px', padding: '0',
          maxWidth: '360px', width: '100%', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(66,38,26,0.35)', position: 'relative',
        }}
      >
        {/* Header fucsia */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primario) 0%, #a01040 100%)',
          padding: '32px 24px 24px', textAlign: 'center', position: 'relative',
        }}>
          <button
            onClick={onClose}
            aria-label="Cerrar promoción"
            style={{
              position: 'absolute', top: '12px', right: '12px',
              background: 'rgba(255,255,255,0.2)', border: 'none',
              borderRadius: '50%', width: '32px', height: '32px',
              color: 'white', fontSize: '1.1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
            }}
          >✕</button>

          <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>🫓🔥</div>

          <div
            className="font-brinnan"
            style={{
              display: 'inline-block', background: 'var(--secundario)', color: 'var(--cafe)',
              borderRadius: '50px', padding: '4px 14px',
              fontSize: '0.75rem', fontWeight: 800, marginBottom: '12px',
            }}
          >
            ¡PROMO DEL DÍA!
          </div>

          <h2 className="font-chreed" style={{ color: 'white', fontSize: '1.6rem', lineHeight: 1.2, margin: 0 }}>
            Arepa Ocañerisima
          </h2>
          <p className="font-chreed" style={{ color: 'var(--secundario)', fontSize: '1.1rem', marginTop: '4px' }}>
            + Granizada Gratis
          </p>
        </div>

        {/* Cuerpo */}
        <div style={{ padding: '20px 24px 24px', textAlign: 'center' }}>
          <p className="font-brinnan" style={{ color: 'var(--cafe-medio)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
            Pide la Ocañerisima hoy y te llevamos una granizada de naranja gratis.
            ¡Solo por tiempo limitado! 🎉
          </p>

          <button
            onClick={onClose}
            className="font-chreed"
            style={{
              width: '100%', background: 'var(--primario)',
              color: 'white', border: 'none', borderRadius: '12px',
              padding: '16px', fontSize: '1.1rem', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(235,30,85,0.4)', minHeight: '52px',
            }}
          >
            ¡Lo quiero! 🛒
          </button>

          <button
            onClick={onClose}
            className="font-brinnan"
            style={{
              background: 'none', border: 'none', color: 'var(--cafe-medio)',
              fontSize: '0.85rem', marginTop: '12px', cursor: 'pointer', textDecoration: 'underline',
            }}
          >
            Ver el menú completo
          </button>
        </div>
      </div>
    </div>
  )
}

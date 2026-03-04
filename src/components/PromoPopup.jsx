import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'

export default function PromoPopup({ promo, onClose }) {
  const navigate = useNavigate()
  const { addItem } = useCartStore()

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!promo) return null

  const handleLoQuiero = () => {
    addItem(
      {
        id: `promo-${promo.id}`,
        nombre: promo.titulo,
        precio: promo.precio,
        cat: 'promocion',
        emoji: '🎉',
      },
      1,
      `PROMOCIÓN - ${promo.descripcion}`
    )
    onClose()
    navigate('/carrito')
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'promoOverlayIn 0.3s ease forwards',
      }}
    >
      {/* Fondo oscuro */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
        }}
      />

      {/* Modal */}
      <div
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Promocion especial"
        style={{
          position: 'relative',
          background: '#E12B4E',
          borderRadius: '20px',
          maxWidth: '380px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          animation: 'promoModalIn 0.35s ease forwards',
        }}
      >
        {/* Boton cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 2,
            background: 'rgba(0,0,0,0.35)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            color: '#FFFFFF',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Imagen de la promo */}
        {promo.imagen_url && (
          <img
            src={promo.imagen_url}
            alt={promo.titulo}
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}

        {/* Contenido */}
        <div style={{ padding: '20px 20px 24px' }}>
          {/* Etiqueta */}
          <div
            className="font-brinnan"
            style={{
              display: 'inline-block',
              background: 'rgba(0,0,0,0.2)',
              color: '#FFFFFF',
              fontSize: '0.68rem',
              padding: '3px 10px',
              borderRadius: '50px',
              marginBottom: '10px',
              letterSpacing: '0.05em',
            }}
          >
            PROMO ESPECIAL
          </div>

          {/* Titulo */}
          <h2
            className="font-chreed-extrabold"
            style={{
              color: '#f9ac31',
              fontSize: '1.5rem',
              lineHeight: 1.15,
              margin: '0 0 8px',
            }}
          >
            {promo.titulo}
          </h2>

          {/* Descripcion */}
          <p
            className="font-brinnan"
            style={{
              color: '#FFFFFF',
              fontSize: '0.85rem',
              lineHeight: 1.45,
              margin: '0 0 14px',
              opacity: 0.92,
            }}
          >
            {promo.descripcion}
          </p>

          {/* Precios */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            {promo.precio_original && (
              <span
                className="font-brinnan"
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '1rem',
                  textDecoration: 'line-through',
                }}
              >
                {formatCOP(promo.precio_original)}
              </span>
            )}
            <span
              className="font-chreed-extrabold"
              style={{
                color: '#FFFFFF',
                fontSize: '1.7rem',
              }}
            >
              {formatCOP(promo.precio)}
            </span>
          </div>

          {/* Boton LO QUIERO */}
          <button
            onClick={handleLoQuiero}
            className="font-chreed-extrabold"
            style={{
              width: '100%',
              background: '#f9ac31',
              color: '#42261a',
              border: 'none',
              borderRadius: '14px',
              padding: '14px 20px',
              fontSize: '1.15rem',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
              letterSpacing: '0.03em',
            }}
          >
            LO QUIERO!
          </button>

          {/* Ahora no */}
          <button
            onClick={onClose}
            className="font-brinnan"
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.65)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              marginTop: '10px',
              padding: '8px',
            }}
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  )
}

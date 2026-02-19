import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'

const BADGE_COLORS = {
  Clásica:       { bg: '#e8f4fd', text: '#1a6b9a' },
  Especial:      { bg: '#fff3cd', text: '#856404' },
  Desgranado:    { bg: '#d1ecf1', text: '#0c5460' },
  Chicharrona:   { bg: '#fde8e8', text: '#842029' },
  Hamburguesa:   { bg: '#f0e8fd', text: '#5a2d82' },
  Compartir:     { bg: '#d4edda', text: '#155724' },
  Desayuno:      { bg: '#fff3e0', text: '#bf360c' },
  Popular:       { bg: '#fce4ec', text: '#880e4f' },
  'Jarra disponible': { bg: '#e3f2fd', text: '#0d47a1' },
  Caliente:      { bg: '#fbe9e7', text: '#bf360c' },
}

export default function ProductCard({ producto }) {
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const [popKey, setPopKey] = useState(0)

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(producto)
    setPopKey(k => k + 1)
    toast(`${producto.emoji} ${producto.nombre} agregada`, {
      style: {
        background: 'var(--cafe-oscuro)', color: 'var(--crema)',
        fontFamily: "'Nunito', sans-serif", fontWeight: 700,
        borderRadius: '12px', fontSize: '0.85rem',
      },
      duration: 1800,
    })
  }

  const badgeStyle = producto.badge ? BADGE_COLORS[producto.badge] || { bg: '#e8e8e8', text: '#333' } : null

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/producto/${producto.id}`)}
      style={{
        background: 'var(--blanco)',
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: 'var(--sombra-calida)',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Badge */}
      {producto.badge && (
        <div
          style={{
            position: 'absolute', top: '8px', left: '8px', zIndex: 2,
            background: badgeStyle.bg, color: badgeStyle.text,
            borderRadius: '50px', padding: '2px 8px',
            fontSize: '0.65rem', fontWeight: 800,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          {producto.badge}
        </div>
      )}

      {/* Image area — prepared for future <img> */}
      <div
        className="product-image-area"
        style={{
          background: 'linear-gradient(135deg, var(--crema) 0%, var(--crema-oscuro) 100%)',
          height: '100px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.8rem',
          lineHeight: 1,
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {producto.emoji}
      </div>

      {/* Content */}
      <div style={{ padding: '10px 10px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3
          className="font-fredoka"
          style={{
            fontSize: '0.95rem', color: 'var(--cafe-oscuro)', lineHeight: 1.2,
            marginBottom: '3px',
          }}
        >
          {producto.nombre}
        </h3>

        {producto.desc && (
          <p
            className="font-nunito line-clamp-2"
            style={{
              fontSize: '0.72rem', color: 'var(--cafe-medio)',
              lineHeight: 1.4, flex: 1, marginBottom: '8px',
            }}
          >
            {producto.desc}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <span
            className="font-fredoka"
            style={{ color: 'var(--rojo-mijarepas)', fontSize: '1rem' }}
          >
            {formatCOP(producto.precio)}
          </span>

          <motion.button
            key={popKey}
            initial={popKey > 0 ? { scale: 1.4 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            onClick={handleAdd}
            aria-label={`Agregar ${producto.nombre}`}
            style={{
              background: 'var(--rojo-mijarepas)',
              color: 'white', border: 'none',
              borderRadius: '50%', width: '32px', height: '32px',
              fontSize: '1.1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(200,51,74,0.35)',
              flexShrink: 0,
            }}
          >
            +
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

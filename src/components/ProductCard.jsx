import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'

/* Badges con colores de marca */
const BADGE_COLORS = {
  Clásica:            { bg: '#e3f6ff', text: '#00afec' },   /* azul marca */
  Especial:           { bg: '#fff3cd', text: '#c47a00' },
  Desgranado:         { bg: '#e3f6ff', text: '#00afec' },
  Chicharrona:        { bg: '#ffe0e8', text: '#eb1e55' },   /* fucsia marca */
  Hamburguesa:        { bg: '#f0e8fd', text: '#5a2d82' },
  Compartir:          { bg: '#d4f0e3', text: '#007d3e' },   /* verde marca */
  Desayuno:           { bg: '#fff3e0', text: '#c47a00' },
  Popular:            { bg: '#ffe0e8', text: '#eb1e55' },
  'Jarra disponible': { bg: '#e3f6ff', text: '#00afec' },
  Caliente:           { bg: '#fbe9e7', text: '#bf360c' },
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
        background: 'var(--cafe)', color: 'var(--crema)',
        fontFamily: "'Nunito', sans-serif", fontWeight: 700,
        borderRadius: '12px', fontSize: '0.85rem',
      },
      duration: 1800,
    })
  }

  const badgeStyle = producto.badge
    ? BADGE_COLORS[producto.badge] || { bg: '#e8e8e8', text: '#555' }
    : null

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/producto/${producto.id}`)}
      style={{
        background: '#ffffff',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: 'var(--sombra)',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        /* Borde izquierdo dorado — identidad visual de la marca */
        borderLeft: '4px solid var(--secundario)',
      }}
    >
      {/* Badge */}
      {producto.badge && (
        <div
          style={{
            position: 'absolute', top: '8px', left: '8px', zIndex: 2,
            background: badgeStyle.bg, color: badgeStyle.text,
            borderRadius: '50px', padding: '2px 8px',
            fontSize: '0.63rem', fontWeight: 800,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          {producto.badge}
        </div>
      )}

      {/* Área de imagen / emoji */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--crema) 0%, var(--crema-oscuro) 100%)',
          height: '100px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.8rem', lineHeight: 1,
          position: 'relative', overflow: 'hidden', flexShrink: 0,
        }}
      >
        {producto.img ? (
          <img
            src={producto.img}
            alt={producto.nombre}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              display: 'block',
            }}
          />
        ) : (
          producto.emoji
        )}
      </div>

      {/* Contenido */}
      <div style={{ padding: '10px 10px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Nombre — Fredoka One, café oscuro */}
        <h3
          className="font-fredoka"
          style={{
            fontSize: '0.95rem', color: 'var(--cafe)',
            lineHeight: 1.2, marginBottom: '3px',
          }}
        >
          {producto.nombre}
        </h3>

        {producto.desc && (
          <p
            className="font-nunito line-clamp-2"
            style={{ fontSize: '0.72rem', color: 'var(--cafe-medio)', lineHeight: 1.4, flex: 1, marginBottom: '8px' }}
          >
            {producto.desc}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          {/* Precio — fucsia, Nunito bold */}
          <span
            className="font-nunito"
            style={{ color: 'var(--primario)', fontSize: '1rem', fontWeight: 800 }}
          >
            {formatCOP(producto.precio)}
          </span>

          {/* Botón + */}
          <motion.button
            key={popKey}
            initial={popKey > 0 ? { scale: 1.4 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            onClick={handleAdd}
            aria-label={`Agregar ${producto.nombre}`}
            style={{
              background: 'var(--primario)',
              color: 'white', border: 'none',
              borderRadius: '50%', width: '32px', height: '32px',
              fontSize: '1.1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(235,30,85,0.35)',
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

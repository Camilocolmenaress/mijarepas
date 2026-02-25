import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import useCartStore from '../store/useCartStore'
import { productos } from '../data/menu'
import { formatCOP } from '../utils/formatCOP'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCartStore()

  const producto = productos.find(p => p.id === id)
  const [qty, setQty] = useState(1)
  const [nota, setNota] = useState('')
  const [added, setAdded] = useState(false)
  const backRef = useRef(null)

  useEffect(() => {
    if (!producto) navigate('/menu', { replace: true })
  }, [producto, navigate])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleBack() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/menu')
  }

  const handleAdd = () => {
    addItem(producto, qty, nota)
    setAdded(true)
    toast(`${producto.emoji} ${producto.nombre} — ×${qty} agregada`, {
      style: {
        background: 'var(--cafe)', color: 'var(--crema)',
        fontFamily: "'Nunito', sans-serif", fontWeight: 700, borderRadius: '12px',
      },
      duration: 2000,
    })
    setTimeout(handleBack, 350)
  }

  if (!producto) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.22 }}
      style={{
        minHeight: '100dvh', background: '#ffffff',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
      }}
    >
      {/* Área imagen */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--crema) 0%, var(--crema-oscuro) 100%)',
          height: '220px', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '5rem', lineHeight: 1, flexShrink: 0, overflow: 'hidden',
        }}
      >
        {producto.emoji}

        {/* Botón volver */}
        <button
          ref={backRef}
          onClick={handleBack}
          aria-label="Volver"
          style={{
            position: 'absolute', top: '14px', left: '14px',
            background: 'rgba(255,255,255,0.9)',
            border: 'none', borderRadius: '50%',
            width: '40px', height: '40px', cursor: 'pointer',
            fontSize: '1.1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            color: 'var(--cafe)',
          }}
        >←</button>

        {/* Badge — dorado */}
        {producto.badge && (
          <div
            style={{
              position: 'absolute', bottom: '12px', left: '12px',
              background: 'var(--secundario)', color: 'var(--cafe)',
              borderRadius: '50px', padding: '4px 12px',
              fontSize: '0.75rem', fontWeight: 800,
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {producto.badge}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div style={{ padding: '20px 20px 0', maxWidth: '640px', margin: '0 auto' }}>
        {/* Nombre — Fredoka One, café */}
        <h2
          className="font-fredoka"
          style={{ fontSize: '1.6rem', color: 'var(--cafe)', marginBottom: '6px', lineHeight: 1.1 }}
        >
          {producto.nombre}
        </h2>

        {producto.desc && (
          <p className="font-nunito" style={{ color: 'var(--cafe-medio)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '12px' }}>
            {producto.desc}
          </p>
        )}

        {/* Precio — fucsia, Nunito bold */}
        <p className="font-nunito" style={{ color: 'var(--primario)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '20px' }}>
          {formatCOP(producto.precio)}
        </p>

        {/* Selector de cantidad */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            aria-label="Reducir cantidad"
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '2px solid var(--crema-oscuro)',
              background: qty <= 1 ? 'var(--crema)' : '#ffffff',
              color: qty <= 1 ? 'var(--crema-oscuro)' : 'var(--cafe)',
              fontSize: '1.3rem', cursor: qty <= 1 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Fredoka One', cursive",
            }}
          >−</button>

          <motion.span
            key={qty}
            initial={{ scale: 1.3 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 14 }}
            className="font-fredoka"
            style={{ fontSize: '1.5rem', color: 'var(--cafe)', minWidth: '32px', textAlign: 'center' }}
          >
            {qty}
          </motion.span>

          <button
            onClick={() => setQty(q => q + 1)}
            aria-label="Aumentar cantidad"
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: 'none', background: 'var(--primario)',
              color: 'white', fontSize: '1.3rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Fredoka One', cursive",
              boxShadow: '0 3px 10px rgba(235,30,85,0.35)',
            }}
          >+</button>
        </div>

        {/* Nota especial */}
        <textarea
          value={nota}
          onChange={e => setNota(e.target.value)}
          placeholder="¿Alguna nota? (sin ají, extra queso...)"
          maxLength={150}
          rows={2}
          className="font-nunito"
          style={{
            width: '100%', borderRadius: '12px',
            border: '1.5px solid var(--crema-oscuro)',
            padding: '12px 14px', fontSize: '0.875rem',
            color: 'var(--cafe)', background: 'var(--crema)',
            resize: 'none', outline: 'none',
            fontFamily: "'Nunito', sans-serif",
            lineHeight: 1.5, marginBottom: '16px',
            boxSizing: 'border-box',
          }}
        />

        {/* Botón agregar — fucsia, border-radius 12px */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className="font-fredoka"
          style={{
            width: '100%',
            background: added ? 'var(--verde)' : 'var(--primario)',
            color: 'white', border: 'none', borderRadius: '12px',
            padding: '16px', fontSize: '1.15rem', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(235,30,85,0.35)',
            minHeight: '54px', transition: 'background 0.2s',
            marginBottom: '8px',
          }}
        >
          {added ? '✅ ¡Agregado!' : `Agregar al pedido 🛒 — ${formatCOP(producto.precio * qty)}`}
        </motion.button>
      </div>
    </motion.div>
  )
}

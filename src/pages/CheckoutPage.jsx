import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'
import { detectarUbicacion } from '../utils/geolocation'

const COSTO_DOMICILIO = 3000

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, setLastOrder } = useCartStore()
  const subtotal = items.reduce((a, i) => a + i.precio * i.qty, 0)
  const total = subtotal + COSTO_DOMICILIO

  const [nombre, setNombre] = useState(() => localStorage.getItem('mijarepas_nombre') || '')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [loadingGeo, setLoadingGeo] = useState(false)
  const [nombreError, setNombreError] = useState(false)
  const [telefonoError, setTelefonoError] = useState(false)

  const nombreRef = useRef(null)
  const telefonoRef = useRef(null)

  useEffect(() => {
    if (items.length === 0) navigate('/menu', { replace: true })
  }, [items, navigate])

  const handleGeolocate = async () => {
    setLoadingGeo(true)
    try {
      const addr = await detectarUbicacion()
      setDireccion(addr)
      toast.success('📍 Ubicación detectada', {
        style: { fontFamily: "'Nunito', sans-serif", fontWeight: 700, borderRadius: '12px' },
      })
    } catch (e) {
      toast.error(e.message || 'No se pudo detectar la ubicación. Escríbela manualmente.', {
        style: { fontFamily: "'Nunito', sans-serif", fontWeight: 700, borderRadius: '12px' },
      })
    } finally {
      setLoadingGeo(false)
    }
  }

  const shake = (ref) => {
    ref.current?.classList.add('shake')
    setTimeout(() => ref.current?.classList.remove('shake'), 500)
  }

  const handleSubmit = () => {
    if (!nombre.trim()) {
      setNombreError(true)
      nombreRef.current?.focus()
      shake(nombreRef)
      toast.error('¡Escribe tu nombre para continuar!', {
        style: { fontFamily: "'Nunito', sans-serif", fontWeight: 700, borderRadius: '12px' },
      })
      return
    }
    if (!telefono.trim()) {
      setTelefonoError(true)
      telefonoRef.current?.focus()
      shake(telefonoRef)
      toast.error('El teléfono es obligatorio para coordinar tu domicilio', {
        style: { fontFamily: "'Nunito', sans-serif", fontWeight: 700, borderRadius: '12px' },
      })
      return
    }

    localStorage.setItem('mijarepas_nombre', nombre.trim())

    const pedido = {
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      tipo: 'domicilio',
      mesa: '',
      direccion,
      items: items.map(i => ({
        nombre: i.nombre, qty: i.qty, precio: i.precio,
        nota: i.nota, subtotal: i.precio * i.qty,
      })),
      subtotal,
      costoDomicilio: COSTO_DOMICILIO,
      total,
    }

    setLastOrder(pedido)
    navigate('/confirmacion', { replace: true })
  }

  /* ── Input style helper ── */
  const inputStyle = (hasError) => ({
    width: '100%', borderRadius: '12px',
    border: `1.5px solid ${hasError ? 'var(--primario)' : 'var(--crema-oscuro)'}`,
    padding: '12px 14px', fontSize: '0.9rem',
    color: 'var(--cafe)', background: '#ffffff',
    outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Nunito', sans-serif",
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        maxWidth: '640px', margin: '0 auto',
        paddingBottom: 'max(32px, env(safe-area-inset-bottom))',
        minHeight: 'calc(100dvh - 76px)',
      }}
    >
      {/* Encabezado */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '16px 16px 8px',
        borderBottom: '1px solid var(--crema-oscuro)',
      }}>
        <button
          onClick={() => navigate('/carrito')}
          aria-label="Volver al carrito"
          style={{
            background: 'var(--crema-oscuro)', border: 'none', borderRadius: '50%',
            width: '34px', height: '34px', cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', color: 'var(--cafe-medio)',
          }}
        >←</button>
        <h2 className="font-fredoka" style={{ fontSize: '1.4rem', color: 'var(--cafe)' }}>
          Datos del domicilio
        </h2>
      </div>

      <div style={{ padding: '16px 16px 0' }}>

        {/* Nombre */}
        <div style={{ marginBottom: '14px' }}>
          <label className="font-nunito" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--cafe-medio)', display: 'block', marginBottom: '5px' }}>
            Nombre *
          </label>
          <input
            ref={nombreRef}
            type="text"
            value={nombre}
            onChange={e => { setNombre(e.target.value); setNombreError(false) }}
            placeholder="¿Cómo te llamas?"
            className="font-nunito"
            style={inputStyle(nombreError)}
          />
        </div>

        {/* Teléfono */}
        <div style={{ marginBottom: '14px' }}>
          <label className="font-nunito" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--cafe-medio)', display: 'block', marginBottom: '5px' }}>
            Teléfono *
          </label>
          <input
            ref={telefonoRef}
            type="tel"
            value={telefono}
            onChange={e => { setTelefono(e.target.value); setTelefonoError(false) }}
            placeholder="Tu número de celular"
            className="font-nunito"
            style={inputStyle(telefonoError)}
          />
        </div>

        {/* Dirección */}
        <div style={{ marginBottom: '14px' }}>
          <label className="font-nunito" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--cafe-medio)', display: 'block', marginBottom: '5px' }}>
            Dirección de entrega
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={loadingGeo ? '' : direccion}
              onChange={e => setDireccion(e.target.value)}
              placeholder="Calle, barrio, ciudad..."
              className="font-nunito"
              style={{
                ...inputStyle(false),
                padding: '12px 48px 12px 14px',
                background: loadingGeo ? 'var(--crema)' : '#ffffff',
              }}
            />
            <button
              onClick={handleGeolocate}
              disabled={loadingGeo}
              aria-label="Usar mi ubicación"
              style={{
                position: 'absolute', right: '10px', top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none',
                fontSize: loadingGeo ? '0.8rem' : '1.2rem',
                cursor: loadingGeo ? 'default' : 'pointer',
                padding: '4px',
                color: loadingGeo ? 'var(--cafe-medio)' : 'var(--primario)',
              }}
            >
              {loadingGeo ? '⏳' : '📍'}
            </button>
          </div>
          {/* Hint — solo cuando el campo está vacío */}
          {direccion === '' && !loadingGeo && (
            <p className="font-nunito" style={{ fontSize: '0.72rem', color: 'var(--cafe-medio)', margin: '6px 2px 0', lineHeight: 1.4 }}>
              📍 Toca el ícono de ubicación para detectar tu dirección automáticamente
            </p>
          )}
        </div>

        {/* Resumen de costos */}
        <div style={{ borderTop: '1px solid var(--crema-oscuro)', paddingTop: '16px', marginTop: '4px' }}>
          <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-nunito" style={{ color: 'var(--cafe-medio)', fontSize: '0.85rem' }}>Subtotal</span>
              <span className="font-nunito" style={{ color: 'var(--cafe)', fontSize: '0.85rem', fontWeight: 700 }}>{formatCOP(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-nunito" style={{ color: 'var(--cafe-medio)', fontSize: '0.85rem' }}>🛵 Domicilio</span>
              <span className="font-nunito" style={{ color: 'var(--cafe)', fontSize: '0.85rem', fontWeight: 700 }}>{formatCOP(COSTO_DOMICILIO)}</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderTop: '1.5px solid var(--crema-oscuro)', paddingTop: '8px', marginTop: '2px',
            }}>
              <span className="font-nunito" style={{ color: 'var(--cafe-medio)', fontWeight: 800, fontSize: '0.9rem' }}>Total</span>
              <span className="font-fredoka" style={{ color: 'var(--cafe)', fontSize: '1.6rem' }}>{formatCOP(total)}</span>
            </div>
          </div>

          {/* CTA — fucsia, border-radius 12px */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            className="font-fredoka"
            style={{
              width: '100%', background: 'var(--primario)',
              color: 'white', border: 'none', borderRadius: '12px',
              padding: '16px', fontSize: '1.15rem', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(235,30,85,0.4)',
              minHeight: '54px',
            }}
          >
            ¡Hacer Pedido! 🎉
          </motion.button>

          <p className="font-nunito" style={{ textAlign: 'center', color: 'var(--cafe-medio)', fontSize: '0.75rem', marginTop: '10px' }}>
            💰 Pago al recibir
          </p>
        </div>
      </div>
    </motion.div>
  )
}

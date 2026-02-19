import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'
import { detectarUbicacion } from '../utils/geolocation'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, clearCart, setLastOrder } = useCartStore()
  const total = items.reduce((a, i) => a + i.precio * i.qty, 0)

  const [nombre, setNombre] = useState(
    () => localStorage.getItem('mijarepas_nombre') || ''
  )
  const [telefono, setTelefono] = useState('')
  const [tipoPedido, setTipoPedido] = useState(
    () => sessionStorage.getItem('mijarepas_tipo_pedido') || 'mesa'
  )
  const [direccion, setDireccion] = useState('')
  const [mesa, setMesa] = useState('')
  const [loadingGeo, setLoadingGeo] = useState(false)
  const [nombreError, setNombreError] = useState(false)
  const nombreRef = useRef(null)

  // Guard: if cart is empty navigate to menu
  useEffect(() => {
    if (items.length === 0) {
      navigate('/menu', { replace: true })
    }
  }, [items, navigate])

  // Persist tipo pedido in session
  useEffect(() => {
    sessionStorage.setItem('mijarepas_tipo_pedido', tipoPedido)
  }, [tipoPedido])

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

  const handleSubmit = () => {
    if (!nombre.trim()) {
      setNombreError(true)
      nombreRef.current?.focus()
      nombreRef.current?.classList.add('shake')
      setTimeout(() => nombreRef.current?.classList.remove('shake'), 500)
      toast.error('¡Escribe tu nombre para continuar!', {
        style: { fontFamily: "'Nunito', sans-serif", fontWeight: 700, borderRadius: '12px' },
      })
      return
    }

    localStorage.setItem('mijarepas_nombre', nombre.trim())

    const pedido = {
      nombre: nombre.trim(),
      telefono: tipoPedido === 'domicilio' ? telefono : '',
      tipo: tipoPedido,
      mesa: tipoPedido === 'mesa' ? mesa : '',
      direccion: tipoPedido === 'domicilio' ? direccion : '',
      items: items.map(i => ({
        nombre: i.nombre,
        qty: i.qty,
        precio: i.precio,
        nota: i.nota,
        subtotal: i.precio * i.qty,
      })),
      total,
    }

    // Store order BEFORE clearing the cart
    setLastOrder(pedido)
    clearCart()
    // replace: true so Back from /confirmacion skips /checkout
    navigate('/confirmacion', { replace: true })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        maxWidth: '640px', margin: '0 auto',
        paddingBottom: 'max(32px, env(safe-area-inset-bottom))',
        minHeight: 'calc(100dvh - 68px)',
      }}
    >
      {/* Page header with back button */}
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
        >
          ←
        </button>
        <h2 className="font-fredoka" style={{ fontSize: '1.4rem', color: 'var(--cafe-oscuro)' }}>
          Datos del pedido
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
            style={{
              width: '100%', borderRadius: '12px',
              border: `1.5px solid ${nombreError ? '#C8334A' : 'var(--crema-oscuro)'}`,
              padding: '12px 14px', fontSize: '0.9rem',
              color: 'var(--cafe-oscuro)', background: 'var(--blanco)',
              outline: 'none', boxSizing: 'border-box',
              fontFamily: "'Nunito', sans-serif",
            }}
          />
        </div>

        {/* Tipo de pedido */}
        <div style={{ marginBottom: '14px' }}>
          <label className="font-nunito" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--cafe-medio)', display: 'block', marginBottom: '8px' }}>
            Tipo de pedido
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 'mesa', label: '🪑 Para la Mesa' },
              { id: 'domicilio', label: '🛵 Domicilio' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTipoPedido(t.id)}
                className="font-nunito"
                style={{
                  flex: 1, padding: '10px',
                  borderRadius: '12px',
                  border: `2px solid ${tipoPedido === t.id ? 'var(--rojo-mijarepas)' : 'var(--crema-oscuro)'}`,
                  background: tipoPedido === t.id ? 'rgba(200,51,74,0.08)' : 'var(--blanco)',
                  color: tipoPedido === t.id ? 'var(--rojo-mijarepas)' : 'var(--cafe-medio)',
                  fontWeight: 700, fontSize: '0.85rem',
                  cursor: 'pointer', transition: 'all 0.2s',
                  minHeight: '44px',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mesa (solo si para la mesa) */}
        <AnimatePresence>
          {tipoPedido === 'mesa' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', marginBottom: '14px' }}
            >
              <label className="font-nunito" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--cafe-medio)', display: 'block', marginBottom: '5px' }}>
                Número de mesa (opcional)
              </label>
              <input
                type="number"
                value={mesa}
                onChange={e => setMesa(e.target.value)}
                placeholder="Ej: 5"
                min="1"
                className="font-nunito"
                style={{
                  width: '100px', borderRadius: '12px',
                  border: '1.5px solid var(--crema-oscuro)',
                  padding: '12px 14px', fontSize: '0.9rem',
                  color: 'var(--cafe-oscuro)', background: 'var(--blanco)',
                  outline: 'none', boxSizing: 'border-box',
                  fontFamily: "'Nunito', sans-serif",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Domicilio fields */}
        <AnimatePresence>
          {tipoPedido === 'domicilio' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              {/* Teléfono */}
              <div style={{ marginBottom: '12px' }}>
                <label className="font-nunito" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--cafe-medio)', display: 'block', marginBottom: '5px' }}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                  placeholder="Tu número de celular"
                  className="font-nunito"
                  style={{
                    width: '100%', borderRadius: '12px',
                    border: '1.5px solid var(--crema-oscuro)',
                    padding: '12px 14px', fontSize: '0.9rem',
                    color: 'var(--cafe-oscuro)', background: 'var(--blanco)',
                    outline: 'none', boxSizing: 'border-box',
                    fontFamily: "'Nunito', sans-serif",
                  }}
                />
              </div>

              {/* Dirección con geolocalización */}
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
                      width: '100%', borderRadius: '12px',
                      border: '1.5px solid var(--crema-oscuro)',
                      padding: '12px 48px 12px 14px', fontSize: '0.9rem',
                      color: 'var(--cafe-oscuro)',
                      background: loadingGeo ? 'var(--crema)' : 'var(--blanco)',
                      outline: 'none', boxSizing: 'border-box',
                      fontFamily: "'Nunito', sans-serif",
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
                      color: loadingGeo ? 'var(--cafe-medio)' : 'var(--rojo-mijarepas)',
                    }}
                  >
                    {loadingGeo ? '⏳' : '📍'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Total & Submit */}
        <div style={{
          borderTop: '1px solid var(--crema-oscuro)',
          paddingTop: '16px', marginTop: '4px',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '16px',
          }}>
            <span className="font-nunito" style={{ color: 'var(--cafe-medio)', fontWeight: 700, fontSize: '0.9rem' }}>
              Total
            </span>
            <span className="font-fredoka" style={{ color: 'var(--cafe-oscuro)', fontSize: '1.6rem' }}>
              {formatCOP(total)}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            className="font-fredoka"
            style={{
              width: '100%', background: 'var(--rojo-mijarepas)',
              color: 'white', border: 'none', borderRadius: '50px',
              padding: '16px', fontSize: '1.15rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(200,51,74,0.4)',
              minHeight: '54px',
            }}
          >
            ¡Hacer Pedido! 🎉
          </motion.button>

          <p className="font-nunito" style={{
            textAlign: 'center', color: 'var(--cafe-medio)',
            fontSize: '0.75rem', marginTop: '10px',
          }}>
            💰 Pago al recibir
          </p>
        </div>
      </div>
    </motion.div>
  )
}

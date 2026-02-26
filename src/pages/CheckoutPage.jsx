import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'
import { detectarUbicacion } from '../utils/geolocation'

const PAYMENT_LABELS = { nequi: 'Nequi 📱', bancolombia: 'Bancolombia 🏦', efectivo: 'Efectivo 💵' }

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, setLastOrder, paymentMethod, extras } = useCartStore()
  const subtotal = items.reduce((a, i) => a + i.precio * i.qty, 0)
  const total = subtotal

  const [nombre, setNombre] = useState(() => localStorage.getItem('mijarepas_nombre') || '')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [especificaciones, setEspecificaciones] = useState('')
  const [loadingGeo, setLoadingGeo] = useState(false)
  const [nombreError, setNombreError] = useState(false)
  const [telefonoError, setTelefonoError] = useState(false)
  const [direccionError, setDireccionError] = useState(false)

  const nombreRef = useRef(null)
  const telefonoRef = useRef(null)
  const direccionRef = useRef(null)

  useEffect(() => {
    if (items.length === 0) navigate('/menu', { replace: true })
  }, [items, navigate])

  const handleGeolocate = async () => {
    setLoadingGeo(true)
    try {
      const addr = await detectarUbicacion()
      setDireccion(addr)
      toast.success('📍 Ubicación detectada', {
        style: { fontWeight: 700, borderRadius: '12px' },
      })
    } catch (e) {
      toast.error(e.message || 'No se pudo detectar la ubicación. Escríbela manualmente.', {
        style: { fontWeight: 700, borderRadius: '12px' },
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
        style: { fontWeight: 700, borderRadius: '12px' },
      })
      return
    }
    if (!telefono.trim()) {
      setTelefonoError(true)
      telefonoRef.current?.focus()
      shake(telefonoRef)
      toast.error('El teléfono es obligatorio para coordinar tu domicilio', {
        style: { fontWeight: 700, borderRadius: '12px' },
      })
      return
    }
    if (!direccion.trim()) {
      setDireccionError(true)
      direccionRef.current?.focus()
      shake(direccionRef)
      toast.error('Por favor ingresa tu dirección de entrega', {
        style: { fontWeight: 700, borderRadius: '12px' },
      })
      return
    }

    localStorage.setItem('mijarepas_nombre', nombre.trim())

    const pedido = {
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      tipo: 'domicilio',
      mesa: '',
      direccion: direccion.trim(),
      especificaciones: especificaciones.trim(),
      items: items.map(i => ({
        nombre: i.nombre, qty: i.qty, precio: i.precio,
        nota: i.nota, subtotal: i.precio * i.qty,
        cat: i.cat,
      })),
      subtotal,
      costoDomicilio: 0,
      total,
      paymentMethod: paymentMethod || 'efectivo',
      extras,
    }

    setLastOrder(pedido)
    navigate('/confirmacion', { replace: true })
  }

  const inputStyle = (hasError) => ({
    width: '100%', borderRadius: '12px',
    border: `1.5px solid ${hasError ? 'var(--secundario)' : 'rgba(255,255,255,0.35)'}`,
    padding: '12px 14px', fontSize: '0.9rem',
    color: 'var(--crema)',
    background: 'rgba(255,255,255,0.15)',
    outline: 'none', boxSizing: 'border-box',
  })

  return (
    <div
      style={{
        minHeight: 'calc(100dvh - 64px)',
        backgroundImage: 'url(/images/checkout-bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(66,38,26,0.78)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="page-enter"
        style={{
          position: 'relative', zIndex: 1,
          maxWidth: '640px', margin: '0 auto',
          paddingBottom: 'max(32px, env(safe-area-inset-bottom))',
        }}
      >
        {/* Encabezado */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '16px 16px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
        }}>
          <button
            onClick={() => navigate('/carrito')}
            aria-label="Volver al carrito"
            style={{
              background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '50%', width: '36px', height: '36px',
              cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', color: 'var(--crema)',
            }}
          >←</button>
          <h2 className="font-chreed" style={{ fontSize: '1.4rem', color: '#ffffff' }}>
            Datos del domicilio
          </h2>
        </div>

        <div style={{ padding: '16px 16px 0' }}>

          {/* Nombre */}
          <div style={{ marginBottom: '14px' }}>
            <label className="font-brinnan" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--crema)', display: 'block', marginBottom: '5px', opacity: 0.9 }}>
              Nombre *
            </label>
            <input
              ref={nombreRef}
              type="text"
              value={nombre}
              onChange={e => { setNombre(e.target.value); setNombreError(false) }}
              placeholder="¿Cómo te llamas?"
              className="font-brinnan checkout-input"
              style={inputStyle(nombreError)}
            />
          </div>

          {/* Teléfono */}
          <div style={{ marginBottom: '14px' }}>
            <label className="font-brinnan" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--crema)', display: 'block', marginBottom: '5px', opacity: 0.9 }}>
              Teléfono *
            </label>
            <input
              ref={telefonoRef}
              type="tel"
              value={telefono}
              onChange={e => { setTelefono(e.target.value); setTelefonoError(false) }}
              placeholder="Tu número de celular"
              className="font-brinnan checkout-input"
              style={inputStyle(telefonoError)}
            />
          </div>

          {/* Dirección */}
          <div style={{ marginBottom: '14px' }}>
            <label className="font-brinnan" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--crema)', display: 'block', marginBottom: '5px', opacity: 0.9 }}>
              Dirección de entrega *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                ref={direccionRef}
                type="text"
                value={loadingGeo ? '' : direccion}
                onChange={e => { setDireccion(e.target.value); setDireccionError(false) }}
                placeholder="Calle, barrio, ciudad..."
                className="font-brinnan checkout-input"
                style={{
                  ...inputStyle(direccionError),
                  padding: '12px 48px 12px 14px',
                  background: loadingGeo ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
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
                  padding: '4px', color: 'var(--secundario)',
                }}
              >
                {loadingGeo ? '⏳' : '📍'}
              </button>
            </div>
            {direccionError && (
              <p className="font-brinnan" style={{ fontSize: '0.72rem', color: '#eb1e55', margin: '5px 2px 0', lineHeight: 1.4 }}>
                Por favor ingresa tu dirección de entrega
              </p>
            )}
            {!direccionError && direccion === '' && !loadingGeo && (
              <p className="font-brinnan" style={{ fontSize: '0.72rem', color: 'rgba(255,241,210,0.7)', margin: '6px 2px 0', lineHeight: 1.4 }}>
                📍 Toca el ícono de ubicación para detectar tu dirección automáticamente
              </p>
            )}
          </div>

          {/* Especificaciones adicionales */}
          <div style={{ marginBottom: '14px' }}>
            <label className="font-brinnan" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--crema)', display: 'block', marginBottom: '5px', opacity: 0.9 }}>
              ¿Algo más que debamos saber?
            </label>
            <textarea
              value={especificaciones}
              onChange={e => setEspecificaciones(e.target.value)}
              placeholder="Ej: Apartamento 302, casa esquinera, portón azul, timbre no funciona..."
              rows={3}
              className="font-brinnan checkout-input"
              style={{
                ...inputStyle(false),
                resize: 'vertical',
                minHeight: '72px',
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Resumen de costos */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '16px', marginTop: '4px',
          }}>
            <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-brinnan" style={{ color: 'rgba(255,241,210,0.75)', fontSize: '0.85rem' }}>Subtotal</span>
                <span className="font-brinnan" style={{ color: 'var(--crema)', fontSize: '0.85rem', fontWeight: 700 }}>{formatCOP(subtotal)}</span>
              </div>
              <div style={{ marginTop: '2px' }}>
                <p className="font-brinnan" style={{ color: 'rgba(255,241,210,0.6)', fontSize: '0.78rem', lineHeight: 1.45, margin: 0 }}>
                  🛵 + Valor del domicilio cobrado por la empresa encargada
                </p>
              </div>
              {paymentMethod && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span className="font-brinnan" style={{ color: 'rgba(255,241,210,0.75)', fontSize: '0.85rem' }}>💳 Pago</span>
                  <span className="font-brinnan" style={{ color: 'var(--crema)', fontSize: '0.85rem', fontWeight: 700 }}>
                    {PAYMENT_LABELS[paymentMethod]}
                  </span>
                </div>
              )}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderTop: '1.5px solid rgba(255,255,255,0.2)', paddingTop: '8px', marginTop: '8px',
              }}>
                <span className="font-brinnan" style={{ color: 'rgba(255,241,210,0.9)', fontWeight: 800, fontSize: '0.9rem' }}>Total</span>
                <span className="font-chreed" style={{ color: 'var(--secundario)', fontSize: '1.7rem' }}>{formatCOP(total)}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleSubmit}
              className="font-chreed"
              style={{
                width: '100%', background: 'var(--primario)',
                color: 'white', border: 'none', borderRadius: '12px',
                padding: '16px', fontSize: '1.15rem', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(235,30,85,0.5)',
                minHeight: '54px',
                transition: 'opacity 0.15s ease',
              }}
            >
              ¡Hacer Pedido! 🎉
            </button>

            <p className="font-brinnan" style={{ textAlign: 'center', color: 'rgba(255,241,210,0.65)', fontSize: '0.75rem', marginTop: '10px' }}>
              💰 Pago al recibir
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

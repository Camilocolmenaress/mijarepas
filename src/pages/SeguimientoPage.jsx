import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { formatCOP } from '../utils/formatCOP'

// ── Configuración de estados ──────────────────────────────────────────────────
const ESTADOS = ['recibido', 'en_preparacion', 'listo', 'entregado']

const ESTADO_CONFIG = {
  recibido: {
    color:   '#eb1e55',
    bg:      'rgba(235,30,85,0.10)',
    label:   'Recibido',
    emoji:   '🍽️',
    mensaje: '¡Tu pedido fue recibido! Pronto empezamos a prepararlo.',
    icon:    '📋',
  },
  en_preparacion: {
    color:   '#f9ac31',
    bg:      'rgba(249,172,49,0.12)',
    label:   'En preparación',
    emoji:   '👨‍🍳',
    mensaje: '¡Tu pedido está siendo preparado con mucho amor!',
    icon:    '🔥',
  },
  listo: {
    color:   '#007d3e',
    bg:      'rgba(0,125,62,0.10)',
    label:   '¡Listo!',
    emoji:   '✅',
    mensaje: '¡Tu pedido está listo! Ya viene en camino.',
    icon:    '🛵',
  },
  entregado: {
    color:   '#00afec',
    bg:      'rgba(0,175,236,0.10)',
    label:   'Entregado',
    emoji:   '🎉',
    mensaje: '¡Tu pedido fue entregado! ¡Buen provecho!',
    icon:    '🎊',
  },
}

function formatHora(iso) {
  return new Date(iso).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true })
}

// ── Confetti CSS puro para estado entregado ───────────────────────────────────
const CONFETTI_STYLE = `
@keyframes confetti-fall {
  0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
.confetti-piece {
  position: fixed;
  width: 10px; height: 10px;
  top: -10px;
  border-radius: 2px;
  animation: confetti-fall linear infinite;
  pointer-events: none;
  z-index: 0;
}
@keyframes pulse-dot {
  0%, 100% { transform: scale(1);    opacity: 1;   }
  50%       { transform: scale(1.35); opacity: 0.7; }
}
@keyframes estado-entrada {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
`

const CONFETTI_COLORS = ['#eb1e55', '#f9ac31', '#fff1d2', '#007d3e', '#00afec', '#ffffff']

function ConfettiRain() {
  const pieces = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i / 18) * 100 + Math.random() * 5}%`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    duration: `${2.5 + Math.random() * 2}s`,
    delay: `${Math.random() * 2}s`,
    size: `${8 + Math.random() * 8}px`,
  }))
  return (
    <>
      {pieces.map((p, i) => (
        <div key={i} className="confetti-piece" style={{
          left: p.left, background: p.color,
          width: p.size, height: p.size,
          animationDuration: p.duration, animationDelay: p.delay,
        }} />
      ))}
    </>
  )
}

// ── Barra de progreso ─────────────────────────────────────────────────────────
function BarraProgreso({ estado }) {
  const idx = ESTADOS.indexOf(estado)

  return (
    <div style={{ width: '100%', padding: '0 4px' }}>
      {/* Línea conectora + dots */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Línea de fondo */}
        <div style={{
          position: 'absolute', top: '50%', left: '16px', right: '16px',
          height: '3px', background: 'rgba(66,38,26,0.12)', transform: 'translateY(-50%)',
          borderRadius: '2px',
        }} />
        {/* Línea de progreso */}
        <div style={{
          position: 'absolute', top: '50%', left: '16px',
          height: '3px', borderRadius: '2px',
          background: ESTADO_CONFIG[estado]?.color || '#42261a',
          transform: 'translateY(-50%)',
          width: idx === 0 ? '0%' : idx === 1 ? '33%' : idx === 2 ? '66%' : '100%',
          transition: 'width 0.6s ease',
        }} />

        {/* Dots por estado */}
        {ESTADOS.map((e, i) => {
          const completado = i < idx
          const activo     = i === idx
          const cfg        = ESTADO_CONFIG[e]
          return (
            <div key={e} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: activo ? '36px' : '28px',
                height: activo ? '36px' : '28px',
                borderRadius: '50%',
                background: completado || activo ? cfg.color : 'rgba(66,38,26,0.1)',
                border: activo ? `3px solid ${cfg.color}` : `2px solid ${completado ? cfg.color : 'rgba(66,38,26,0.15)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: completado ? '0.85rem' : activo ? '1.1rem' : '0.75rem',
                color: completado || activo ? '#fff' : 'rgba(66,38,26,0.3)',
                boxShadow: activo ? `0 0 0 5px ${cfg.color}28` : 'none',
                animation: activo ? 'pulse-dot 1.6s ease-in-out infinite' : 'none',
                transition: 'all 0.4s ease',
              }}>
                {completado ? '✓' : cfg.icon}
              </div>
              <span className="font-brinnan" style={{
                fontSize: '0.62rem',
                color: activo ? cfg.color : completado ? 'rgba(66,38,26,0.6)' : 'rgba(66,38,26,0.3)',
                textAlign: 'center', lineHeight: 1.2,
                maxWidth: '56px',
              }}>
                {cfg.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function SeguimientoPage() {
  const { pedidoId } = useParams()
  const navigate = useNavigate()
  const [pedido, setPedido]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [noEncontrado, setNoEncontrado] = useState(false)

  useEffect(() => {
    if (!pedidoId) { setNoEncontrado(true); setLoading(false); return }

    async function cargarPedido() {
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .eq('id', pedidoId)
        .single()
      if (error || !data) { setNoEncontrado(true) }
      else { setPedido(data) }
      setLoading(false)
    }
    cargarPedido()

    // Realtime: escuchar solo los UPDATEs de este pedido específico
    const channel = supabase
      .channel(`seguimiento-${pedidoId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'pedidos', filter: `id=eq.${pedidoId}` },
        (payload) => { setPedido(payload.new) }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [pedidoId])

  // ── No encontrado ──
  if (!loading && noEncontrado) {
    return (
      <div style={{
        minHeight: '100dvh', background: '#fff1d2',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '32px 20px', textAlign: 'center', gap: '16px',
      }}>
        <span style={{ fontSize: '4rem' }}>🔍</span>
        <h2 className="font-chreed" style={{ fontSize: '1.5rem', color: '#42261a' }}>
          Pedido no encontrado
        </h2>
        <p className="font-brinnan" style={{ color: 'rgba(66,38,26,0.6)', fontSize: '0.9rem', maxWidth: '280px', lineHeight: 1.5 }}>
          No encontramos este pedido. Puede que el enlace sea incorrecto o el pedido haya expirado.
        </p>
        <button
          onClick={() => navigate('/menu')}
          className="font-chreed"
          style={{
            background: '#eb1e55', color: '#fff', border: 'none',
            borderRadius: '50px', padding: '14px 28px', fontSize: '1rem',
            cursor: 'pointer', marginTop: '8px',
          }}
        >
          Ir al menú 🫓
        </button>
      </div>
    )
  }

  // ── Loading ──
  if (loading || !pedido) {
    return (
      <div style={{
        minHeight: '100dvh', background: '#fff1d2',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            border: '3px solid rgba(66,38,26,0.15)',
            borderTop: '3px solid #eb1e55',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 14px',
          }} />
          <p className="font-healing" style={{ color: 'rgba(66,38,26,0.5)', fontSize: '1rem' }}>
            Buscando tu pedido...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  const cfg      = ESTADO_CONFIG[pedido.estado] || ESTADO_CONFIG.recibido
  const entregado = pedido.estado === 'entregado'

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#fff1d2',
      overflowY: 'auto',
      position: 'relative',
    }}>
      <style>{CONFETTI_STYLE}</style>

      {entregado && <ConfettiRain />}

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '480px', margin: '0 auto',
        padding: '0 0 max(32px, env(safe-area-inset-bottom))',
      }}>

        {/* ── Header ── */}
        <div style={{
          background: '#42261a',
          padding: '14px 16px 14px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: '34px', height: '34px',
              color: '#fff1d2', fontSize: '1rem', cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >←</button>
          <div>
            <h1 className="font-chreed" style={{ fontSize: '1.15rem', color: '#fff1d2', lineHeight: 1 }}>
              Seguimiento de pedido
            </h1>
            <p className="font-brinnan" style={{ fontSize: '0.7rem', color: 'rgba(255,241,210,0.55)', lineHeight: 1, marginTop: '3px' }}>
              Actualización en tiempo real
            </p>
          </div>
          {/* Indicador live */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#007d3e',
              animation: 'pulse-dot 1.4s ease-in-out infinite',
            }} />
            <span className="font-brinnan" style={{ fontSize: '0.65rem', color: 'rgba(255,241,210,0.6)' }}>
              En vivo
            </span>
          </div>
        </div>

        {/* ── Estado actual (card destacada) ── */}
        <div style={{
          margin: '16px 16px 0',
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 4px 24px rgba(66,38,26,0.10)',
          overflow: 'hidden',
          animation: 'estado-entrada 0.4s ease',
        }}>
          {/* Banner de color del estado */}
          <div style={{
            background: cfg.color,
            padding: '20px 20px 16px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '3.2rem', lineHeight: 1, marginBottom: '8px' }}>
              {cfg.emoji}
            </div>
            <h2 className="font-chreed" style={{ fontSize: '1.5rem', color: '#fff', lineHeight: 1.1, margin: '0 0 6px' }}>
              {cfg.label}
            </h2>
            <p className="font-brinnan" style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.45 }}>
              {cfg.mensaje}
            </p>
          </div>

          {/* Barra de progreso */}
          <div style={{ padding: '20px 16px 16px', background: '#fff' }}>
            <BarraProgreso estado={pedido.estado} />
          </div>
        </div>

        {/* ── Resumen del pedido ── */}
        <div style={{
          margin: '12px 16px 0',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 12px rgba(66,38,26,0.07)',
          overflow: 'hidden',
        }}>
          {/* Header resumen */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid rgba(66,38,26,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span className="font-healing" style={{ fontSize: '1rem', color: '#42261a' }}>
              Tu pedido
            </span>
            <span className="font-brinnan" style={{ fontSize: '0.72rem', color: 'rgba(66,38,26,0.45)' }}>
              {formatHora(pedido.created_at)}
            </span>
          </div>

          <div style={{ padding: '12px 16px 16px' }}>
            {/* Cliente + sede */}
            <div style={{
              display: 'flex', gap: '8px', flexWrap: 'wrap',
              marginBottom: '12px', alignItems: 'center',
            }}>
              <span className="font-healing" style={{ fontSize: '1rem', color: '#42261a' }}>
                {pedido.cliente_nombre}
              </span>
              {pedido.sede && (
                <span style={{
                  background: '#42261a', color: '#fff1d2',
                  borderRadius: '10px', padding: '2px 9px',
                  fontSize: '0.7rem', fontFamily: 'Brinnan',
                }}>
                  📍 Sede {pedido.sede}
                </span>
              )}
            </div>

            {/* Dirección */}
            <p className="font-brinnan" style={{
              fontSize: '0.78rem', color: 'rgba(66,38,26,0.6)',
              marginBottom: '12px', lineHeight: 1.45,
            }}>
              📍 {pedido.direccion}
              {pedido.especificaciones && (
                <><br /><span style={{ opacity: 0.75 }}>📝 {pedido.especificaciones}</span></>
              )}
            </p>

            {/* Productos */}
            <div style={{ borderTop: '1px solid rgba(66,38,26,0.07)', paddingTop: '10px', marginBottom: '10px' }}>
              {(pedido.productos || []).map((p, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', gap: '8px', marginBottom: '6px',
                }}>
                  <span className="font-brinnan" style={{ fontSize: '0.83rem', color: '#42261a', flex: 1, lineHeight: 1.35 }}>
                    <span style={{ fontFamily: 'Chreed', color: '#eb1e55', fontSize: '0.88rem' }}>{p.cantidad}×</span>{' '}{p.nombre}
                    {p.notas && (
                      <span style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(66,38,26,0.5)', lineHeight: 1.3 }}>
                        📝 {p.notas}
                      </span>
                    )}
                  </span>
                  <span className="font-brinnan" style={{ fontSize: '0.78rem', color: 'rgba(66,38,26,0.55)', whiteSpace: 'nowrap' }}>
                    {formatCOP(p.subtotal)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total + método de pago */}
            <div style={{
              borderTop: '1.5px solid rgba(66,38,26,0.1)',
              paddingTop: '10px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span className="font-brinnan" style={{ fontSize: '0.78rem', color: 'rgba(66,38,26,0.5)' }}>
                {{ nequi: 'Nequi 📱', bancolombia: 'Bancolombia 🏦', efectivo: 'Efectivo 💵' }[pedido.metodo_pago] || 'Pago al recibir'}
              </span>
              <span className="font-chreed" style={{ fontSize: '1.35rem', color: '#42261a' }}>
                {formatCOP(pedido.total)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Mensaje entregado ── */}
        {entregado && (
          <div style={{
            margin: '12px 16px 0',
            background: 'linear-gradient(135deg, #007d3e, #009b4e)',
            borderRadius: '16px',
            padding: '18px 20px',
            textAlign: 'center',
          }}>
            <p className="font-chreed" style={{ fontSize: '1.3rem', color: '#fff', margin: '0 0 6px' }}>
              ¡Buen provecho! 🎉
            </p>
            <p className="font-brinnan" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', margin: '0 0 14px', lineHeight: 1.45 }}>
              Gracias por elegir Mijarepas. ¡Vuelve pronto!
            </p>
            <button
              onClick={() => navigate('/menu')}
              className="font-chreed"
              style={{
                background: 'rgba(255,255,255,0.2)', color: '#fff',
                border: '2px solid rgba(255,255,255,0.5)',
                borderRadius: '50px', padding: '10px 24px',
                fontSize: '0.95rem', cursor: 'pointer',
              }}
            >
              Pedir de nuevo 🫓
            </button>
          </div>
        )}

        {/* ── Nota pie ── */}
        <p className="font-brinnan" style={{
          textAlign: 'center', fontSize: '0.72rem',
          color: 'rgba(66,38,26,0.35)', padding: '16px 20px 0',
          lineHeight: 1.5,
        }}>
          Esta página se actualiza automáticamente cuando el restaurante cambia el estado de tu pedido.
        </p>

      </div>
    </div>
  )
}

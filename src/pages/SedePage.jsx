import { useState } from 'react'
import useCartStore from '../store/useCartStore'

const SEDES = ['Aurora', 'Lagos', 'Mutis', 'Piedecuesta']

export default function SedePage({ onSedeSelected }) {
  const { setSede } = useCartStore()
  const [sedeActiva, setSedeActiva] = useState(null)

  const handleSeleccionar = (sede) => {
    setSedeActiva(sede)
  }

  const handleConfirmar = () => {
    if (!sedeActiva) return
    setSede(sedeActiva)
    onSedeSelected()
  }

  return (
    <div
      className="anim-fadeIn"
      style={{
        minHeight: '100dvh',
        background: '#42261a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px 48px',
      }}
    >
      {/* Logo pequeño */}
      <img
        src="/images/logo-transparente.png"
        alt="Mijarepas"
        style={{ height: '56px', width: 'auto', objectFit: 'contain', marginBottom: '32px' }}
        className="anim-fadeInUp-d1"
      />

      {/* Título */}
      <div className="anim-fadeInUp-d1" style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h1
          className="font-chreed"
          style={{ color: '#f9ac31', fontSize: 'clamp(1.7rem, 6vw, 2.2rem)', lineHeight: 1.1, margin: 0 }}
        >
          ¿En cuál sede
        </h1>
        <h1
          className="font-chreed"
          style={{ color: '#fff1d2', fontSize: 'clamp(1.7rem, 6vw, 2.2rem)', lineHeight: 1.1, margin: '2px 0 0' }}
        >
          deseas ordenar?
        </h1>
      </div>

      <p
        className="font-brinnan anim-fadeInUp-d2"
        style={{ color: 'rgba(255,241,210,0.6)', fontSize: '0.88rem', marginBottom: '32px', textAlign: 'center' }}
      >
        Selecciona tu sede para continuar
      </p>

      {/* Cards de sede */}
      <div
        className="anim-fadeInUp-d2"
        style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '380px' }}
      >
        {SEDES.map(sede => {
          const activa = sedeActiva === sede
          return (
            <button
              key={sede}
              onClick={() => handleSeleccionar(sede)}
              className="font-healing"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                width: '100%',
                minHeight: '64px',
                padding: '16px 20px',
                borderRadius: '16px',
                border: `2px solid ${activa ? '#f9ac31' : 'rgba(255,241,210,0.18)'}`,
                background: activa ? 'rgba(249,172,49,0.15)' : 'rgba(255,241,210,0.06)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.18s ease',
              }}
            >
              {/* Ícono de pin */}
              <span
                style={{
                  fontSize: '1.3rem',
                  flexShrink: 0,
                  filter: activa ? 'none' : 'grayscale(0.4) opacity(0.7)',
                  transition: 'filter 0.18s ease',
                }}
              >
                📍
              </span>

              {/* Nombre */}
              <span
                style={{
                  flex: 1,
                  color: activa ? '#f9ac31' : '#fff1d2',
                  fontSize: '1.35rem',
                  lineHeight: 1.1,
                  transition: 'color 0.18s ease',
                }}
              >
                {sede}
              </span>

              {/* Check */}
              {activa && (
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>✓</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Botón confirmar */}
      <div className="anim-fadeInUp-d3" style={{ width: '100%', maxWidth: '380px', marginTop: '28px' }}>
        <button
          onClick={handleConfirmar}
          disabled={!sedeActiva}
          className="font-chreed"
          style={{
            width: '100%',
            minHeight: '56px',
            padding: '15px 24px',
            borderRadius: '50px',
            border: 'none',
            background: sedeActiva ? '#eb1e55' : 'rgba(255,241,210,0.12)',
            color: sedeActiva ? '#fff' : 'rgba(255,241,210,0.3)',
            fontSize: '1.05rem',
            cursor: sedeActiva ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            boxShadow: sedeActiva ? '0 4px 24px rgba(235,30,85,0.4)' : 'none',
          }}
        >
          {sedeActiva ? `Ver menú — Sede ${sedeActiva} 🫓` : 'Selecciona una sede'}
        </button>
      </div>
    </div>
  )
}

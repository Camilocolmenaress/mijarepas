export default function SplashScreen({ onStart }) {
  return (
    <div
      className="grain-overlay anim-fadeIn"
      style={{ background: 'var(--primario)', minHeight: '100dvh' }}
    >
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '32px 24px', gap: '24px', textAlign: 'center',
        }}
      >
        {/* Logo */}
        <div
          className="anim-scaleInBounce"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
        >
          <img
            src="/images/logo-transparente.png"
            alt="Mijarepas"
            style={{
              width: '85%', maxWidth: '380px',
              height: 'auto', objectFit: 'contain', display: 'block',
            }}
          />
        </div>

        {/* Eslogan */}
        <div className="anim-fadeInUp-d2">
          <p
            className="font-brinnan"
            style={{
              color: 'rgba(255,241,210,0.88)', fontSize: '0.82rem',
              letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.4,
            }}
          >
            El Sabor de Ocaña · Que Siempre Amaña
          </p>
        </div>

        {/* CTA */}
        <div className="anim-fadeInUp-d3">
          <button
            onClick={onStart}
            className="font-chreed"
            style={{
              background: 'var(--secundario)', color: 'var(--cafe)',
              border: 'none', borderRadius: '50px',
              padding: '16px 40px', fontSize: '1.25rem',
              minHeight: '56px', cursor: 'pointer',
              boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
              letterSpacing: '0.02em',
            }}
          >
            ¡Ver el Menú! 🫓
          </button>
        </div>

        {/* Puntos decorativos */}
        <div className="anim-fadeInUp-d4" style={{ display: 'flex', gap: '8px', opacity: 0.4 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,241,210,0.6)' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

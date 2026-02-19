import { motion } from 'framer-motion'

export default function SplashScreen({ onStart }) {
  return (
    <motion.div
      className="grain-overlay"
      style={{ background: 'var(--rojo-mijarepas)', minHeight: '100dvh' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          gap: '24px',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="120" rx="28" fill="rgba(255,255,255,0.15)" />
            <rect x="4" y="4" width="112" height="112" rx="24" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="68">🫓</text>
          </svg>
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <h1
            className="font-fredoka"
            style={{ color: '#FFF5E4', fontSize: '3rem', lineHeight: 1.1, marginBottom: '4px' }}
          >
            Mijarepas
          </h1>
          <p
            className="font-pacifico"
            style={{ color: 'rgba(255,245,228,0.85)', fontSize: '1rem', lineHeight: 1.4 }}
          >
            "El sabor de Ocaña que siempre amaña"
          </p>
          <p
            className="font-nunito"
            style={{ color: 'rgba(255,245,228,0.65)', fontSize: '0.85rem', marginTop: '6px' }}
          >
            Arepas de mi tierra · Ocaña, Norte de Santander
          </p>
        </motion.div>

        {/* CTA button */}
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, type: 'spring', stiffness: 150, damping: 14 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="font-fredoka"
          style={{
            background: 'var(--dorado-mijarepas)',
            color: 'var(--cafe-oscuro)',
            border: 'none',
            borderRadius: '50px',
            padding: '16px 40px',
            fontSize: '1.25rem',
            minHeight: '56px',
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
            letterSpacing: '0.02em',
          }}
        >
          ¡Ver el Menú! 🫓
        </motion.button>

        {/* Decorative dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.8 }}
          style={{ display: 'flex', gap: '8px' }}
        >
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: 'rgba(255,245,228,0.6)',
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

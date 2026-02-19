import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { productos, categorias } from '../data/menu'

export default function ProductGrid({ activeCategory, searchQuery }) {
  // Search mode
  if (searchQuery && searchQuery.length > 1) {
    const filtered = productos.filter(p =>
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.desc || '').toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div style={{ padding: '16px' }}>
        <p
          className="font-nunito"
          style={{ fontSize: '0.8rem', color: 'var(--cafe-medio)', marginBottom: '12px', fontWeight: 700 }}
        >
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para "{searchQuery}"
        </p>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
            <p className="font-fredoka" style={{ color: 'var(--cafe-medio)', fontSize: '1.1rem' }}>
              Sin resultados
            </p>
            <p className="font-nunito" style={{ color: 'var(--cafe-medio)', fontSize: '0.85rem' }}>
              Intenta con otro nombre
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {filtered.map(p => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Normal category mode — show only active category
  const catInfo = categorias.find(c => c.id === activeCategory)
  const catProducts = productos.filter(p => p.cat === activeCategory)

  return (
    <div style={{ padding: '12px 16px 100px' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{ fontSize: '1.5rem' }}>{catInfo?.emoji}</span>
        <h2
          className="font-pacifico"
          style={{ color: 'var(--cafe-oscuro)', fontSize: '1.1rem' }}
        >
          {catInfo?.label}
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {catProducts.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <ProductCard producto={p} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

import { useRef } from 'react'
import { categorias } from '../data/menu'

export default function CategoryTabs({ activeCategory, onSelect }) {
  const scrollRef = useRef(null)

  const handleSelect = (catId) => {
    onSelect(catId)
    const el = scrollRef.current
    if (!el) return
    const btn = el.querySelector(`[data-cat="${catId}"]`)
    if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <div
      style={{
        background: '#ffffff',
        borderBottom: '1px solid var(--crema-oscuro)',
        position: 'sticky', top: '76px', zIndex: 90,
      }}
    >
      <div
        ref={scrollRef}
        className="no-scrollbar"
        style={{
          display: 'flex', overflowX: 'auto',
          gap: '8px', padding: '10px 16px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {categorias.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              data-cat={cat.id}
              onClick={() => handleSelect(cat.id)}
              aria-pressed={isActive}
              className="font-brinnan"
              style={{
                scrollSnapAlign: 'start',
                flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '7px 14px',
                borderRadius: '50px',
                border: 'none', cursor: 'pointer',
                fontSize: '0.8rem', fontWeight: 700,
                minHeight: '36px',
                transition: 'all 0.18s ease',
                /* Activo → fucsia (#eb1e55) | Inactivo → crema con texto café */
                background: isActive ? 'var(--primario)' : 'var(--crema)',
                color: isActive ? '#ffffff' : 'var(--cafe)',
                boxShadow: isActive ? '0 3px 10px rgba(235,30,85,0.35)' : 'none',
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              <span style={{ fontSize: '0.95rem', lineHeight: 1 }}>{cat.emoji}</span>
              <span>{cat.label.replace(/^Arepas /, '')}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

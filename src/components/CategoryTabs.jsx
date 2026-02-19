import { useRef } from 'react'
import { categorias } from '../data/menu'

export default function CategoryTabs({ activeCategory, onSelect }) {
  const scrollRef = useRef(null)

  const handleSelect = (catId) => {
    onSelect(catId)
    // Scroll the active pill into view
    const el = scrollRef.current
    if (!el) return
    const btn = el.querySelector(`[data-cat="${catId}"]`)
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  return (
    <div
      style={{
        background: 'var(--blanco)',
        borderBottom: '1px solid var(--crema-oscuro)',
        position: 'sticky', top: '68px', zIndex: 90,
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
              className="font-nunito"
              style={{
                scrollSnapAlign: 'start',
                flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '8px 14px',
                borderRadius: '50px',
                border: 'none', cursor: 'pointer',
                fontSize: '0.8rem', fontWeight: 700,
                minHeight: '36px',
                transition: 'all 0.2s ease',
                background: isActive ? 'var(--rojo-mijarepas)' : 'var(--crema)',
                color: isActive ? 'white' : 'var(--cafe-medio)',
                boxShadow: isActive ? '0 3px 12px rgba(200,51,74,0.35)' : 'none',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
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

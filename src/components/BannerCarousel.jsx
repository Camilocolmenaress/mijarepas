import { useEffect, useRef, useState } from 'react'
import { banners } from '../data/menu'

export default function BannerCarousel() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef(null)
  const timerRef = useRef(null)

  const scrollTo = (index) => {
    const el = scrollRef.current
    if (!el) return
    const child = el.children[index]
    if (child) {
      el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
    }
    setActive(index)
  }

  // Auto scroll
  useEffect(() => {
    if (isPaused) return
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % banners.length
        const el = scrollRef.current
        if (el) {
          const child = el.children[next]
          if (child) el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
        }
        return next
      })
    }, 4000)
    return () => clearInterval(timerRef.current)
  }, [isPaused])

  // Detect scroll position to update dots
  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const itemWidth = el.offsetWidth
    const scrollLeft = el.scrollLeft
    const idx = Math.round(scrollLeft / itemWidth)
    setActive(Math.min(idx, banners.length - 1))
  }

  return (
    <div style={{ marginBottom: '8px' }}>
      <div
        ref={scrollRef}
        className="no-scrollbar"
        onScroll={handleScroll}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        style={{
          display: 'flex', overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          gap: '0',
        }}
      >
        {banners.map((b) => (
          <div
            key={b.id}
            style={{
              background: b.gradient,
              minWidth: '100%',
              scrollSnapAlign: 'start',
              borderRadius: '0',
              padding: '20px 24px',
              display: 'flex', alignItems: 'center', gap: '16px',
              minHeight: '120px',
            }}
          >
            {/* Emoji */}
            <div
              style={{
                fontSize: '3.5rem', lineHeight: 1,
                flexShrink: 0,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              }}
            >
              {b.emoji}
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white', borderRadius: '50px',
                  padding: '2px 10px', fontSize: '0.7rem', fontWeight: 800,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}
              >
                {b.tag}
              </div>
              <h3
                className="font-chreed"
                style={{ color: 'white', fontSize: '1.35rem', lineHeight: 1.2, margin: 0 }}
              >
                {b.titulo}
              </h3>
              <p
                className="font-brinnan"
                style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', marginTop: '2px' }}
              >
                {b.subtexto}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', padding: '10px 0 4px' }}>
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Banner ${i + 1}`}
            style={{
              width: active === i ? '20px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: active === i ? 'var(--rojo-mijarepas)' : 'var(--crema-oscuro)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

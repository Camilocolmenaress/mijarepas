import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import { formatCOP } from '../utils/formatCOP'

export default function PromoBanner({ promos }) {
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  // Total slides: logo + each promo
  const totalSlides = 1 + promos.length
  const [current, setCurrent] = useState(0)
  const trackRef = useRef(null)
  const timerRef = useRef(null)
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)
  const isDragging = useRef(false)

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, totalSlides - 1))
    setCurrent(clamped)
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s ease'
      trackRef.current.style.transform = `translateX(-${clamped * 100}%)`
    }
  }, [totalSlides])

  // Auto-rotate every 5s
  useEffect(() => {
    if (totalSlides <= 1) return
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % totalSlides
        if (trackRef.current) {
          trackRef.current.style.transition = 'transform 0.4s ease'
          trackRef.current.style.transform = `translateX(-${next * 100}%)`
        }
        return next
      })
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [totalSlides])

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (totalSlides <= 1) return
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % totalSlides
        if (trackRef.current) {
          trackRef.current.style.transition = 'transform 0.4s ease'
          trackRef.current.style.transform = `translateX(-${next * 100}%)`
        }
        return next
      })
    }, 5000)
  }

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    isDragging.current = true
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
    if (trackRef.current) trackRef.current.style.transition = 'none'
  }

  const onTouchMove = (e) => {
    if (!isDragging.current) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
    if (trackRef.current) {
      const offset = -(current * 100) + (touchDeltaX.current / trackRef.current.parentElement.offsetWidth) * 100
      trackRef.current.style.transform = `translateX(${offset}%)`
    }
  }

  const onTouchEnd = () => {
    isDragging.current = false
    const threshold = 50
    if (touchDeltaX.current < -threshold && current < totalSlides - 1) {
      goTo(current + 1)
    } else if (touchDeltaX.current > threshold && current > 0) {
      goTo(current - 1)
    } else {
      goTo(current) // snap back
    }
    resetTimer()
  }

  const handleLoQuiero = (promo) => {
    addItem(
      {
        id: `promo-${promo.id}`,
        nombre: promo.titulo,
        precio: promo.precio,
        cat: 'promocion',
        emoji: '🎉',
      },
      1,
      `PROMOCIÓN - ${promo.descripcion}`
    )
    navigate('/carrito')
  }

  const bannerHeight = 'clamp(140px, 28vw, 200px)'

  return (
    <div style={{ width: '100%', position: 'relative', flexShrink: 0 }}>
      {/* Carousel viewport */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            width: `${totalSlides * 100}%`,
            transform: 'translateX(0%)',
            transition: 'transform 0.4s ease',
          }}
        >
          {/* Slide 0: Logo estático */}
          <div
            style={{
              width: `${100 / totalSlides}%`,
              flexShrink: 0,
              height: bannerHeight,
            }}
          >
            <img
              src="/images/LOGOSYRECURSOS-12.jpg"
              alt="Mijarepas — El sabor de Ocana"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>

          {/* Slides de promos */}
          {promos.map((promo) => (
            <div
              key={promo.id}
              style={{
                width: `${100 / totalSlides}%`,
                flexShrink: 0,
                height: bannerHeight,
                background: '#E12B4E',
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                boxSizing: 'border-box',
                gap: '12px',
                overflow: 'hidden',
              }}
            >
              {/* Imagen de la promo (si hay) */}
              {promo.imagen_url && (
                <img
                  src={promo.imagen_url}
                  alt={promo.titulo}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Contenido de texto */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span
                  className="font-chreed-extrabold"
                  style={{
                    color: '#f9ac31',
                    fontSize: 'clamp(0.85rem, 3.5vw, 1.1rem)',
                    lineHeight: 1.15,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {promo.titulo}
                </span>
                <span
                  className="font-brinnan"
                  style={{
                    color: '#FFFFFF',
                    fontSize: 'clamp(0.65rem, 2.5vw, 0.78rem)',
                    lineHeight: 1.3,
                    opacity: 0.9,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {promo.descripcion}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  {promo.precio_original && (
                    <span
                      className="font-brinnan"
                      style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.72rem',
                        textDecoration: 'line-through',
                      }}
                    >
                      {formatCOP(promo.precio_original)}
                    </span>
                  )}
                  <span
                    className="font-chreed-extrabold"
                    style={{ color: '#FFFFFF', fontSize: 'clamp(0.9rem, 3.5vw, 1.15rem)' }}
                  >
                    {formatCOP(promo.precio)}
                  </span>
                </div>
              </div>

              {/* Boton */}
              <button
                onClick={() => handleLoQuiero(promo)}
                className="font-chreed-extrabold"
                style={{
                  background: '#f9ac31',
                  color: '#42261a',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '8px 14px',
                  fontSize: 'clamp(0.65rem, 2.5vw, 0.78rem)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  lineHeight: 1.2,
                }}
              >
                LO QUIERO!
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      {totalSlides > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            padding: '8px 0 4px',
            background: 'var(--cafe)',
          }}
        >
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetTimer() }}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: current === i ? '18px' : '7px',
                height: '7px',
                borderRadius: '4px',
                border: 'none',
                background: current === i ? '#f9ac31' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

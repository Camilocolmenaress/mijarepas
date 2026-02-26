import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import useCartStore from '../store/useCartStore'
import { productos } from '../data/menu'
import { formatCOP } from '../utils/formatCOP'

/* ─── Placeholder imagen ─────────────────────────────────────────────── */
function Placeholder({ bg, border, textColor }) {
  return (
    <div style={{
      width: '100%', height: '180px', borderRadius: '12px',
      background: bg, border: `2px dashed ${border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '16px', flexShrink: 0,
    }}>
      <span className="font-brinnan" style={{ color: textColor, opacity: 0.4, fontSize: '0.88rem' }}>
        [ Foto del plato ]
      </span>
    </div>
  )
}

/* ─── Fila de producto ───────────────────────────────────────────────── */
function FilaProducto({ producto, nombreColor, descColor, precioColor, btnBg, btnColor, sepColor, sinBoton = false }) {
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const [popKey, setPopKey] = useState(0)

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(producto)
    setPopKey(k => k + 1)
    toast(`${producto.emoji} ${producto.nombre} agregada`, {
      style: { background: '#42261a', color: '#fff1d2', borderRadius: '12px', fontSize: '0.85rem' },
      duration: 1800,
    })
  }

  return (
    <>
      <div
        onClick={sinBoton ? handleAdd : () => navigate(`/producto/${producto.id}`)}
        style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '11px 0', cursor: 'pointer' }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="font-healing" style={{ color: nombreColor, fontSize: '18px', lineHeight: 1.2, marginBottom: '2px' }}>
            {producto.nombre}
          </p>
          {producto.desc ? (
            <p className="font-brinnan" style={{ color: descColor, opacity: 0.7, fontSize: '13px', lineHeight: 1.4 }}>
              {producto.desc}
            </p>
          ) : null}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, paddingTop: '2px' }}>
          <span className="font-chreed" style={{ color: precioColor, fontSize: '16px', whiteSpace: 'nowrap' }}>
            {formatCOP(producto.precio)}
          </span>
          {!sinBoton && (
            <motion.button
              key={popKey}
              initial={popKey > 0 ? { scale: 1.45 } : { scale: 1 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              onClick={handleAdd}
              aria-label={`Agregar ${producto.nombre}`}
              style={{
                background: btnBg, color: btnColor, border: 'none',
                borderRadius: '50%', width: '36px', height: '36px',
                fontSize: '1.2rem', cursor: 'pointer', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >+</motion.button>
          )}
        </div>
      </div>
      <div style={{ borderBottom: `1.5px dashed ${sepColor}`, opacity: 0.3 }} />
    </>
  )
}

/* ─── Subtítulo de subsección ────────────────────────────────────────── */
function SubTitulo({ texto, color, size = '24px' }) {
  return (
    <h3 className="font-chreed" style={{ color, fontSize: size, lineHeight: 1.1, margin: '20px 0 4px' }}>
      {texto}
    </h3>
  )
}

/* ─── SECCIÓN 1 — Crema: Arepas ─────────────────────────────────────── */
function SeccionArepas() {
  const clasicas    = productos.filter(p => p.cat === 'clasicas')
  const chicharronas = productos.filter(p => p.cat === 'chicharronas')
  const hamburguesas = productos.filter(p => p.cat === 'hamburguesas')
  return (
    <div style={{ background: '#fff1d2', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', padding: '24px 20px 120px' }}>
      <h2 className="font-chreed" style={{ color: '#f9ac31', fontSize: '52px', lineHeight: 1 }}>AREPAS</h2>
      <Placeholder bg="#e8d9b8" border="#42261a" textColor="#42261a" />
      <SubTitulo texto="Chicharrona" color="#00afec" size="32px" />
      {chicharronas.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#eb1e55" btnColor="#fff" sepColor="#42261a" />)}
      <SubTitulo texto="Areburger" color="#007d3e" size="32px" />
      {hamburguesas.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#eb1e55" btnColor="#fff" sepColor="#42261a" />)}
      <SubTitulo texto="Clásiqueras" color="#eb1e55" size="32px" />
      {clasicas.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#eb1e55" btnColor="#fff" sepColor="#42261a" />)}
    </div>
  )
}

/* ─── SECCIÓN 2 — Amarillo: Especiales ──────────────────────────────── */
function SeccionEspeciales() {
  const especiales  = productos.filter(p => p.cat === 'especiales')
  return (
    <div style={{ background: '#f9ac31', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', padding: '24px 20px 120px' }}>
      <p className="font-healing" style={{ color: '#eb1e55', fontSize: '28px', lineHeight: 1.1 }}>Vea pues las</p>
      <h2 className="font-chreed" style={{ color: '#42261a', fontSize: '52px', lineHeight: 1, marginBottom: '16px' }}>ESPECIALES</h2>
      <Placeholder bg="#e09a20" border="#42261a" textColor="#42261a" />
      {especiales.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#42261a" btnColor="#fff" sepColor="#42261a" />)}
    </div>
  )
}

/* ─── SECCIÓN 3 — Fucsia: Quesudita ─────────────────────────────────── */
function SeccionQuesudita() {
  // Para la quesudita usamos chicharronas como "Escoge 3" y clasicas como "Escoge 4" (ingredientes disponibles)
  // En la carta física los 7 ingredientes se escogen de adicionales + opciones de relleno
  const escoge3 = productos.filter(p => ['add1','add2','add3','add4','add5','add6'].includes(p.id))
  const escoge4 = productos.filter(p => ['add7','add8','add9','add10','add11','add12'].includes(p.id))
  return (
    <div style={{ background: '#eb1e55', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', padding: '24px 20px 120px' }}>
      <h2 className="font-chreed" style={{ color: '#fff1d2', fontSize: '52px', lineHeight: 1 }}>ARMA</h2>
      <p className="font-healing" style={{ color: '#f9ac31', fontSize: '36px', lineHeight: 1.1, marginBottom: '6px' }}>Tu quesudita</p>
      <p className="font-brinnan" style={{ color: '#fff1d2', fontSize: '14px', marginBottom: '12px' }}>
        Incluye queso mozzarella y queso costeño
      </p>
      <div style={{ display: 'inline-block', background: '#42261a', borderRadius: '8px', padding: '8px 16px', marginBottom: '16px' }}>
        <span className="font-chreed" style={{ color: '#f9ac31', fontSize: '22px' }}>
          SELECCIONA 7 INGREDIENTES $33.500
        </span>
      </div>
      <Placeholder bg="#c8154a" border="#fff1d2" textColor="#fff1d2" />
      <h3 className="font-chreed" style={{ color: '#f9ac31', fontSize: '20px', margin: '16px 0 4px' }}>ESCOGE 3</h3>
      {escoge3.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#fff1d2" descColor="#fff1d2" precioColor="#f9ac31" btnBg="#f9ac31" btnColor="#42261a" sepColor="#fff1d2" />)}
      <h3 className="font-chreed" style={{ color: '#f9ac31', fontSize: '20px', margin: '20px 0 4px' }}>ESCOGE 4</h3>
      {escoge4.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#fff1d2" descColor="#fff1d2" precioColor="#f9ac31" btnBg="#f9ac31" btnColor="#42261a" sepColor="#fff1d2" />)}
    </div>
  )
}

/* ─── SECCIÓN 4 — Café oscuro: Desgranados ──────────────────────────── */
function SeccionDesgranados() {
  const desgranadas = productos.filter(p => p.cat === 'desgranadas')
  return (
    <div style={{ background: '#42261a', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', padding: '24px 20px 120px' }}>
      <p className="font-healing" style={{ color: '#eb1e55', fontSize: '28px', lineHeight: 1.1 }}>Los</p>
      <h2 className="font-chreed" style={{ color: '#f9ac31', fontSize: '42px', lineHeight: 1.05, marginBottom: '16px' }}>DESGRANADOS MÁS AMADOS</h2>
      <Placeholder bg="#2c1a0e" border="#f9ac31" textColor="#f9ac31" />
      {desgranadas.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#fff1d2" descColor="#fff1d2" precioColor="#f9ac31" btnBg="#f9ac31" btnColor="#42261a" sepColor="#fff1d2" />)}
    </div>
  )
}

/* ─── SECCIÓN 5 — Fucsia: Parrilla ──────────────────────────────────── */
function SeccionParrilla() {
  const parrilla = productos.filter(p => p.cat === 'parrilla')
  return (
    <div style={{ background: '#eb1e55', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', padding: '24px 20px 120px' }}>
      <p className="font-healing" style={{ color: '#f9ac31', fontSize: '28px', lineHeight: 1.1 }}>Las</p>
      <h2 className="font-chreed" style={{ color: '#f9ac31', fontSize: '42px', lineHeight: 1.05, marginBottom: '16px' }}>PARRILLADAS MÁS ESPERADAS</h2>
      <Placeholder bg="#c8154a" border="#f9ac31" textColor="#f9ac31" />
      {parrilla.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#fff1d2" descColor="#fff1d2" precioColor="#f9ac31" btnBg="#f9ac31" btnColor="#42261a" sepColor="#fff1d2" />)}
    </div>
  )
}

/* ─── SECCIÓN 6 — Verde: Clásicos Ocañeros (Delicias) ───────────────── */
function SeccionClasicos() {
  const delicias = productos.filter(p => p.cat === 'delicias')
  return (
    <div style={{ background: '#007d3e', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', padding: '24px 20px 120px' }}>
      <h2 className="font-chreed" style={{ color: '#f9ac31', fontSize: '52px', lineHeight: 1 }}>CLÁSICOS</h2>
      <p className="font-healing" style={{ color: '#fff1d2', fontSize: '32px', lineHeight: 1.1, marginBottom: '16px' }}>Ocañeros</p>
      <Placeholder bg="#006030" border="#f9ac31" textColor="#f9ac31" />
      {delicias.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#fff1d2" descColor="#fff1d2" precioColor="#f9ac31" btnBg="#f9ac31" btnColor="#42261a" sepColor="#fff1d2" />)}
    </div>
  )
}

/* ─── SECCIÓN 7 — Azul: Bebidas ─────────────────────────────────────── */
function SeccionBebidas() {
  const limonadas  = productos.filter(p => ['bf1','bf2','bf3','bf4','bf5'].includes(p.id))
  const jugos      = productos.filter(p => ['bf6','bf7','bf8'].includes(p.id))
  const cervezas   = productos.filter(p => ['bf9','bf10','bf11'].includes(p.id))
  const calientes  = productos.filter(p => p.cat === 'calientes')
  const otras      = productos.filter(p => ['bf12','bf13','bf14','bf15'].includes(p.id))
  return (
    <div style={{ background: '#00afec', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', padding: '24px 20px 120px' }}>
      <h2 className="font-chreed" style={{ color: '#fff1d2', fontSize: '42px', lineHeight: 1 }}>PA' QUE SE</h2>
      <h2 className="font-chreed" style={{ color: '#fff1d2', fontSize: '42px', lineHeight: 1, marginBottom: '16px' }}>REFRESQUE</h2>
      <SubTitulo texto="LIMONADAS" color="#f9ac31" size="24px" />
      {limonadas.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#42261a" btnColor="#fff" sepColor="#42261a" />)}
      <SubTitulo texto="JUGOS Y GRANIZADAS" color="#f9ac31" size="24px" />
      {jugos.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#42261a" btnColor="#fff" sepColor="#42261a" />)}
      <SubTitulo texto="CERVEZAS" color="#f9ac31" size="24px" />
      {cervezas.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#42261a" btnColor="#fff" sepColor="#42261a" />)}
      <SubTitulo texto="BEBIDAS CALIENTES" color="#f9ac31" size="24px" />
      {calientes.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#42261a" btnColor="#fff" sepColor="#42261a" />)}
      <SubTitulo texto="OTRAS" color="#f9ac31" size="24px" />
      {otras.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#42261a" btnColor="#fff" sepColor="#42261a" />)}
    </div>
  )
}

/* ─── SECCIÓN 8 — Crema: Adicionales 2 columnas ─────────────────────── */
function SeccionAdicionales() {
  const adicionales = productos.filter(p => p.cat === 'adicionales')
  return (
    <div style={{ background: '#fff1d2', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', padding: '24px 20px 120px' }}>
      <h2 className="font-healing" style={{ color: '#eb1e55', fontSize: '42px', lineHeight: 1, marginBottom: '16px' }}>Adicionales</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
        {adicionales.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#eb1e55" btnColor="#fff" sepColor="#42261a" sinBoton />)}
      </div>
    </div>
  )
}

/* ─── Búsqueda ───────────────────────────────────────────────────────── */
function BusquedaResultados({ searchQuery }) {
  const filtered = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.desc || '').toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <div style={{ background: '#fff1d2', minHeight: '70vh', padding: '16px 20px 100px' }}>
      <p className="font-brinnan" style={{ fontSize: '0.82rem', color: '#7a4d35', marginBottom: '16px' }}>
        {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para «{searchQuery}»
      </p>
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
          <p className="font-chreed" style={{ color: '#42261a', fontSize: '1.3rem' }}>Sin resultados</p>
          <p className="font-brinnan" style={{ color: '#7a4d35', fontSize: '0.85rem', marginTop: '4px' }}>Intenta con otro nombre</p>
        </div>
      ) : filtered.map(p => (
        <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#eb1e55" btnColor="#fff" sepColor="#42261a" />
      ))}
    </div>
  )
}

/* ─── Colores de dot por sección ─────────────────────────────────────── */
const DOT_COLORS = ['#eb1e55','#f9ac31','#eb1e55','#f9ac31','#f9ac31','#f9ac31','#fff1d2','#eb1e55']

/* ─── Componente principal ───────────────────────────────────────────── */
export default function CartaMenu({ searchQuery, heroBannerHeight = 0 }) {
  const scrollRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const HEADER_H = 64 // altura del navbar

  // Detectar sección activa al hacer scroll horizontal
  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.offsetWidth)
    setActiveIdx(Math.min(idx, 7))
  }

  const goTo = (idx) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: idx * el.offsetWidth, behavior: 'smooth' })
    setActiveIdx(idx)
  }

  if (searchQuery && searchQuery.length > 1) {
    return <BusquedaResultados searchQuery={searchQuery} />
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* ── Contenedor horizontal ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          height: `calc(100dvh - ${HEADER_H}px)`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <SeccionArepas />
        <SeccionEspeciales />
        <SeccionQuesudita />
        <SeccionDesgranados />
        <SeccionParrilla />
        <SeccionClasicos />
        <SeccionBebidas />
        <SeccionAdicionales />
      </div>

      {/* ── Dots de navegación ── */}
      <div
        style={{
          position: 'fixed',
          bottom: '88px',
          left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          zIndex: 150,
          pointerEvents: 'none',
        }}
      >
        {DOT_COLORS.map((color, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a sección ${i + 1}`}
            style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              border: 'none', padding: 0, cursor: 'pointer',
              pointerEvents: 'all',
              background: i === activeIdx ? color : 'rgba(255,255,255,0.9)',
              opacity: i === activeIdx ? 1 : 0.45,
              transition: 'all 0.25s ease',
              transform: i === activeIdx ? 'scale(1.25)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

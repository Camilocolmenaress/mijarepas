import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useCartStore from '../store/useCartStore'
import { productos } from '../data/menu'
import { formatCOP } from '../utils/formatCOP'

/* ─── Fila de producto ───────────────────────────────────────────────── */
function FilaProducto({ producto, nombreColor, descColor, precioColor, btnBg, btnColor, sepColor, sinBoton = false }) {
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const [popped, setPopped] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(producto)
    setPopped(true)
    setTimeout(() => setPopped(false), 350)
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
          <p className="font-chreed-extrabold" style={{ color: nombreColor, fontSize: '16px', lineHeight: 1.2, marginBottom: '2px' }}>
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
            <button
              onClick={handleAdd}
              aria-label={`Agregar ${producto.nombre}`}
              className={popped ? 'pop' : ''}
              style={{
                background: btnBg, color: btnColor, border: 'none',
                borderRadius: '50%', width: '36px', height: '36px',
                fontSize: '1.2rem', cursor: 'pointer', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >+</button>
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
    <h3 className="font-chreed-extrabold" style={{ color, fontSize: size, lineHeight: 1.1, margin: '12px 0 4px' }}>
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
    <div style={{ background: '#fff1d2', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', paddingBottom: '220px' }}>
      <img src="/images/titulo-arepas.png" alt="Arepas" style={{ width: '100%', display: 'block', margin: 0, padding: 0, borderRadius: '12px', border: '3px solid #42261a' }} />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', margin: 0 }}>
        <img src="/images/foto-clasicas.png" alt="Arepas Clásicas" style={{ width: '85%', height: 'auto', display: 'block', filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.25))' }} />
      </div>
      <div style={{ padding: '0 20px' }}>
      <SubTitulo texto="Chicharrona" color="#00afec" size="32px" />
      {chicharronas.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#eb1e55" btnColor="#fff" sepColor="#42261a" />)}
      <SubTitulo texto="Areburger" color="#007d3e" size="32px" />
      {hamburguesas.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#eb1e55" btnColor="#fff" sepColor="#42261a" />)}
      <SubTitulo texto="Clásiqueras" color="#eb1e55" size="32px" />
      {clasicas.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#eb1e55" btnColor="#fff" sepColor="#42261a" />)}
      </div>
    </div>
  )
}

/* ─── SECCIÓN 2 — Amarillo: Especiales ──────────────────────────────── */
function SeccionEspeciales() {
  const especiales = productos.filter(p => p.cat === 'especiales')
  return (
    <div style={{ background: '#f9ac31', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', paddingBottom: '220px' }}>
      <img src="/images/titulo-especiales.png" alt="Especiales" style={{ width: '100%', display: 'block', margin: 0, padding: 0, borderRadius: '12px', border: '3px solid #eda73c' }} />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', margin: 0 }}>
        <img src="/images/foto-especiales.png" alt="Arepas Especiales" style={{ width: '90%', height: 'auto', display: 'block', filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.25))' }} />
      </div>
      <div style={{ padding: '0 20px' }}>
      {especiales.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#42261a" btnColor="#fff" sepColor="#42261a" />)}
      </div>
    </div>
  )
}

/* ─── SECCIÓN 3 — Fucsia: Quesudita con checkboxes ──────────────────── */
const QUESUDITA_PRECIO = 33500
const QUESUDITA_ID = 'quesudita-personalizada'

// add1-add6 → ESCOGE 3 | add7-add12 → ESCOGE 4
const IDS_ESCOGE3 = ['add1','add2','add3','add4','add5','add6']
const IDS_ESCOGE4 = ['add7','add8','add9','add10','add11','add12']

function CheckboxIngrediente({ nombre, precio, checked, disabled, onToggle, colorText, colorCheck, colorDis }) {
  return (
    <div
      onClick={disabled && !checked ? undefined : onToggle}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '10px 0', cursor: disabled && !checked ? 'default' : 'pointer',
        opacity: disabled && !checked ? 0.4 : 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* Checkbox visual */}
      <div style={{
        width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0,
        border: `2px solid ${checked ? colorCheck : 'rgba(255,241,210,0.5)'}`,
        background: checked ? colorCheck : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s ease',
      }}>
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="#42261a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className="font-chreed-extrabold" style={{ color: colorText, fontSize: '14px', lineHeight: 1.2, flex: 1 }}>
        {nombre}
      </span>
    </div>
  )
}

function SeccionQuesudita() {
  const { addItem } = useCartStore()
  const [sel3, setSel3] = useState([])   // ids seleccionados de ESCOGE 3
  const [sel4, setSel4] = useState([])   // ids de ESCOGE 4
  const [popped, setPopped] = useState(false)

  const prod3 = productos.filter(p => IDS_ESCOGE3.includes(p.id))
  const prod4 = productos.filter(p => IDS_ESCOGE4.includes(p.id))

  const toggle3 = (id) => {
    if (sel3.includes(id)) { setSel3(sel3.filter(x => x !== id)); return }
    if (sel3.length >= 3) return
    setSel3([...sel3, id])
  }
  const toggle4 = (id) => {
    if (sel4.includes(id)) { setSel4(sel4.filter(x => x !== id)); return }
    if (sel4.length >= 4) return
    setSel4([...sel4, id])
  }

  const canAdd = sel3.length === 3 && sel4.length === 4

  const handleAgregar = () => {
    if (!canAdd) {
      toast.error(
        sel3.length < 3
          ? `Escoge ${3 - sel3.length} ingrediente${3 - sel3.length > 1 ? 's' : ''} más del primer grupo`
          : `Escoge ${4 - sel4.length} ingrediente${4 - sel4.length > 1 ? 's' : ''} más del segundo grupo`,
        { style: { fontWeight: 700, borderRadius: '12px' } }
      )
      return
    }
    const nombres3 = sel3.map(id => productos.find(p => p.id === id)?.nombre).join(', ')
    const nombres4 = sel4.map(id => productos.find(p => p.id === id)?.nombre).join(', ')
    const descripcion = `${nombres3} · ${nombres4}`

    const productQuesudita = {
      id: QUESUDITA_ID,
      cat: 'quesudita',
      nombre: 'Quesudita Personalizada',
      emoji: '🧀',
      precio: QUESUDITA_PRECIO,
      desc: descripcion,
    }
    addItem(productQuesudita, 1, descripcion)
    setPopped(true)
    setTimeout(() => setPopped(false), 350)
    toast('🧀 ¡Quesudita armada y agregada!', {
      style: { background: '#42261a', color: '#fff1d2', borderRadius: '12px', fontSize: '0.85rem' },
      duration: 2200,
    })
    // Reset selección
    setSel3([])
    setSel4([])
  }

  return (
    <div style={{ background: '#eb1e55', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', paddingBottom: '220px' }}>
      <img src="/images/titulo-quesudita.png" alt="Arma tu Quesudita" style={{ width: '100%', display: 'block', margin: 0, padding: 0, borderRadius: '12px', border: '3px solid #E12B4E' }} />
      <div style={{ padding: '0 20px' }}>
      <div style={{ display: 'inline-block', background: '#42261a', borderRadius: '8px', padding: '8px 16px', marginBottom: '16px', marginTop: '8px' }}>
        <span className="font-chreed" style={{ color: '#f9ac31', fontSize: '22px' }}>
          SELECCIONA 7 INGREDIENTES $33.500
        </span>
      </div>
      <div style={{ width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/images/foto-quesudita.png" alt="Arma Tu Quesudita" style={{ width: '75%', height: 'auto', display: 'block', transform: 'scale(1.0)', filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.25))' }} />
      </div>

      {/* ESCOGE 3 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '16px 0 4px' }}>
        <h3 className="font-chreed" style={{ color: '#f9ac31', fontSize: '20px', margin: 0 }}>ESCOGE 3</h3>
        <span className="font-brinnan" style={{ color: sel3.length === 3 ? '#f9ac31' : 'rgba(255,241,210,0.6)', fontSize: '13px', fontWeight: 700 }}>
          {sel3.length}/3
        </span>
      </div>
      {prod3.map(p => (
        <div key={p.id}>
          <CheckboxIngrediente
            nombre={p.nombre}
            checked={sel3.includes(p.id)}
            disabled={sel3.length >= 3}
            onToggle={() => toggle3(p.id)}
            colorText="#fff1d2"
            colorCheck="#f9ac31"
          />
          <div style={{ borderBottom: '1.5px dashed rgba(255,241,210,0.3)' }} />
        </div>
      ))}

      {/* ESCOGE 4 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0 4px' }}>
        <h3 className="font-chreed" style={{ color: '#f9ac31', fontSize: '20px', margin: 0 }}>ESCOGE 4</h3>
        <span className="font-brinnan" style={{ color: sel4.length === 4 ? '#f9ac31' : 'rgba(255,241,210,0.6)', fontSize: '13px', fontWeight: 700 }}>
          {sel4.length}/4
        </span>
      </div>
      {prod4.map(p => (
        <div key={p.id}>
          <CheckboxIngrediente
            nombre={p.nombre}
            checked={sel4.includes(p.id)}
            disabled={sel4.length >= 4}
            onToggle={() => toggle4(p.id)}
            colorText="#fff1d2"
            colorCheck="#f9ac31"
          />
          <div style={{ borderBottom: '1.5px dashed rgba(255,241,210,0.3)' }} />
        </div>
      ))}

      {/* Botón agregar */}
      <button
        onClick={handleAgregar}
        className={`font-chreed${popped ? ' pop' : ''}`}
        style={{
          marginTop: '24px',
          width: '100%',
          background: canAdd ? '#f9ac31' : 'rgba(249,172,49,0.35)',
          color: canAdd ? '#42261a' : 'rgba(255,241,210,0.5)',
          border: 'none', borderRadius: '14px',
          padding: '15px', fontSize: '1.1rem',
          cursor: canAdd ? 'pointer' : 'default',
          transition: 'all 0.2s ease',
          boxShadow: canAdd ? '0 4px 20px rgba(0,0,0,0.25)' : 'none',
        }}
      >
        {canAdd
          ? `🧀 Agregar Quesudita — ${formatCOP(QUESUDITA_PRECIO)}`
          : `Escoge ${3 - sel3.length > 0 ? `${3 - sel3.length} del grupo 1` : `${4 - sel4.length} del grupo 2`}`
        }
      </button>
      </div>
    </div>
  )
}

/* ─── SECCIÓN 4 — Fucsia: Desgranados ────────────────────────────────── */
function SeccionDesgranados() {
  const desgranadas = productos.filter(p => p.cat === 'desgranadas')
  return (
    <div style={{ background: '#eb1e55', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', paddingBottom: '220px' }}>
      <img src="/images/titulo-desgranados.png" alt="Los Desgranados más Amados" style={{ width: '100%', display: 'block', margin: 0, padding: 0, borderRadius: '12px', border: '3px solid #E12B4E' }} />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', margin: 0 }}>
        <img src="/images/foto-desgranados.png" alt="Arepas Desgranadas" style={{ width: '80%', height: 'auto', display: 'block', margin: '0 auto', filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.25))' }} />
      </div>
      <div style={{ padding: '0 20px' }}>
      {desgranadas.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#fff1d2" descColor="#fff1d2" precioColor="#f9ac31" btnBg="#f9ac31" btnColor="#42261a" sepColor="#fff1d2" />)}
      </div>
    </div>
  )
}

/* ─── SECCIÓN 5 — Crema: Parrilla ────────────────────────────────────── */
function SeccionParrilla() {
  const parrilla = productos.filter(p => p.cat === 'parrilla')
  return (
    <div style={{ background: '#fff1d2', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', paddingBottom: '220px' }}>
      <img src="/images/titulo-parrilladas.png" alt="Las Parrilladas más Esperadas" style={{ width: '100%', display: 'block', margin: 0, padding: 0, borderRadius: '12px', border: '3px solid #E12B4E' }} />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', margin: 0 }}>
        <img src="/images/foto-parrilladas.png" alt="Parrilladas" style={{ width: '80%', height: 'auto', display: 'block', margin: '0 auto', filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.25))' }} />
      </div>
      <div style={{ padding: '0 20px' }}>
      {parrilla.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#eb1e55" btnColor="#fff" sepColor="#42261a" />)}
      </div>
    </div>
  )
}

/* ─── SECCIÓN 6 — Verde: Clásicos Ocañeros ──────────────────────────── */
function SeccionClasicos() {
  const delicias = productos.filter(p => p.cat === 'delicias')
  return (
    <div style={{ background: '#007d3e', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', paddingBottom: '220px' }}>
      <img src="/images/titulo-clasicos.png" alt="Clásicos Ocañeros" style={{ width: '100%', display: 'block', margin: 0, padding: 0, borderRadius: '12px', border: '3px solid #007d3e' }} />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', margin: 0 }}>
        <img src="/images/foto-clasicos-ocaneros.png" alt="Clásicos Ocañeros" style={{ width: '80%', height: 'auto', display: 'block', margin: '0 auto', filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.25))' }} />
      </div>
      <div style={{ padding: '0 20px' }}>
      {delicias.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#fff1d2" descColor="#fff1d2" precioColor="#f9ac31" btnBg="#f9ac31" btnColor="#42261a" sepColor="#fff1d2" />)}
      </div>
    </div>
  )
}

/* ─── Modal selector de variante — se renderiza desde CartaMenu raíz ── */
function ModalVariante({ producto, onClose, onAgregar }) {
  const [varSel, setVarSel]     = useState(null)
  const [saborSel, setSaborSel] = useState(null)

  const tieneSabores = !!(producto.sabores && producto.sabores.length > 0)
  const puedeAgregar = varSel && (!tieneSabores || saborSel)

  const textoBoton = () => {
    if (!tieneSabores) return varSel ? `Agregar — ${formatCOP(varSel.precio)}` : 'Selecciona un tamaño'
    if (!saborSel) return 'Selecciona un sabor'
    if (!varSel)   return 'Selecciona un tamaño'
    return `Agregar — ${formatCOP(varSel.precio)}`
  }

  return (
    /* Overlay — z-index 500, encima de TODO incluyendo dots */
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      {/* Sheet */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '20px 20px 0 0',
          width: '100%', maxWidth: '480px',
          maxHeight: '85dvh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 -6px 40px rgba(0,0,0,0.22)',
        }}
      >
        {/* ── Cabecera fija ── */}
        <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
          {/* Manija */}
          <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: '#ddd', margin: '0 auto 14px' }} />
          {/* Título */}
          <p className="font-healing" style={{ color: '#42261a', fontSize: '22px', lineHeight: 1.2, textAlign: 'center', marginBottom: '16px' }}>
            {producto.emoji} {producto.nombre}
          </p>
        </div>

        {/* ── Área scrolleable ── */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '0 20px' }}>

          {/* Sabores */}
          {tieneSabores && (
            <div style={{ marginBottom: '20px' }}>
              <p className="font-brinnan" style={{ color: '#42261a', fontSize: '12px', letterSpacing: '0.05em', marginBottom: '10px' }}>
                SABOR
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {producto.sabores.map(s => {
                  const sel = saborSel === s
                  return (
                    <button
                      key={s}
                      onClick={() => setSaborSel(s)}
                      className="font-brinnan"
                      style={{
                        padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
                        border: '2px solid #eb1e55',
                        background: sel ? '#eb1e55' : 'transparent',
                        color: sel ? '#fff' : '#eb1e55',
                        fontSize: '14px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tamaños */}
          <div style={{ marginBottom: '16px' }}>
            {tieneSabores && (
              <p className="font-brinnan" style={{ color: '#42261a', fontSize: '12px', letterSpacing: '0.05em', marginBottom: '10px' }}>
                TAMAÑO
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {producto.variantes.map(v => {
                const sel = varSel?.label === v.label
                return (
                  <div
                    key={v.label}
                    onClick={() => setVarSel(v)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '13px 16px', borderRadius: '12px', cursor: 'pointer',
                      border: `2px solid ${sel ? '#eb1e55' : '#e0e0e0'}`,
                      background: sel ? '#fff1d2' : '#fafafa',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span className="font-healing" style={{ color: '#42261a', fontSize: '18px' }}>{v.label}</span>
                    <span className="font-chreed" style={{ color: sel ? '#eb1e55' : '#888', fontSize: '15px' }}>
                      {formatCOP(v.precio)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Footer fijo — botones ── */}
        <div style={{ padding: '16px 20px 32px', flexShrink: 0, borderTop: '1px solid #f0f0f0' }}>
          <button
            onClick={() => puedeAgregar && onAgregar(varSel, saborSel)}
            disabled={!puedeAgregar}
            className="font-brinnan"
            style={{
              width: '100%', padding: '15px', borderRadius: '14px', border: 'none',
              background: puedeAgregar ? '#eb1e55' : '#ddd',
              color: puedeAgregar ? '#fff' : '#aaa',
              fontSize: '1rem',
              cursor: puedeAgregar ? 'pointer' : 'default',
              transition: 'background 0.2s ease',
              marginBottom: '10px',
            }}
          >
            {textoBoton()}
          </button>
          <button
            onClick={onClose}
            className="font-brinnan"
            style={{
              width: '100%', background: 'none', border: 'none',
              color: '#aaa', fontSize: '0.9rem', cursor: 'pointer', padding: '6px',
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Fila de bebida con variantes ──────────────────────────────────── */
/* El modal NO se monta aquí — se pasa onOpenModal al padre           */
function FilaProductoBebida({ producto, onOpenModal }) {
  const [popped, setPopped] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    if (producto.variantes) {
      onOpenModal(producto)
    } else {
      // sin variantes: agrega directo (ruta no usada actualmente)
    }
  }

  return (
    <>
      <div
        style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '11px 0', cursor: 'pointer' }}
        onClick={handleAdd}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="font-chreed-extrabold" style={{ color: '#42261a', fontSize: '16px', lineHeight: 1.2, marginBottom: '2px' }}>
            {producto.nombre}
          </p>
          {producto.desc ? (
            <p className="font-brinnan" style={{ color: '#42261a', opacity: 0.7, fontSize: '13px', lineHeight: 1.4 }}>
              {producto.desc}
            </p>
          ) : null}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, paddingTop: '2px' }}>
          <span className="font-chreed" style={{ color: '#eb1e55', fontSize: '16px', whiteSpace: 'nowrap' }}>
            {producto.variantes ? `desde ${formatCOP(producto.variantes[0].precio)}` : formatCOP(producto.precio)}
          </span>
          <button
            onClick={handleAdd}
            aria-label={`Agregar ${producto.nombre}`}
            className={popped ? 'pop' : ''}
            style={{
              background: '#42261a', color: '#fff', border: 'none',
              borderRadius: '50%', width: '36px', height: '36px',
              fontSize: '1.2rem', cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >+</button>
        </div>
      </div>
      <div style={{ borderBottom: '1.5px dashed #42261a', opacity: 0.3 }} />
    </>
  )
}

/* ─── SECCIÓN 7 — Azul: Bebidas ─────────────────────────────────────── */
function SeccionBebidas({ onOpenModal }) {
  const limonadas = productos.filter(p => ['bf1','bf2','bf3','bf4','bf5'].includes(p.id))
  const jugos     = productos.filter(p => ['bf6','bf7','bf8'].includes(p.id))
  const cervezas  = productos.filter(p => ['bf9','bf10','bf11'].includes(p.id))
  const calientes = productos.filter(p => p.cat === 'calientes')
  const otras     = productos.filter(p => ['bf12','bf13','bf14','bf15'].includes(p.id))
  return (
    <div style={{ background: '#00afec', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', paddingBottom: '220px' }}>
      <img src="/images/titulo-bebidas.png" alt="Pa' que se Refresque" style={{ width: '100%', display: 'block', margin: 0, padding: 0, borderRadius: '12px', border: '3px solid #4BA5E9' }} />
      <div style={{ padding: '0 20px' }}>
      <SubTitulo texto="LIMONADAS" color="#f9ac31" size="24px" />
      {limonadas.map(p => <FilaProductoBebida key={p.id} producto={p} onOpenModal={onOpenModal} />)}
      <SubTitulo texto="JUGOS Y GRANIZADAS" color="#f9ac31" size="24px" />
      {jugos.map(p => <FilaProductoBebida key={p.id} producto={p} onOpenModal={onOpenModal} />)}
      <SubTitulo texto="CERVEZAS" color="#f9ac31" size="24px" />
      {cervezas.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#42261a" btnColor="#fff" sepColor="#42261a" />)}
      <SubTitulo texto="BEBIDAS CALIENTES" color="#f9ac31" size="24px" />
      {calientes.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#42261a" btnColor="#fff" sepColor="#42261a" />)}
      <SubTitulo texto="OTRAS" color="#f9ac31" size="24px" />
      {otras.map(p => <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#42261a" btnColor="#fff" sepColor="#42261a" />)}
      </div>
    </div>
  )
}

/* ─── Fila de adicional (2 columnas, siempre con botón +) ───────────── */
function FilaProductoAdicional({ producto }) {
  const { addItem } = useCartStore()
  const [popped, setPopped] = useState(false)

  const handleAdd = () => {
    addItem(producto)
    setPopped(true)
    setTimeout(() => setPopped(false), 350)
    toast(`${producto.emoji || '✅'} ${producto.nombre} agregado`, {
      style: { background: '#42261a', color: '#fff1d2', borderRadius: '12px', fontSize: '0.85rem' },
      duration: 1800,
    })
  }

  return (
    <>
      <div
        onClick={handleAdd}
        style={{ display: 'flex', flexDirection: 'column', padding: '10px 0', cursor: 'pointer', gap: '4px' }}
      >
        <p className="font-chreed-extrabold" style={{ color: '#42261a', fontSize: '14px', lineHeight: 1.2 }}>
          {producto.nombre}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
          <span className="font-chreed" style={{ color: '#eb1e55', fontSize: '14px' }}>
            {formatCOP(producto.precio)}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); handleAdd() }}
            aria-label={`Agregar ${producto.nombre}`}
            className={popped ? 'pop' : ''}
            style={{
              background: '#eb1e55', color: '#fff', border: 'none',
              borderRadius: '50%', width: '30px', height: '30px',
              fontSize: '1rem', cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >+</button>
        </div>
      </div>
      <div style={{ borderBottom: '1.5px dashed #42261a', opacity: 0.3 }} />
    </>
  )
}

/* ─── SECCIÓN 8 — Crema: Adicionales 2 columnas ─────────────────────── */
function SeccionAdicionales() {
  const adicionales = productos.filter(p => p.cat === 'adicionales')
  return (
    <div style={{ background: '#fff1d2', minWidth: '100vw', overflowY: 'auto', scrollSnapAlign: 'start', padding: '24px 20px 220px' }}>
      {/* Título estilo carta física */}
      <div style={{ background: '#eb1e55', borderRadius: '16px', padding: '14px 20px 10px', marginBottom: '16px', textAlign: 'center' }}>
        <h2 className="font-healing" style={{ color: '#f9ac31', fontSize: '42px', lineHeight: 1, margin: 0 }}>Adicionales</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
        {adicionales.map(p => <FilaProductoAdicional key={p.id} producto={p} />)}
      </div>
    </div>
  )
}

/* ─── Búsqueda ───────────────────────────────────────────────────────── */
function BusquedaResultados({ searchQuery }) {
  const { addItem } = useCartStore()
  const [modalProducto, setModalProducto] = useState(null)

  const filtered = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.desc || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAgregarVariante = (variante, sabor) => {
    const producto = modalProducto
    const nombreFinal = sabor
      ? `${producto.nombre} de ${sabor} — ${variante.label}`
      : `${producto.nombre} — ${variante.label}`
    const idFinal = sabor
      ? `${producto.id}-${sabor.toLowerCase().replace(/ /g, '-')}-${variante.label.toLowerCase().replace(/ /g, '-')}`
      : `${producto.id}-${variante.label.toLowerCase().replace(/ /g, '-')}`
    addItem({ ...producto, id: idFinal, nombre: nombreFinal, precio: variante.precio }, 1, '')
    toast(`${producto.emoji} ${nombreFinal} agregada`, {
      style: { background: '#42261a', color: '#fff1d2', borderRadius: '12px', fontSize: '0.85rem' },
      duration: 1800,
    })
    setModalProducto(null)
  }

  return (
    <>
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
        ) : filtered.map(p =>
            p.variantes
              ? <FilaProductoBebida key={p.id} producto={p} onOpenModal={setModalProducto} />
              : <FilaProducto key={p.id} producto={p} nombreColor="#42261a" descColor="#42261a" precioColor="#eb1e55" btnBg="#eb1e55" btnColor="#fff" sepColor="#42261a" />
          )
        }
      </div>

      {/* Modal — fuera del flujo de lista para evitar stacking context */}
      {modalProducto && (
        <ModalVariante
          producto={modalProducto}
          onClose={() => setModalProducto(null)}
          onAgregar={handleAgregarVariante}
        />
      )}
    </>
  )
}

/* ─── Colores de dot por sección ─────────────────────────────────────── */
const DOT_COLORS = ['#eb1e55','#f9ac31','#eb1e55','#f9ac31','#f9ac31','#f9ac31','#fff1d2','#eb1e55']

/* ─── Componente principal ───────────────────────────────────────────── */
export default function CartaMenu({ searchQuery }) {
  const scrollRef       = useRef(null)
  const [activeIdx, setActiveIdx]         = useState(0)
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const hintDismissed   = useRef(false)
  const HEADER_H        = 64

  // ── Estado del modal levantado aquí (fuera del scroll container) ──
  const [modalProducto, setModalProducto] = useState(null)
  const { addItem } = useCartStore()

  // Auto-dismiss swipe hint después de 4s
  useEffect(() => {
    const t = setTimeout(() => setShowSwipeHint(false), 4000)
    return () => clearTimeout(t)
  }, [])

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.offsetWidth)
    setActiveIdx(Math.min(idx, 7))
    if (!hintDismissed.current && el.scrollLeft > 10) {
      hintDismissed.current = true
      setShowSwipeHint(false)
    }
  }

  const goTo = (idx) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: idx * el.offsetWidth, behavior: 'smooth' })
    setActiveIdx(idx)
  }

  const handleAgregarVariante = (variante, sabor) => {
    const producto = modalProducto
    const nombreFinal = sabor
      ? `${producto.nombre} de ${sabor} — ${variante.label}`
      : `${producto.nombre} — ${variante.label}`
    const idFinal = sabor
      ? `${producto.id}-${sabor.toLowerCase().replace(/ /g, '-')}-${variante.label.toLowerCase().replace(/ /g, '-')}`
      : `${producto.id}-${variante.label.toLowerCase().replace(/ /g, '-')}`
    const productoVariante = { ...producto, id: idFinal, nombre: nombreFinal, precio: variante.precio }
    addItem(productoVariante, 1, '')
    toast(`${producto.emoji} ${nombreFinal} agregada`, {
      style: { background: '#42261a', color: '#fff1d2', borderRadius: '12px', fontSize: '0.85rem' },
      duration: 1800,
    })
    setModalProducto(null)
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
          display: 'flex', flexDirection: 'row',
          overflowX: 'scroll', scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          height: `calc(100dvh - ${HEADER_H}px)`,
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        }}
      >
        <SeccionArepas />
        <SeccionEspeciales />
        <SeccionQuesudita />
        <SeccionDesgranados />
        <SeccionParrilla />
        <SeccionClasicos />
        <SeccionBebidas onOpenModal={setModalProducto} />
        <SeccionAdicionales />
      </div>

      {/* ── Swipe hint ── */}
      {showSwipeHint && (
        <div
          className="anim-fadeInUp"
          style={{
            position: 'fixed', bottom: '118px', left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            zIndex: 20, pointerEvents: 'none',
          }}
        >
          <div style={{
            background: 'rgba(66,38,26,0.75)', borderRadius: '20px',
            padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span className="anim-swipeArrow" style={{ display: 'inline-block', fontSize: '1rem', lineHeight: 1, color: '#fff1d2' }}>
              →
            </span>
            <p className="font-brinnan" style={{ color: '#fff1d2', fontSize: '13px', fontWeight: 700, margin: 0, whiteSpace: 'nowrap' }}>
              Desliza para ver más
            </p>
          </div>
        </div>
      )}

      {/* ── Dots de navegación — z-index 10, quedan bajo el modal (500) ── */}
      <div
        style={{
          position: 'fixed', bottom: '88px', left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          zIndex: 10, pointerEvents: 'none',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(0,0,0,0.35)', borderRadius: '20px', padding: '6px 12px',
        }}>
          {DOT_COLORS.map((color, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a sección ${i + 1}`}
              style={{
                width: '8px', height: '8px', borderRadius: '50%',
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

      {/* ── Modal de variante — renderizado AQUÍ, fuera del scroll container ── */}
      {modalProducto && (
        <ModalVariante
          producto={modalProducto}
          onClose={() => setModalProducto(null)}
          onAgregar={handleAgregarVariante}
        />
      )}
    </div>
  )
}

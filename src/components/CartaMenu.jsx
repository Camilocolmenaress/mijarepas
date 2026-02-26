import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import useCartStore from '../store/useCartStore'
import { productos } from '../data/menu'
import { formatCOP } from '../utils/formatCOP'

/* ─── Placeholder de imagen ─────────────────────────────────────────── */
function ImagePlaceholder({ bg, borderColor, textColor }) {
  return (
    <div
      style={{
        width: '100%', height: '200px',
        background: bg,
        border: `2px dashed ${borderColor}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '0',
      }}
    >
      <span
        className="font-brinnan"
        style={{ color: textColor, opacity: 0.4, fontSize: '0.9rem', letterSpacing: '0.05em' }}
      >
        [ Foto del plato ]
      </span>
    </div>
  )
}

/* ─── Fila de producto ───────────────────────────────────────────────── */
function FilaProducto({ producto, accentColor, btnBg, btnColor, separatorColor }) {
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const [popKey, setPopKey] = useState(0)

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(producto)
    setPopKey(k => k + 1)
    toast(`${producto.emoji} ${producto.nombre} agregada`, {
      style: {
        background: '#42261a', color: '#fff1d2',
        borderRadius: '12px', fontSize: '0.85rem',
      },
      duration: 1800,
    })
  }

  return (
    <>
      <div
        onClick={() => navigate(`/producto/${producto.id}`)}
        style={{
          display: 'flex', alignItems: 'flex-start',
          gap: '10px', padding: '12px 0',
          cursor: 'pointer',
        }}
      >
        {/* Nombre + descripción */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            className="font-healing"
            style={{ color: '#42261a', fontSize: '1rem', lineHeight: 1.25, marginBottom: '2px' }}
          >
            {producto.nombre}
          </p>
          {producto.desc && (
            <p
              className="font-brinnan"
              style={{ color: '#42261a', opacity: 0.65, fontSize: '0.75rem', lineHeight: 1.4 }}
            >
              {producto.desc}
            </p>
          )}
        </div>

        {/* Precio + botón */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <span
            className="font-chreed"
            style={{ color: accentColor, fontSize: '1rem', whiteSpace: 'nowrap' }}
          >
            {formatCOP(producto.precio)}
          </span>

          <motion.button
            key={popKey}
            initial={popKey > 0 ? { scale: 1.4 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            onClick={handleAdd}
            aria-label={`Agregar ${producto.nombre}`}
            style={{
              background: btnBg, color: btnColor,
              border: 'none', borderRadius: '50%',
              width: '30px', height: '30px',
              fontSize: '1.1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, lineHeight: 1,
            }}
          >
            +
          </motion.button>
        </div>
      </div>

      {/* Separador punteado */}
      <div
        style={{
          borderBottom: `1.5px dashed ${separatorColor}`,
          opacity: 0.35,
          marginLeft: '0',
        }}
      />
    </>
  )
}

/* ─── Sección temática ───────────────────────────────────────────────── */
function Seccion({
  bg, titulo, tituloColor, subtitulos,
  categorias, accentColor, btnBg, btnColor,
  separatorColor, placeholderBg, placeholderBorder, placeholderText,
  dosColumnas = false,
  descripcion = null, precioDestacado = null,
}) {
  const todosLosProductos = categorias.flatMap(cat =>
    productos.filter(p => p.cat === cat)
  )

  // Agrupar por subcategoría si hay varios subtítulos
  const grupos = categorias.map((cat, i) => ({
    cat,
    label: subtitulos[i] || null,
    items: productos.filter(p => p.cat === cat),
  }))

  return (
    <section style={{ background: bg, padding: '28px 20px 32px' }}>
      {/* Título principal */}
      <h2
        className="font-chreed"
        style={{
          color: tituloColor, fontSize: 'clamp(2rem, 8vw, 2.8rem)',
          lineHeight: 1.05, marginBottom: descripcion ? '6px' : '0',
        }}
      >
        {titulo}
      </h2>

      {/* Descripción opcional (sección quesudita) */}
      {descripcion && (
        <p className="font-brinnan" style={{ color: tituloColor, opacity: 0.8, fontSize: '0.85rem', marginBottom: '4px' }}>
          {descripcion}
        </p>
      )}

      {/* Precio destacado opcional */}
      {precioDestacado && (
        <p className="font-chreed" style={{ color: '#f9ac31', fontSize: '2rem', marginBottom: '0' }}>
          {precioDestacado}
        </p>
      )}

      {/* Placeholder imagen */}
      <div style={{ margin: '16px -20px 0', lineHeight: 0 }}>
        <ImagePlaceholder
          bg={placeholderBg}
          borderColor={placeholderBorder}
          textColor={placeholderText}
        />
      </div>

      {/* Lista de productos */}
      {dosColumnas ? (
        /* Adicionales en 2 columnas */
        <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          {todosLosProductos.map(p => (
            <FilaProducto
              key={p.id}
              producto={p}
              accentColor={accentColor}
              btnBg={btnBg}
              btnColor={btnColor}
              separatorColor={separatorColor}
            />
          ))}
        </div>
      ) : (
        /* Lista vertical con subsecciones */
        <div style={{ marginTop: '16px' }}>
          {grupos.map(({ cat, label, items }) => (
            <div key={cat}>
              {/* Subtítulo de subsección */}
              {label && (
                <h3
                  className="font-healing"
                  style={{
                    color: tituloColor, fontSize: '1.3rem',
                    marginTop: '20px', marginBottom: '2px',
                    opacity: 0.9,
                  }}
                >
                  {label}
                </h3>
              )}
              {items.map(p => (
                <FilaProducto
                  key={p.id}
                  producto={p}
                  accentColor={accentColor}
                  btnBg={btnBg}
                  btnColor={btnColor}
                  separatorColor={separatorColor}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

/* ─── CartaMenu — búsqueda ───────────────────────────────────────────── */
function BusquedaResultados({ searchQuery }) {
  const navigate = useNavigate()
  const { addItem } = useCartStore()

  const filtered = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.desc || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ padding: '16px 20px', background: '#fff1d2', minHeight: '60vh' }}>
      <p className="font-brinnan" style={{ fontSize: '0.82rem', color: '#7a4d35', marginBottom: '16px' }}>
        {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para «{searchQuery}»
      </p>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
          <p className="font-chreed" style={{ color: '#42261a', fontSize: '1.2rem' }}>Sin resultados</p>
          <p className="font-brinnan" style={{ color: '#7a4d35', fontSize: '0.85rem', marginTop: '4px' }}>
            Intenta con otro nombre
          </p>
        </div>
      ) : (
        <div>
          {filtered.map(p => (
            <FilaProducto
              key={p.id}
              producto={p}
              accentColor="#eb1e55"
              btnBg="#eb1e55"
              btnColor="#fff"
              separatorColor="#42261a"
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Componente principal ───────────────────────────────────────────── */
export default function CartaMenu({ searchQuery }) {
  if (searchQuery && searchQuery.length > 1) {
    return <BusquedaResultados searchQuery={searchQuery} />
  }

  return (
    <div>
      {/* ── SECCIÓN 1 — Crema: Arepas ── */}
      <Seccion
        bg="#fff1d2"
        titulo="Arepas"
        tituloColor="#42261a"
        subtitulos={['Clásiqueras', 'Chicharrona', 'Areburger']}
        categorias={['clasicas', 'chicharronas', 'hamburguesas']}
        accentColor="#eb1e55"
        btnBg="#eb1e55"
        btnColor="#ffffff"
        separatorColor="#42261a"
        placeholderBg="#e8d9b8"
        placeholderBorder="#42261a"
        placeholderText="#42261a"
      />

      {/* ── SECCIÓN 2 — Amarillo: Especiales ── */}
      <Seccion
        bg="#f9ac31"
        titulo="Vea pues las Especiales"
        tituloColor="#42261a"
        subtitulos={['Especiales', 'Desgranadas']}
        categorias={['especiales', 'desgranadas']}
        accentColor="#42261a"
        btnBg="#42261a"
        btnColor="#fff1d2"
        separatorColor="#42261a"
        placeholderBg="#e09a20"
        placeholderBorder="#42261a"
        placeholderText="#42261a"
      />

      {/* ── SECCIÓN 3 — Fucsia: Quesudita + Parrilla ── */}
      <Seccion
        bg="#eb1e55"
        titulo="Arma tu Quesudita"
        tituloColor="#fff1d2"
        descripcion="Incluye queso mozzarella y queso costeño"
        precioDestacado="$33.500"
        subtitulos={['Parrilla']}
        categorias={['parrilla']}
        accentColor="#f9ac31"
        btnBg="#f9ac31"
        btnColor="#42261a"
        separatorColor="#fff1d2"
        placeholderBg="#c8154a"
        placeholderBorder="#fff1d2"
        placeholderText="#fff1d2"
      />

      {/* ── SECCIÓN 4 — Crema: Delicias + Bebidas + Adicionales ── */}
      <Seccion
        bg="#fff1d2"
        titulo="Delicias & Bebidas"
        tituloColor="#42261a"
        subtitulos={['Delicias de mi Tierra', 'Bebidas Frías', 'Bebidas Calientes']}
        categorias={['delicias', 'frias', 'calientes']}
        accentColor="#eb1e55"
        btnBg="#eb1e55"
        btnColor="#ffffff"
        separatorColor="#42261a"
        placeholderBg="#e8d9b8"
        placeholderBorder="#42261a"
        placeholderText="#42261a"
      />

      {/* ── SECCIÓN 5 — Amarillo: Adicionales en 2 columnas ── */}
      <Seccion
        bg="#f9ac31"
        titulo="Adicionales"
        tituloColor="#42261a"
        subtitulos={[]}
        categorias={['adicionales']}
        accentColor="#42261a"
        btnBg="#42261a"
        btnColor="#fff1d2"
        separatorColor="#42261a"
        placeholderBg="#e09a20"
        placeholderBorder="#42261a"
        placeholderText="#42261a"
        dosColumnas
      />
    </div>
  )
}

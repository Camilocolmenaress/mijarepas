import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from '../components/Header'

export default function MenuLayout() {
  const location = useLocation()

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--crema)' }}>
      <ScrollRestoration />
      <Header />
      <AnimatePresence mode="wait">
        {/* key on pathname drives exit/enter animations between routes */}
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </div>
  )
}

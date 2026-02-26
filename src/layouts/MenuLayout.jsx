import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom'
import Header from '../components/Header'

export default function MenuLayout() {
  const location = useLocation()

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--crema)' }}>
      <ScrollRestoration />
      <Header />
      <Outlet key={location.pathname} />
    </div>
  )
}

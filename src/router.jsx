import { createBrowserRouter } from 'react-router-dom'
import MenuLayout from './layouts/MenuLayout'
import SplashPage from './pages/SplashPage'
import MenuPage from './pages/MenuPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ConfirmacionPage from './pages/ConfirmacionPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashPage />,
  },
  {
    // Shared layout — persistent Header for all menu-area routes
    element: <MenuLayout />,
    children: [
      { path: '/menu',         element: <MenuPage /> },
      { path: '/producto/:id', element: <ProductPage /> },
      { path: '/carrito',      element: <CartPage /> },
      { path: '/checkout',     element: <CheckoutPage /> },
    ],
  },
  {
    // Full-screen success — outside MenuLayout (no Header)
    path: '/confirmacion',
    element: <ConfirmacionPage />,
  },
])

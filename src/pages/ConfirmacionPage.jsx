import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import SuccessScreen from '../components/SuccessScreen'

export default function ConfirmacionPage() {
  const navigate = useNavigate()
  const { lastOrder } = useCartStore()

  // Guard: if there's no order (direct URL access), redirect to menu
  useEffect(() => {
    if (!lastOrder) {
      navigate('/menu', { replace: true })
    }
  }, [lastOrder, navigate])

  if (!lastOrder) return null

  return (
    <SuccessScreen
      pedido={lastOrder}
      onReset={() => navigate('/menu', { replace: true })}
    />
  )
}

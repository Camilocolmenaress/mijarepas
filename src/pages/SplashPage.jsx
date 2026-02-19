import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SplashScreen from '../components/SplashScreen'
import PromoPopup from '../components/PromoPopup'

export default function SplashPage() {
  const navigate = useNavigate()
  const [showPromo, setShowPromo] = useState(false)

  const handleStart = () => {
    const seen = sessionStorage.getItem('mijarepas_promo_seen')
    if (!seen) {
      sessionStorage.setItem('mijarepas_promo_seen', '1')
      setShowPromo(true)
    } else {
      navigate('/menu')
    }
  }

  const handlePromoClose = () => {
    setShowPromo(false)
    navigate('/menu')
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <SplashScreen key="splash" onStart={handleStart} />
      </AnimatePresence>

      <AnimatePresence>
        {showPromo && (
          <PromoPopup key="promo" onClose={handlePromoClose} />
        )}
      </AnimatePresence>
    </>
  )
}

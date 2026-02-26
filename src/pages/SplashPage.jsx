import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SplashScreen from '../components/SplashScreen'
import PromoPopup from '../components/PromoPopup'
import SedePage from './SedePage'

// Flujo: Splash → [PromoPopup primera vez] → SedePage → Menú
export default function SplashPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState('splash')   // 'splash' | 'promo' | 'sede'

  const handleStart = () => {
    const seen = sessionStorage.getItem('mijarepas_promo_seen')
    if (!seen) {
      sessionStorage.setItem('mijarepas_promo_seen', '1')
      setStep('promo')
    } else {
      setStep('sede')
    }
  }

  const handlePromoClose = () => {
    setStep('sede')
  }

  const handleSedeSelected = () => {
    navigate('/menu')
  }

  if (step === 'sede') {
    return <SedePage onSedeSelected={handleSedeSelected} />
  }

  return (
    <>
      <SplashScreen onStart={handleStart} />
      {step === 'promo' && <PromoPopup onClose={handlePromoClose} />}
    </>
  )
}

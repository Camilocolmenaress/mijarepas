import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SplashScreen from '../components/SplashScreen'
import SedePage from './SedePage'

// Flujo: Splash → SedePage → Menú (promo popup ahora aparece en MenuPage)
export default function SplashPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState('splash')   // 'splash' | 'sede'

  const handleStart = () => {
    setStep('sede')
  }

  const handleSedeSelected = () => {
    navigate('/menu')
  }

  if (step === 'sede') {
    return <SedePage onSedeSelected={handleSedeSelected} />
  }

  return <SplashScreen onStart={handleStart} />
}

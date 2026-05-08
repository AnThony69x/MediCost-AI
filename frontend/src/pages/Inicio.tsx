import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroPrincipal from '../components/hero/HeroPrincipal'
import SeccionComoFunciona from '../components/landing/SeccionComoFunciona'
import SeccionValor from '../components/landing/SeccionValor'
import { scrollToSectionId } from '../utils/scrollSection'

function Inicio() {
  const location = useLocation()

  useEffect(() => {
    const id = location.hash.replace(/^#/, '')
    if (!id) return
    scrollToSectionId(id)
  }, [location.hash, location.pathname])

  return (
    <>
      <HeroPrincipal />
      <SeccionComoFunciona />
      <SeccionValor />
    </>
  )
}

export default Inicio

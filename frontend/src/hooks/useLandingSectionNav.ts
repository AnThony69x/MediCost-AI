import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSectionId } from '../utils/scrollSection'

/** Navega a anclas de la landing: scroll en `/` o `navigate` + hash si estás en otra ruta. */
export function useLandingSectionNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return useCallback(
    (id: string) => {
      if (location.pathname !== '/') {
        navigate(`/#${id}`)
        return
      }
      scrollToSectionId(id)
    },
    [location.pathname, navigate],
  )
}

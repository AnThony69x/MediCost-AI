import { useCallback, useState } from 'react'
import { enviarChat, type RespuestaChat } from '../services/servicioChat'

export type MensajeChat = {
  id: string
  tipo: 'usuario' | 'sistema'
  texto: string
  respuesta?: RespuestaChat
}

const generarId = () => {
  if ('randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useChat() {
  const [mensajes, setMensajes] = useState<MensajeChat[]>([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const enviarMensaje = useCallback(async (texto: string) => {
    if (!texto.trim()) return

    setError(null)
    setMensajes((prev) => [
      ...prev,
      { id: generarId(), tipo: 'usuario', texto },
    ])

    setCargando(true)
    try {
      const respuesta = await enviarChat(texto)
      setMensajes((prev) => [
        ...prev,
        {
          id: generarId(),
          tipo: 'sistema',
          texto: 'Respuesta generada',
          respuesta,
        },
      ])
    } catch (error) {
      console.error('Chat error', error)
      setError('No pudimos obtener una respuesta. Intenta de nuevo.')
      setMensajes((prev) => [
        ...prev,
        {
          id: generarId(),
          tipo: 'sistema',
          texto: 'Tuvimos un problema al procesar la solicitud.',
        },
      ])
    } finally {
      setCargando(false)
    }
  }, [])

  return { mensajes, enviarMensaje, cargando, error }
}

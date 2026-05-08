import { useCallback, useState } from 'react'
import {
  enviarChat,
  type ConversationTurn,
  type RespuestaChat,
} from '../services/servicioChat'

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

    const history: ConversationTurn[] = mensajes
      .slice(-8)
      .map((mensaje) => ({
        role: mensaje.tipo === 'usuario' ? 'user' : 'assistant',
        content: mensaje.texto,
      }))

    setMensajes((prev) => [...prev, { id: generarId(), tipo: 'usuario', texto }])

    setCargando(true)
    try {
      const respuesta = await enviarChat(texto, history)
      setMensajes((prev) => [
        ...prev,
        {
          id: generarId(),
          tipo: 'sistema',
          texto:
            respuesta.mensaje ||
            'Listo, ya tengo una orientación para tu caso y te la muestro abajo.',
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
  }, [mensajes])

  return { mensajes, enviarMensaje, cargando, error }
}

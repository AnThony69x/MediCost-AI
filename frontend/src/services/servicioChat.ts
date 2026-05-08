import { isAxiosError } from 'axios'

import api from './api'

const defaultUserId = import.meta.env.VITE_DEFAULT_USER_ID || ''

export type ConversationTurn = {
  role: 'user' | 'assistant'
  content: string
}

export type Hospital = {
  nombre: string
  ubicacion?: string
  copago: number
  costo?: number
}

export type RespuestaChat = {
  requiere_asesoria_medica: boolean
  especialidad: string
  servicio?: string
  cobertura: number
  copago: number
  hospitales: Hospital[]
  recomendacion?: string
  mensaje?: string
}

export async function enviarChat(
  mensaje: string,
  history: ConversationTurn[] = [],
) {
  if (!defaultUserId) {
    throw new Error('Falta VITE_DEFAULT_USER_ID en frontend/.env')
  }

  const payload = { user_id: defaultUserId, message: mensaje, history }

  try {
    const { data } = await api.post<RespuestaChat>('/api/v1/chat', payload)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          'No se pudo conectar con el backend.',
          { cause: error },
        )
      }

      const detalle =
        typeof error.response.data?.detail === 'string'
          ? error.response.data.detail
          : undefined

      throw new Error(detalle || `Error del backend (${error.response.status}).`, {
        cause: error,
      })
    }

    throw new Error('Ocurrio un error inesperado al procesar tu solicitud.', {
      cause: error,
    })
  }
}

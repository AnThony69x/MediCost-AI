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
  const { data } = await api.post<RespuestaChat>('/api/v1/chat', payload)
  return data
}

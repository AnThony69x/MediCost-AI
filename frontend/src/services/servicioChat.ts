import api from './api'

export type Hospital = {
  nombre: string
  copago: number
  costo?: number
}

export type RespuestaChat = {
  especialidad: string
  cobertura: number
  copago: number
  hospitales: Hospital[]
}

export async function enviarChat(mensaje: string) {
  const { data } = await api.post<RespuestaChat>('/chat', { mensaje })
  return data
}

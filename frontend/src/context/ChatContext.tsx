import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { useChat, type MensajeChat } from '../hooks/useChat'

type ChatContextValue = {
  mensajes: MensajeChat[]
  enviarMensaje: (texto: string) => Promise<void>
  cargando: boolean
  error: string | null
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const value = useChat()

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider')
  }
  return context
}

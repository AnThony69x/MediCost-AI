import { Send } from 'lucide-react'
import { useState } from 'react'

type EntradaChatProps = {
  onEnviar: (texto: string) => void
  deshabilitado?: boolean
}

function EntradaChat({ onEnviar, deshabilitado = false }: EntradaChatProps) {
  const [texto, setTexto] = useState('')

  const enviar = () => {
    if (!texto.trim()) return
    onEnviar(texto.trim())
    setTexto('')
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-stroke bg-white px-4 py-3 shadow-soft">
      <input
        type="text"
        className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        placeholder="Describe tu sintoma (ej: dolor en el pecho)"
        value={texto}
        onChange={(event) => setTexto(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') enviar()
        }}
        disabled={deshabilitado}
      />
      <button
        type="button"
        onClick={enviar}
        disabled={deshabilitado}
        className="grid h-10 w-10 place-items-center rounded-full bg-info text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        aria-label="Enviar mensaje"
      >
        <Send size={18} />
      </button>
    </div>
  )
}

export default EntradaChat

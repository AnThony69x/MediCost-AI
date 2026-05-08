import { Send } from 'lucide-react'
import { useState } from 'react'

type EntradaChatProps = {
  onEnviar: (texto: string) => void
  deshabilitado?: boolean
  mostrarTextoEnviar?: boolean
}

function EntradaChat({
  onEnviar,
  deshabilitado = false,
  mostrarTextoEnviar = false,
}: EntradaChatProps) {
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
        placeholder="Ej: dolor en el pecho, fiebre, dolor de cabeza…"
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
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-info font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${
          mostrarTextoEnviar ? 'px-4 py-2 text-sm' : 'h-10 w-10 shrink-0'
        }`}
        aria-label="Enviar mensaje"
      >
        {mostrarTextoEnviar ? (
          <>
            <Send size={18} aria-hidden />
            Enviar
          </>
        ) : (
          <Send size={18} />
        )}
      </button>
    </div>
  )
}

export default EntradaChat

import { Send } from 'lucide-react'
import { useState } from 'react'

type EntradaChatProps = Readonly<{
  onEnviar: (texto: string) => void
  deshabilitado?: boolean
  mostrarTextoEnviar?: boolean
}>

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
    <div className="flex items-end gap-3 rounded-3xl border border-slate-800 bg-slate-900/50 px-4 py-3 backdrop-blur-xl transition-all duration-300 focus-within:border-primary/50 focus-within:bg-slate-900 focus-within:shadow-[0_0_20px_rgba(37,99,235,0.1)]">
      <textarea
        rows={1}
        className="min-h-[44px] flex-1 resize-none bg-transparent py-2.5 text-sm leading-relaxed text-white outline-none placeholder:text-slate-500"
        placeholder="Describe tus síntomas aquí..."
        value={texto}
        onChange={(event) => setTexto(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            enviar()
          }
        }}
        disabled={deshabilitado}
      />
      <button
        type="button"
        onClick={enviar}
        disabled={deshabilitado || !texto.trim()}
        className={`btn-primary flex items-center justify-center gap-2 transition-all disabled:opacity-30 disabled:scale-100 disabled:shadow-none ${
          mostrarTextoEnviar ? 'px-6 py-2.5 text-sm' : 'h-11 w-11 shrink-0 p-0'
        }`}
        aria-label="Enviar mensaje"
      >
        <Send size={18} className={mostrarTextoEnviar ? '' : 'ml-0.5'} />
        {mostrarTextoEnviar && <span>Enviar</span>}
      </button>
    </div>
  )

}

export default EntradaChat


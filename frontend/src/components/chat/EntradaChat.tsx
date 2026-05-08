import { Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = '0px'
    const nextHeight = Math.min(textarea.scrollHeight, 180)
    textarea.style.height = `${nextHeight}px`
  }, [texto])

  const enviar = () => {
    if (!texto.trim()) return
    onEnviar(texto.trim())
    setTexto('')
  }

  return (
    <div className="flex items-end gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/50 px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-xl transition-all duration-300 focus-within:border-primary/50 focus-within:bg-slate-900 focus-within:shadow-[0_0_20px_rgba(37,99,235,0.1)]">
      <textarea
        ref={textareaRef}
        rows={1}
        className="max-h-[180px] min-h-[40px] sm:min-h-[44px] flex-1 resize-none overflow-y-auto bg-transparent py-2 text-[13px] sm:text-sm leading-relaxed text-white outline-none placeholder:text-slate-500 custom-scrollbar"
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
          mostrarTextoEnviar ? 'h-9 sm:h-11 px-3 sm:px-6 py-2 text-xs sm:text-sm' : 'h-9 w-9 sm:h-11 sm:w-11 shrink-0 p-0'
        }`}
        aria-label="Enviar mensaje"
      >
        <Send size={18} className={mostrarTextoEnviar ? 'shrink-0' : 'ml-0.5'} />
        {mostrarTextoEnviar && <span className="hidden sm:inline">Enviar</span>}
      </button>

    </div>
  )

}

export default EntradaChat


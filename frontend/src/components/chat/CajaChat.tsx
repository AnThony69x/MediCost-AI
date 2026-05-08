import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Zap, Bot } from 'lucide-react'
import { useChatContext } from '../../context/ChatContext'
import BurbujaMensaje from './BurbujaMensaje'
import EntradaChat from './EntradaChat'
import LoaderEscribiendo from './LoaderEscribiendo'

type CajaChatProps = Readonly<{
  variant?: 'default' | 'page'
}>

function CajaChat({ variant = 'default' }: CajaChatProps) {
  const { mensajes, enviarMensaje, cargando, error } = useChatContext()
  const contenedorRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const [seguir, setSeguir] = useState(true)
  const esPagina = variant === 'page'

  useEffect(() => {
    if (!seguir) return
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [seguir, mensajes, cargando])

  const manejarScroll = () => {
    const contenedor = contenedorRef.current
    if (!contenedor) return
    const distanciaAlFinal =
      contenedor.scrollHeight - contenedor.scrollTop - contenedor.clientHeight
    setSeguir(distanciaAlFinal < 180)
  }

  const irAlFinal = () => {
    setSeguir(true)
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  return (
    <section
      className={`flex flex-col h-full max-h-full overflow-hidden relative shadow-2xl border border-white/25 m-[1px] ${
        esPagina ? 'bg-slate-950/80 rounded-[2.5rem]' : 'glass-card rounded-[2.5rem] p-0'
      }`}
    >


      {/* --- HEADER --- */}
      <div className="flex shrink-0 items-center justify-between gap-4 p-5 sm:p-7 relative z-30 bg-slate-900/90 backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-11 w-11 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/30 border border-white/10">
              <Bot className="text-white" size={28} />
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-glow-accent" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight font-display leading-tight">Asistente MediCost AI</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium font-sans">Especialista en Cobertura</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span className="text-[10px] sm:text-xs text-emerald-500 font-bold uppercase tracking-widest font-display">En Línea</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
          <Zap size={14} className="text-primary" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest font-display">Llama 3.3 Engine</span>
        </div>

        {/* Separador inferior Header */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10" />
      </div>

      {/* --- MENSAJES --- */}
      <div
        ref={contenedorRef}
        onScroll={manejarScroll}
        data-lenis-prevent
        className="flex-1 overflow-y-auto px-4 sm:px-10 py-10 scroll-smooth custom-scrollbar relative bg-slate-950/40"
      >
        <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-16">
          {mensajes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center space-y-6">
              <div className="h-20 w-20 rounded-[2.5rem] bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-700 shadow-inner animate-pulse">
                <Zap size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-display">¿Cómo puedo ayudarte hoy?</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Describe tus síntomas para calcular copagos y ver hospitales recomendados.
                </p>
              </div>
            </div>
          ) : (
            mensajes.map((mensaje, index) => (
              <div
                key={mensaje.id}
                className="animate-rise"
                style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
              >
                <BurbujaMensaje mensaje={mensaje} />
              </div>
            ))
          )}
          {cargando && (
            <div className="animate-rise">
              <LoaderEscribiendo />
            </div>
          )}
          <div ref={bottomRef} aria-hidden />
        </div>

        {/* Botón flotante Ir al final */}
        {!seguir && mensajes.length > 0 && (
          <button
            onClick={irAlFinal}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 rounded-full bg-primary/95 text-white text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-white/20 shadow-2xl hover:bg-primary transition-all hover:scale-110 active:scale-95 animate-bounce-subtle z-40"
          >
            <ChevronDown size={14} />
            Mensajes nuevos
          </button>
        )}
      </div>

      {/* --- ERROR --- */}
      {error && (
        <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/20 z-20">
          <p className="text-xs font-semibold text-red-500 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            {error}
          </p>
        </div>
      )}

      {/* --- INPUT --- */}
      <div className="shrink-0 p-5 sm:p-10 bg-slate-900/90 backdrop-blur-3xl relative z-30">
        {/* Separador superior Input */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
        
        <div className="max-w-4xl mx-auto w-full">
          <EntradaChat
            onEnviar={enviarMensaje}
            deshabilitado={cargando}
            mostrarTextoEnviar={esPagina}
          />
        </div>
      </div>
    </section>
  )
}

export default CajaChat

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
  const ultimaRespuestaRef = useRef<HTMLDivElement | null>(null)
  const ultimaRespuestaIdRef = useRef<string | null>(null)
  const [seguir, setSeguir] = useState(true)
  const esPagina = variant === 'page'
  const mostrarEstadoInicial = mensajes.length === 0 && !cargando

  const scrollAlFinal = (behavior: ScrollBehavior = 'smooth') => {
    const contenedor = contenedorRef.current
    if (!contenedor) return
    contenedor.scrollTo({
      top: contenedor.scrollHeight,
      behavior,
    })
  }

  const scrollAInicioUltimaRespuesta = (behavior: ScrollBehavior = 'smooth') => {
    const contenedor = contenedorRef.current
    const ultimaRespuesta = ultimaRespuestaRef.current
    if (!contenedor || !ultimaRespuesta) return
    const topObjetivo = Math.max(0, ultimaRespuesta.offsetTop - 12)
    contenedor.scrollTo({
      top: topObjetivo,
      behavior,
    })
  }

  useEffect(() => {
    if (!seguir) return
    // Keep following newest content naturally.
    scrollAlFinal('auto')
    const raf = requestAnimationFrame(() => {
      scrollAlFinal('smooth')
    })
    return () => cancelAnimationFrame(raf)
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
    scrollAlFinal('smooth')
  }

  const manejarEnviarMensaje = async (texto: string) => {
    // Always keep latest exchange visible when user sends.
    setSeguir(true)
    await enviarMensaje(texto)
  }

  useEffect(() => {
    if (!seguir || mensajes.length === 0) return
    const timer = window.setTimeout(() => {
      scrollAlFinal('auto')
    }, 120)
    return () => window.clearTimeout(timer)
  }, [mensajes.length, seguir])

  useEffect(() => {
    const ultimoMensaje = mensajes[mensajes.length - 1]
    if (!ultimoMensaje || ultimoMensaje.tipo !== 'sistema' || cargando) return
    if (ultimaRespuestaIdRef.current === ultimoMensaje.id) return
    ultimaRespuestaIdRef.current = ultimoMensaje.id

    // Position once at the start of each new assistant response.
    scrollAInicioUltimaRespuesta('auto')
    const raf = requestAnimationFrame(() => {
      scrollAInicioUltimaRespuesta('smooth')
    })
    return () => cancelAnimationFrame(raf)
  }, [mensajes, cargando])

  return (
    <section
      className={`flex h-full max-h-full min-h-0 flex-col overflow-hidden relative shadow-2xl border border-white/25 m-[1px] ${
        esPagina
          ? 'bg-slate-950/80 rounded-[1.75rem] sm:rounded-[2.5rem]'
          : 'glass-card rounded-[1.75rem] sm:rounded-[2.5rem] p-0'
      }`}
    >


      {/* --- HEADER --- */}
      <div className="flex shrink-0 items-center justify-between gap-3 p-3 sm:p-3.5 lg:p-4 relative z-30 bg-slate-900/90 backdrop-blur-2xl">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="relative">
            <div className="h-11 w-11 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/30 border border-white/10">
              <Bot className="text-white" size={28} />
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-glow-accent" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-sm sm:text-lg font-bold text-white tracking-tight font-display leading-tight">Asistente MediCost AI</h2>
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
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-6 lg:px-8 pt-1 pb-3 sm:pt-3 sm:pb-5 lg:pt-4 lg:pb-6 scroll-smooth custom-scrollbar relative bg-slate-950/40"
      >
        {mostrarEstadoInicial ? (
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
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
          </div>
        ) : (
          <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-5 sm:gap-8 pb-2 sm:pb-3">
            {mensajes.map((mensaje, index) => (
              <div
                key={mensaje.id}
                className="animate-rise"
                style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
                ref={
                  index === mensajes.length - 1 && mensaje.tipo === 'sistema'
                    ? ultimaRespuestaRef
                    : null
                }
              >
                <BurbujaMensaje mensaje={mensaje} />
              </div>
            ))}
            {cargando && (
              <div className="animate-rise">
                <LoaderEscribiendo />
              </div>
            )}
            <div ref={bottomRef} aria-hidden />
          </div>
        )}

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
      <div className="shrink-0 p-3 sm:p-3.5 lg:p-4 bg-slate-900/90 backdrop-blur-3xl relative z-30">
        {/* Separador superior Input */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
        
        <div className="max-w-5xl mx-auto w-full">
          <EntradaChat
            onEnviar={manejarEnviarMensaje}
            deshabilitado={cargando}
            mostrarTextoEnviar={esPagina}
          />
        </div>
      </div>
    </section>
  )
}

export default CajaChat

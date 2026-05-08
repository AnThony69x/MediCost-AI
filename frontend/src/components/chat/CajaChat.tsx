import { useEffect, useRef, useState } from 'react'
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

  return (
    <section
      className={`glass rounded-[2rem] border-white/60 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:p-6 ${
        esPagina ? 'flex min-h-0 flex-1 flex-col' : ''
      }`}
    >
      <div className="flex shrink-0 items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">Asistente MediCost-AI</p>
          <p className="text-xs text-muted">
            Especialidad, cobertura, copago y hospitales en un solo lugar.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-soft">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
          {' '}
          En línea
        </span>
      </div>

      <div
        ref={contenedorRef}
        onScroll={manejarScroll}
        className={`scroll-smooth-extended mt-4 flex flex-col gap-4 overflow-y-auto pr-1 sm:pr-2 ${
          esPagina ? 'min-h-0 flex-1' : 'max-h-[420px]'
        }`}
      >
        {mensajes.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-stroke bg-white/70 p-6 text-sm text-muted shadow-soft">
            Describe tu síntoma para ver especialidad, cobertura, copago y
            hospitales recomendados.
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
        {cargando ? <LoaderEscribiendo /> : null}
        <div ref={bottomRef} aria-hidden />
      </div>

      {error ? (
        <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </p>
      ) : null}

      <div className={`mt-4 ${esPagina ? 'shrink-0' : ''}`}>
        <EntradaChat
          onEnviar={enviarMensaje}
          deshabilitado={cargando}
          mostrarTextoEnviar={esPagina}
        />
      </div>
    </section>
  )
}

export default CajaChat

import { useEffect, useRef } from 'react'
import { useChatContext } from '../../context/ChatContext'
import BurbujaMensaje from './BurbujaMensaje'
import EntradaChat from './EntradaChat'
import LoaderEscribiendo from './LoaderEscribiendo'

type CajaChatProps = {
  variant?: 'default' | 'page'
}

function CajaChat({ variant = 'default' }: CajaChatProps) {
  const { mensajes, enviarMensaje, cargando, error } = useChatContext()
  const contenedorRef = useRef<HTMLDivElement | null>(null)
  const esPagina = variant === 'page'

  useEffect(() => {
    const contenedor = contenedorRef.current
    if (!contenedor) return
    contenedor.scrollTop = contenedor.scrollHeight
  }, [mensajes, cargando])

  return (
    <section
      className={`glass rounded-[28px] p-6 shadow-medium ${
        esPagina ? 'flex min-h-0 flex-1 flex-col' : ''
      }`}
    >
      <div className="flex shrink-0 items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Asistente MediCost-AI</p>
          <p className="text-xs text-muted">
            Especialidad, cobertura, copago y hospitales en un solo lugar.
          </p>
        </div>
        <span className="rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-accent">
          En linea
        </span>
      </div>

      <div
        ref={contenedorRef}
        className={`mt-4 flex flex-col gap-4 overflow-y-auto pr-2 ${
          esPagina ? 'min-h-0 flex-1' : 'max-h-[380px]'
        }`}
      >
        {mensajes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stroke bg-white/80 p-6 text-sm text-muted">
            Describe tu síntoma para ver especialidad, cobertura, copago y
            hospitales recomendados.
          </div>
        ) : (
          mensajes.map((mensaje) => (
            <BurbujaMensaje key={mensaje.id} mensaje={mensaje} />
          ))
        )}
        {cargando ? <LoaderEscribiendo /> : null}
      </div>

      {error ? (
        <p className="mt-3 text-xs text-red-600">{error}</p>
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

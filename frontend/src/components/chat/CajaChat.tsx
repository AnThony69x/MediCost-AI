import { useEffect, useRef } from 'react'
import { useChatContext } from '../../context/ChatContext'
import BurbujaMensaje from './BurbujaMensaje'
import EntradaChat from './EntradaChat'
import LoaderEscribiendo from './LoaderEscribiendo'

function CajaChat() {
  const { mensajes, enviarMensaje, cargando, error } = useChatContext()
  const contenedorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const contenedor = contenedorRef.current
    if (!contenedor) return
    contenedor.scrollTop = contenedor.scrollHeight
  }, [mensajes, cargando])

  return (
    <section className="glass rounded-[28px] p-6 shadow-medium">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Chat medico inteligente</p>
          <p className="text-xs text-muted">Conversacion segura y sin friccion</p>
        </div>
        <span className="rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-accent">
          En linea
        </span>
      </div>

      <div
        ref={contenedorRef}
        className="mt-4 flex max-h-[380px] flex-col gap-4 overflow-y-auto pr-2"
      >
        {mensajes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stroke bg-white/80 p-6 text-sm text-muted">
            Describe tu sintoma para ver especialidad, cobertura, copago y
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

      <div className="mt-4">
        <EntradaChat onEnviar={enviarMensaje} deshabilitado={cargando} />
      </div>
    </section>
  )
}

export default CajaChat

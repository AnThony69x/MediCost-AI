import type { MensajeChat } from '../../hooks/useChat'
import TarjetaCopago from '../copago/TarjetaCopago'
import ListaHospitales from '../hospitals/ListaHospitales'

type BurbujaMensajeProps = {
  readonly mensaje: MensajeChat
}

function BurbujaMensaje({ mensaje }: BurbujaMensajeProps) {
  if (mensaje.tipo === 'usuario') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%] rounded-2xl bg-accent px-5 py-3 text-sm leading-6 text-white shadow-glow">
          {mensaje.texto}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div className="w-full max-w-[92%] space-y-4 rounded-3xl glass-card p-5">
        {mensaje.respuesta?.requiere_asesoria_medica ? (
          <div className="space-y-6">
            <div className="text-sm leading-relaxed text-ink font-medium">
              {mensaje.texto}
            </div>
            <TarjetaCopago respuesta={mensaje.respuesta} />
            <ListaHospitales hospitales={mensaje.respuesta.hospitales} />
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-muted font-medium">
            {mensaje.texto}
          </p>
        )}
      </div>
    </div>
  )
}

export default BurbujaMensaje


import type { MensajeChat } from '../../hooks/useChat'
import TarjetaCopago from '../copago/TarjetaCopago'
import ListaHospitales from '../hospitals/ListaHospitales'

type BurbujaMensajeProps = {
  mensaje: MensajeChat
}

function BurbujaMensaje({ mensaje }: BurbujaMensajeProps) {
  if (mensaje.tipo === 'usuario') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-2xl bg-info px-4 py-3 text-sm text-white shadow-medium">
          {mensaje.texto}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div className="w-full max-w-[80%] rounded-2xl border border-stroke bg-white p-4 shadow-soft">
        <p className="text-sm font-semibold text-ink">Resumen de la consulta</p>
        {mensaje.respuesta ? (
          <div className="mt-4 grid gap-4">
            <TarjetaCopago respuesta={mensaje.respuesta} />
            <ListaHospitales hospitales={mensaje.respuesta.hospitales} />
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted">{mensaje.texto}</p>
        )}
      </div>
    </div>
  )
}

export default BurbujaMensaje

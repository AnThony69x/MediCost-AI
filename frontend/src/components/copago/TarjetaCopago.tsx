import type { RespuestaChat } from '../../services/servicioChat'
import { formatearMoneda } from '../../utils/formatearMoneda'

function TarjetaCopago({ respuesta }: { respuesta: RespuestaChat }) {
  const cobertura = Math.round(respuesta.cobertura * 100)

  return (
    <div className="rounded-2xl border border-stroke bg-white p-4 shadow-soft">
      <p className="text-sm font-semibold text-ink">Resumen economico</p>
      <div className="mt-3 grid gap-2 text-sm text-muted">
        <div className="flex items-center justify-between">
          <span>Especialidad recomendada</span>
          <span className="font-semibold text-ink">
            {respuesta.especialidad}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Cobertura de tu seguro</span>
          <span className="font-semibold text-ink">{cobertura}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Copago estimado</span>
          <span className="text-base font-semibold text-ink">
            {formatearMoneda(respuesta.copago)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TarjetaCopago

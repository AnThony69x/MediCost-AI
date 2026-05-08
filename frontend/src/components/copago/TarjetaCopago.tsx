import type { RespuestaChat } from '../../services/servicioChat'
import { formatearMoneda } from '../../utils/formatearMoneda'

function TarjetaCopago({ respuesta }: Readonly<{ respuesta: RespuestaChat }>) {
  const cobertura = Math.round(respuesta.cobertura * 100)

  return (
    <div className="surface-card overflow-hidden border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,250,248,0.92))] p-4 shadow-[0_18px_36px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Resumen económico
          </p>
          <p className="mt-1 text-sm font-semibold text-ink">
            {respuesta.especialidad}
          </p>
        </div>
        <span className="rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-accent">
          Cobertura {cobertura}%
        </span>
      </div>
      <div className="mt-4 grid gap-3 text-sm text-muted">
        <div className="flex items-center justify-between rounded-2xl bg-white/70 px-3 py-2">
          <span>Especialidad recomendada</span>
          <span className="font-semibold text-ink">
            {respuesta.especialidad}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white/70 px-3 py-2">
          <span>Cobertura de tu seguro</span>
          <span className="font-semibold text-ink">{cobertura}%</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white/70 px-3 py-2">
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

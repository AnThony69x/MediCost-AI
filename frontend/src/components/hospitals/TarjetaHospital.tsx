import { formatearMoneda } from '../../utils/formatearMoneda'

type TarjetaHospitalProps = Readonly<{
  nombre: string
  copago: number
  costo?: number
  destacado?: boolean
}>

function TarjetaHospital({
  nombre,
  copago,
  costo,
  destacado = false,
}: TarjetaHospitalProps) {
  return (
    <div
      className={`group rounded-[1.5rem] border p-4 shadow-[0_18px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_44px_rgba(15,23,42,0.12)] ${
        destacado
          ? 'border-accent/25 bg-[linear-gradient(180deg,rgba(232,251,247,0.98),rgba(255,255,255,0.96))]'
          : 'border-white/70 bg-white/85'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink">{nombre}</p>
          <p className="mt-1 text-xs text-muted">Comparación de tu red</p>
        </div>
        {destacado ? (
          <span className="rounded-full bg-[linear-gradient(135deg,rgba(15,118,110,1),rgba(20,184,166,0.9))] px-3 py-1 text-xs font-semibold text-white shadow-glow">
            Mejor opción
          </span>
        ) : null}
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        {typeof costo === 'number' ? (
          <div className="flex items-center justify-between rounded-2xl bg-white/65 px-3 py-2 text-muted">
            <span>Costo del servicio</span>
            <span className="font-semibold text-ink">{formatearMoneda(costo)}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between rounded-2xl bg-white/65 px-3 py-2 text-muted">
          <span>Copago estimado</span>
          <span className="text-lg font-semibold text-ink">
            {formatearMoneda(copago)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TarjetaHospital

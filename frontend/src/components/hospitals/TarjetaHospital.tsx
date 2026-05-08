import { formatearMoneda } from '../../utils/formatearMoneda'

type TarjetaHospitalProps = {
  nombre: string
  copago: number
  costo?: number
  destacado?: boolean
}

function TarjetaHospital({
  nombre,
  copago,
  costo,
  destacado = false,
}: TarjetaHospitalProps) {
  return (
    <div
      className={`rounded-2xl border p-4 shadow-soft ${
        destacado
          ? 'border-accent bg-accentSoft'
          : 'border-stroke bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">{nombre}</p>
        </div>
        {destacado ? (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
            Mejor opcion
          </span>
        ) : null}
      </div>
      <div className="mt-3 grid gap-2 text-sm">
        {typeof costo === 'number' ? (
          <div className="flex items-center justify-between text-muted">
            <span>Costo del servicio</span>
            <span className="font-semibold text-ink">{formatearMoneda(costo)}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between text-muted">
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

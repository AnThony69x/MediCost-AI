import { formatearMoneda } from '../../utils/formatearMoneda'

type TarjetaHospitalProps = {
  nombre: string
  copago: number
  destacado?: boolean
}

function TarjetaHospital({ nombre, copago, destacado = false }: TarjetaHospitalProps) {
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
          <p className="text-xs text-muted">Copago estimado</p>
        </div>
        {destacado ? (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
            Mejor opcion
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-lg font-semibold text-ink">
        {formatearMoneda(copago)}
      </p>
    </div>
  )
}

export default TarjetaHospital

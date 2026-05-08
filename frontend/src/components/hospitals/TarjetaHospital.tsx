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
      className={`hospital-card group h-full rounded-[1.25rem] border p-4 sm:p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${
        destacado
          ? 'hospital-card-destacado border-primary/40 shadow-glow-primary'
          : 'hospital-card-normal'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="hospital-card-title text-sm font-bold break-words">{nombre}</p>
          <p className="hospital-card-subtitle mt-1 text-[10px] uppercase tracking-wider">Comparación de Red</p>
        </div>
        {destacado ? (
          <span className="badge-mejor-opcion shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold sm:px-3 sm:text-[10px]">
            MEJOR OPCIÓN
          </span>
        ) : null}
      </div>
      
      <div className="mt-5 space-y-2 text-sm">
        {typeof costo === 'number' ? (
          <div className="hospital-card-row flex items-center justify-between gap-3 rounded-xl px-3 py-2">
            <span className="text-xs sm:text-sm">Costo total</span>
            <span className="hospital-card-value font-semibold">{formatearMoneda(costo)}</span>
          </div>
        ) : null}
        <div className="hospital-card-row flex items-center justify-between gap-3 rounded-xl px-3 py-2">
          <span className="text-xs sm:text-sm">Tú pagas (Copago)</span>
          <span className="hospital-card-value text-base font-black sm:text-lg">
            {formatearMoneda(copago)}
          </span>
        </div>
      </div>
    </div>
  )
}


export default TarjetaHospital

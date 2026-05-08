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
      className={`group h-full rounded-[1.25rem] border p-4 sm:p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${
        destacado
          ? 'border-primary/40 bg-slate-900/80 shadow-glow-primary'
          : 'border-white/5 bg-slate-950/40'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-white break-words">{nombre}</p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">Comparación de Red</p>
        </div>
        {destacado ? (
          <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[9px] font-bold text-white shadow-glow-primary sm:px-3 sm:text-[10px]">
            MEJOR OPCIÓN
          </span>
        ) : null}
      </div>
      
      <div className="mt-5 space-y-2 text-sm">
        {typeof costo === 'number' ? (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-950/40 px-3 py-2 text-slate-400">
            <span className="text-xs sm:text-sm">Costo total</span>
            <span className="font-semibold text-white">{formatearMoneda(costo)}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-950/40 px-3 py-2 text-slate-400">
          <span className="text-xs sm:text-sm">Tú pagas (Copago)</span>
          <span className="text-base font-black text-white sm:text-lg">
            {formatearMoneda(copago)}
          </span>
        </div>
      </div>
    </div>
  )
}


export default TarjetaHospital

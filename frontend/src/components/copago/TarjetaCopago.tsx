import type { RespuestaChat } from '../../services/servicioChat'
import { formatearMoneda } from '../../utils/formatearMoneda'

function TarjetaCopago({ respuesta }: Readonly<{ respuesta: RespuestaChat }>) {
  const cobertura = Math.round(respuesta.cobertura * 100)

  return (
    <div className="glass-card overflow-hidden border-slate-800 bg-slate-900/60 p-5 rounded-3xl">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            Resumen económico
          </p>
          <h4 className="mt-1 text-lg font-bold text-white">
            {respuesta.especialidad}
          </h4>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black text-white">
            {cobertura}%
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Cobertura
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-2xl bg-slate-950/40 border border-white/5 px-4 py-3">
          <span className="text-sm text-slate-400">Especialidad</span>
          <span className="text-sm font-semibold text-white">
            {respuesta.especialidad}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-slate-950/40 border border-white/5 px-4 py-3">
          <span className="text-sm text-slate-400">Tu seguro cubre</span>
          <span className="text-sm font-semibold text-white">{cobertura}%</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-primary/10 border border-primary/20 px-4 py-4 mt-2">
          <span className="text-sm font-bold text-primary">Copago estimado</span>
          <span className="text-xl font-black text-white">
            {formatearMoneda(respuesta.copago)}
          </span>
        </div>
      </div>
    </div>
  )
}


export default TarjetaCopago

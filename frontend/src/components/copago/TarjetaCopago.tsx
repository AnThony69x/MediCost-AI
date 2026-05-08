import { Zap } from 'lucide-react'
import type { RespuestaChat } from '../../services/servicioChat'

import { formatearMoneda } from '../../utils/formatearMoneda'

function TarjetaCopago({ respuesta }: Readonly<{ respuesta: RespuestaChat }>) {
  const cobertura = Math.round(respuesta.cobertura * 100)

  return (
    <div className="relative glass-card overflow-hidden border-white/5 bg-slate-900/40 p-4 sm:p-6 rounded-2xl sm:rounded-3xl group">
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative space-y-4 sm:space-y-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Especialidad Recomendada</p>
            <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight break-words">
              {respuesta.especialidad}
            </h4>
          </div>
          <div className="shrink-0 flex flex-col items-end bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2">
            <span className="text-base sm:text-lg font-black text-emerald-500 leading-none">
              {cobertura}%
            </span>
            <span className="text-[8px] font-bold text-emerald-500/70 uppercase tracking-tighter mt-1">
              Cobertura
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex-1 bg-primary/10 border border-primary/20 rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-inner">
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Copago Estimado</p>
              <p className="text-xl sm:text-2xl font-black text-white leading-none">
                {formatearMoneda(respuesta.copago)}
              </p>
            </div>
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Zap size={18} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default TarjetaCopago

import { Zap, Bot, User } from 'lucide-react'
import type { MensajeChat } from '../../hooks/useChat'

import TarjetaCopago from '../copago/TarjetaCopago'
import ListaHospitales from '../hospitals/ListaHospitales'

type BurbujaMensajeProps = {
  readonly mensaje: MensajeChat
}

function BurbujaMensaje({ mensaje }: BurbujaMensajeProps) {
  const esUsuario = mensaje.tipo === 'usuario'

  if (esUsuario) {
    return (
      <div className="flex justify-end items-end gap-2 sm:gap-3 group px-1 sm:px-0">
        <div className="max-w-[90%] sm:max-w-[70%] rounded-2xl rounded-br-none bg-gradient-to-br from-primary/90 to-indigo-600/90 px-4 sm:px-5 py-2.5 sm:py-3 text-[13px] sm:text-[14px] leading-relaxed text-white shadow-lg shadow-primary/10 backdrop-blur-md border border-white/10 transition-all hover:shadow-primary/20 hover:scale-[1.01]">
          <p className="font-medium font-sans">{mensaje.texto}</p>
        </div>
        <div className="avatar-user h-7 w-7 shrink-0 rounded-full flex items-center justify-center shadow-xl">
          <User size={14} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:justify-start sm:items-start sm:gap-3 group px-1 sm:px-0">
      <div className="avatar-assistant h-8 w-8 shrink-0 rounded-xl flex items-center justify-center shadow-2xl transition-transform group-hover:rotate-12">
        <Bot size={18} />
      </div>
      <div className="w-full min-w-0 sm:flex-1 sm:max-w-[95%] md:max-w-[90%] lg:max-w-[82%] xl:max-w-[78%] space-y-4 rounded-2xl sm:rounded-3xl sm:rounded-tl-none glass-card p-3 sm:p-5 border-white/5 transition-all group-hover:border-white/10 relative overflow-x-hidden overflow-y-hidden shadow-2xl">
        {/* Subtle accent indicator */}
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/30" />
        
        {mensaje.respuesta?.requiere_asesoria_medica ? (
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0 flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-display">
                  <div className="h-5 w-5 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap size={12} className="text-primary" />
                  </div>
                  <span className="truncate">Análisis Clínico IA</span>
                </div>
                <div className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-500 uppercase">
                  Precisión Alta
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-display">Evaluación de Síntomas</h3>
                <p className="break-words text-[14px] sm:text-[15px] leading-relaxed text-white font-semibold font-sans">
                  {mensaje.texto}
                </p>
              </div>
            </div>
            
            <div className="grid gap-4 sm:gap-6">
              <div className="animate-rise [animation-delay:200ms]">
                <TarjetaCopago respuesta={mensaje.respuesta} />
              </div>
              <div className="animate-rise [animation-delay:400ms]">
                <ListaHospitales hospitales={mensaje.respuesta.hospitales} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              MediCost AI
            </div>
            <p className="break-words text-[14px] leading-relaxed text-slate-300 font-medium font-sans">
              {mensaje.texto}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BurbujaMensaje


import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import CajaChat from '../components/chat/CajaChat'

const pasosGuia = [
  'Escribe tu síntoma',
  'Recibe tu especialidad',
  'Mira tu copago',
  'Compara hospitales',
]

function PaginaChat() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Set initial states
    gsap.set('.chat-header, .guide-step, .chat-window', { autoAlpha: 0, y: 20 })
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })
    
    tl.to('.chat-header', { autoAlpha: 1, y: 0 })
      .to('.guide-step', { autoAlpha: 1, y: 0, stagger: 0.1 }, '-=0.4')
      .to('.chat-window', { autoAlpha: 1, y: 0 }, '-=0.6')
  }, { scope: container })

  return (
    <div ref={container} className="relative flex h-full flex-col flex-1 min-h-0 gap-2 sm:gap-3 overflow-hidden p-1 sm:p-2 lg:p-2.5">



      {/* Dynamic Background for Chat */}
      <div className="fixed inset-0 -z-10 bg-[#020617] overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-accent/5 blur-[100px] animate-pulse [animation-delay:3s]" />
      </div>

      {/* Header Area */}
      <header className="chat-header glass-card flex shrink-0 items-center justify-between gap-3 rounded-3xl p-2.5 sm:p-3 border-white/5 shadow-xl">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <Link
            to="/"
            className="group flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-slate-400 border border-slate-800 transition-all hover:bg-primary hover:text-white hover:border-primary hover:shadow-glow-primary"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="min-w-0 space-y-0.5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h1 className="truncate text-base sm:text-xl font-bold text-white tracking-tight">
                Asistente <span className="text-primary">MediCost</span>
              </h1>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">En Línea</span>
              </div>
            </div>
            <p className="hidden sm:flex text-[11px] text-slate-500 font-medium items-center gap-2">
              <Zap size={12} className="text-accent" />
              Soporte IA en tiempo real
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Plan Activo</p>
            <p className="text-xs font-semibold text-white">Cobertura Premium</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 grid gap-2 sm:gap-3 lg:grid-cols-[240px_minmax(0,1fr)] min-h-0 overflow-hidden">

        {/* Sidebar Guide */}
        <aside className="hidden lg:flex h-full min-h-0 flex-col pr-2">
          <div className="glass-card h-full min-h-0 rounded-[2rem] p-5 lg:p-6 space-y-5 border-white/10 overflow-y-auto custom-scrollbar">
            <h2 className="text-xs lg:text-sm font-bold text-white uppercase tracking-[0.16em] border-b border-white/10 pb-3 lg:pb-4 font-display">Guía de Proceso</h2>
            <div className="space-y-5">
              {pasosGuia.map((texto, index) => (
                <div
                  key={texto}
                  className="guide-step flex items-start gap-3 lg:gap-4 group"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 transition-all group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-glow-primary">
                    {index + 1}
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[15px] leading-5 font-semibold text-white group-hover:text-primary transition-colors">{texto}</p>
                    <p className="text-[12px] leading-[1.35] text-slate-400">Paso necesario para tu estimación.</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="pt-3 border-t border-white/10 text-[12px] leading-[1.45] text-slate-400 italic">
              "La precisión de la IA aumenta cuando proporcionas detalles sobre la duración de tus síntomas."
            </p>
          </div>
          
        </aside>

        {/* Chat Window Container */}
        <div className="chat-window flex min-h-0 flex-1 flex-col relative">
          <CajaChat variant="page" />
        </div>
      </div>
    </div>


  )
}

export default PaginaChat

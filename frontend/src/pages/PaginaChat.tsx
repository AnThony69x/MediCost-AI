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
    gsap.from('.chat-header', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    
    gsap.from('.guide-step', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.3,
      ease: 'power3.out',
    })
  }, { scope: container })

  return (
    <div ref={container} className="flex min-h-0 flex-1 flex-col gap-6 pb-6">
      <header className="chat-header glass-card flex shrink-0 items-center justify-between gap-4 rounded-3xl p-6">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-slate-400 border border-slate-800 transition-all hover:bg-primary hover:text-white hover:border-primary"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">
                Asistente MediCost
              </h1>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
            <p className="text-xs text-slate-500 font-medium">
              IA Médica en tiempo real
            </p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-xs font-bold text-primary">
          <Zap size={14} />
          <span>ALTA PRECISIÓN</span>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-4">
        {pasosGuia.map((texto, index) => (
          <div
            key={texto}
            className="guide-step glass-card flex items-center gap-3 rounded-2xl p-4 transition-transform hover:scale-[1.02]"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              0{index + 1}
            </div>
            <p className="text-xs font-semibold text-slate-300">{texto}</p>
          </div>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col glass-card rounded-[2.5rem] overflow-hidden">
        <CajaChat variant="page" />
      </div>
    </div>
  )
}


export default PaginaChat


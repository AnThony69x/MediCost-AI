import { useRef } from 'react'
import { CheckCircle2, HelpCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const resuelve = [
  'Incertidumbre sobre costos finales.',
  'Confusión sobre la especialidad correcta.',
  'Dificultad para comparar opciones de red.',
]

const entrega = [
  'Especialidad médica sugerida.',
  'Porcentaje real de cobertura.',
  'Cálculo preciso de copago.',
  'Ranking de hospitales por conveniencia.',
]

function SeccionValor() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    
    gsap.from('.value-card', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      clearProps: 'all'
    })

    return () => clearTimeout(timer)
  }, { scope: container })

  return (
    <div ref={container} className="grid gap-8 py-24 md:grid-cols-2">
      <section
        id="que-resuelve"
        className="value-card glass-card p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900/80 to-slate-950/50"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
            <HelpCircle size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">¿Qué resuelve?</h2>
            <p className="text-sm text-slate-400">Eliminamos las fricciones del sistema.</p>
          </div>
        </div>
        
        <ul className="space-y-4">
          {resuelve.map((texto) => (
            <li key={texto} className="flex gap-4 items-center text-slate-400 group">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 transition-transform group-hover:scale-150" />
              <span className="text-lg">{texto}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="que-entrega"
        className="value-card glass-card p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-slate-950/50 border-primary/10"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">¿Qué entrega?</h2>
            <p className="text-sm text-slate-400">Datos accionables para tu salud.</p>
          </div>
        </div>
        
        <ul className="space-y-4">
          {entrega.map((texto) => (
            <li key={texto} className="flex gap-4 items-center text-slate-300 group">
              <CheckCircle2 size={20} className="text-accent shrink-0" />
              <span className="text-lg font-medium">{texto}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}


export default SeccionValor




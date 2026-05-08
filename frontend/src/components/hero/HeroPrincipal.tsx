import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import heroImg from '../../assets/hero.png'

gsap.registerPlugin(ScrollTrigger)

const indicadores = [
  { titulo: '95%', descripcion: 'precisión en simulaciones' },
  { titulo: '2 min', descripcion: 'respuesta orientativa' },
  { titulo: '24/7', descripcion: 'cuando lo necesites' },
]

function HeroPrincipal() {
  const container = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    ScrollTrigger.refresh()
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } })

    tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8 })
      .from('.hero-title', { y: 40, opacity: 0, stagger: 0.1 }, '-=0.4')
      .from('.hero-desc', { y: 20, opacity: 0 }, '-=0.6')
      .from('.hero-btns', { y: 20, opacity: 0 }, '-=0.6')
      .from('.hero-stats', { y: 20, opacity: 0, stagger: 0.2 }, '-=0.4')
      .from(imageRef.current, { scale: 0.9, opacity: 0, duration: 1.2 }, '-=1')

    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, { scope: container })

  return (
    <section
      id="inicio"
      ref={container}
      className="grid items-center gap-16 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-24"
    >
      <div className="space-y-8">
        <div className="hero-badge inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-sm font-semibold text-accent">
          <Sparkles size={14} />
          <span>Inteligencia Artificial Médica</span>
        </div>
        
        <h1 className="hero-title text-balance text-5xl font-bold leading-[1.1] text-ink sm:text-6xl lg:text-7xl">
          Calcula tu{' '}
          <span className="text-accent italic">copago</span>{' '}
          antes de ir al hospital
        </h1>
        
        <p className="hero-desc max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          Describe tus síntomas y obtén una estimación precisa de costos, especialidad sugerida y comparación de hospitales en tiempo real.
        </p>
        
        <div className="hero-btns flex flex-wrap gap-4">
          <Link to="/chat" className="btn-primary flex items-center gap-2">
            Comenzar simulación
            <ArrowRight size={18} />
          </Link>
          <a href="#como-funciona" className="btn-secondary">
            Ver cómo funciona
          </a>
        </div>
        
        <div className="hero-stats grid gap-6 pt-4 sm:grid-cols-3">
          {indicadores.map((item) => (
            <div
              key={item.titulo}
              className="group border-l-2 border-accent/20 pl-4 transition-colors hover:border-accent"
            >
              <p className="text-2xl font-bold text-ink">{item.titulo}</p>
              <p className="text-sm text-muted">{item.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={imageRef} className="relative hidden lg:block">
        <div className="absolute inset-0 bg-accent/10 blur-[100px] rounded-full" />
        
        {/* Image Container */}
        <div className="relative z-10 glass-card rounded-[2.5rem] p-4">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-white/20">
            <img
              src={heroImg}
              alt="MediCost-AI Interface"
              className="w-full transition-transform duration-500 hover:scale-[1.05]"
            />
          </div>
          
          {/* Floating UI Element - Now outside the overflow-hidden container but inside the relative container */}
          <div className="absolute -bottom-6 -right-10 z-20 glass-card p-6 rounded-2xl shadow-strong min-w-[260px] animate-bounce-subtle">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Resumen Inmediato</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted">Copago Estimado</span>
                <span className="text-lg font-bold text-ink">$18.40</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-muted uppercase">
                  <span>Cobertura</span>
                  <span>82%</span>
                </div>
                <div className="w-full h-2 bg-accent/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[82%] rounded-full shadow-glow" />
                </div>
              </div>
              <p className="text-[10px] text-muted italic">Basado en tu red hospitalaria actual</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default HeroPrincipal



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
    
    // Set initial states via GSAP
    gsap.set('.hero-badge, .hero-desc, .hero-btns, .hero-stats', { y: 20, autoAlpha: 0 })
    gsap.set('.hero-title', { y: 40, autoAlpha: 0 })
    gsap.set(imageRef.current, { scale: 0.9, autoAlpha: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } })

    tl.to('.hero-badge', { y: 0, autoAlpha: 1, duration: 0.8 })
      .to('.hero-title', { y: 0, autoAlpha: 1, stagger: 0.1 }, '-=0.4')
      .to('.hero-desc', { y: 0, autoAlpha: 1 }, '-=0.6')
      .to('.hero-btns', { y: 0, autoAlpha: 1, clearProps: 'all' }, '-=0.6')

      .to('.hero-stats', { y: 0, autoAlpha: 1, stagger: 0.2 }, '-=0.4')
      .to(imageRef.current, { scale: 1, autoAlpha: 1, duration: 1.2, clearProps: 'all' }, '-=1')


    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, { scope: container })

  return (

    <section id="inicio" ref={container} className="py-12 lg:py-24">
      <div className="relative glass-card rounded-[3rem] p-8 lg:p-16 overflow-hidden border-white/10 shadow-glow-primary">
        {/* Interior background light */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
              <Sparkles size={14} />
              <span>Inteligencia Artificial Médica</span>
            </div>
            
            <h1 className="hero-title text-balance text-5xl font-bold leading-[1.1] text-white sm:text-6xl">
              Calcula tu{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">copago</span>{' '}
              antes de ir al hospital
            </h1>
            
            <p className="hero-desc max-w-xl text-lg leading-relaxed text-slate-400">
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
            
            <div className="hero-stats grid gap-6 pt-4 grid-cols-2 sm:grid-cols-3">
              {indicadores.map((item) => (
                <div key={item.titulo} className="group border-l-2 border-slate-800 pl-4 transition-colors hover:border-primary">
                  <p className="text-2xl font-bold text-white">{item.titulo}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">{item.descripcion}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative group">
            {/* Main Image without container background */}
            <img
              src={heroImg}
              alt="MediCost-AI Interface"
              className="relative z-10 w-full drop-shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-transform duration-700 group-hover:scale-[1.02]"
            />
            
            {/* Floating UI Element - Optimized for performance */}
            <div className="absolute -bottom-6 -right-4 lg:-right-10 z-20 p-6 rounded-2xl shadow-strong min-w-[240px] animate-bounce-subtle border border-white/10 bg-slate-900/80 backdrop-blur-xl will-change-transform">
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3">Resumen Inmediato</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Copago Estimado</span>
                  <span className="text-lg font-bold text-white">$18.40</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                    <span>Cobertura</span>
                    <span>82%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[82%] rounded-full shadow-glow-accent" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 italic text-center">Basado en tu red hospitalaria</p>
              </div>
            </div>
            
            {/* Background Glow behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full bg-primary/20 blur-[120px]" />
          </div>

        </div>
      </div>
    </section>


  )
}


export default HeroPrincipal





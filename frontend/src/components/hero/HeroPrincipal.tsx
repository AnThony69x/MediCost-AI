import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import heroImg from '../../assets/hero.png'
import { scrollToSectionId } from '../../utils/scrollSection'

const indicadores = [
  { titulo: '95%', descripcion: 'precisión en simulaciones' },
  { titulo: '2 min', descripcion: 'respuesta orientativa' },
  { titulo: '24/7', descripcion: 'cuando lo necesites' },
]

function HeroPrincipal() {
  return (
    <section
      id="inicio"
      className="grid items-center gap-12 py-10 sm:py-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14"
    >
      <div className="space-y-6">
        <p className="section-kicker">Asistente de costos y red</p>
        <h1 className="text-balance font-display text-4xl font-semibold leading-[1.12] text-ink sm:text-5xl lg:text-[2.65rem] lg:leading-[1.1]">
          Calcula tu{' '}
          <span className="relative whitespace-nowrap text-accent">
            copago
            <span
              className="absolute -bottom-1 left-0 right-0 h-2 rounded-full bg-accentGlow/50"
              aria-hidden
            />
          </span>{' '}
          antes de ir al hospital
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Describe tus síntomas en lenguaje natural y obtén especialidad
          orientativa, cobertura estimada y comparación de hospitales en tu red.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/chat"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-medium transition hover:-translate-y-0.5 hover:bg-accentHover hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <Sparkles size={17} aria-hidden className="opacity-90" />
            Probar ahora
          </Link>
          <a
            href="#como-funciona"
            className="inline-flex items-center justify-center rounded-full border border-strokeStrong bg-white/90 px-5 py-3 text-sm font-semibold text-ink shadow-soft backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-accent/25 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
            onClick={(e) => {
              e.preventDefault()
              scrollToSectionId('como-funciona')
            }}
          >
            Ver pasos
          </a>
        </div>
        <div className="grid gap-3 pt-1 sm:grid-cols-3">
          {indicadores.map((item) => (
            <div
              key={item.titulo}
              className="surface-card border-white/60 px-4 py-3.5 transition hover:border-accent/15 hover:shadow-medium"
            >
              <p className="font-display text-xl font-semibold text-ink">
                {item.titulo}
              </p>
              <p className="mt-1 text-sm leading-snug text-muted">
                {item.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto grid w-full max-w-[440px] place-items-center pb-10 pt-4 sm:pb-12 lg:mx-0 lg:max-w-none lg:pb-14">
        <div className="absolute aspect-square w-[min(100%,380px)] rounded-full bg-[radial-gradient(circle,_rgba(184,228,220,0.55)_0%,_transparent_68%)] md:w-[420px]" />
        <img
          src={heroImg}
          alt="Vista del asistente MediCost-AI"
          className="relative z-10 w-full max-w-[400px] rounded-[28px] shadow-strong ring-1 ring-stroke lg:max-w-[430px]"
        />
        <div className="absolute bottom-2 right-0 z-20 w-[min(100%,288px)] rounded-2xl border border-strokeStrong bg-white/95 p-4 text-sm shadow-medium backdrop-blur-sm sm:right-[-8px] sm:min-w-[248px] lg:bottom-0 lg:right-[-12px]">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Vista previa
          </p>
          <p className="mt-2 font-semibold text-ink">Resumen inmediato</p>
          <p className="mt-2 text-muted">Copago estimado: $18.40</p>
          <p className="text-muted">Especialidad sugerida: Cardiología</p>
          <span className="mt-3 inline-block w-fit rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-accent">
            Cobertura 82%
          </span>
        </div>
      </div>
    </section>
  )
}

export default HeroPrincipal

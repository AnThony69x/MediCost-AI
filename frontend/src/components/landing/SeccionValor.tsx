import { CheckCircle2, HelpCircle } from 'lucide-react'

const resuelve = [
  'No sabes cuánto pagarás por la consulta o el servicio.',
  'No sabes a qué especialista acudir según tus síntomas.',
  'No sabes qué hospital conviene más dentro de tu red.',
]

const entrega = [
  'Especialidad médica orientativa.',
  'Cobertura de tu seguro (porcentaje).',
  'Copago estimado.',
  'Comparación de hospitales y la opción más conveniente.',
]

function SeccionValor() {
  return (
    <div className="grid gap-6 border-t border-strokeStrong py-16 md:grid-cols-2 md:gap-8">
      <section
        id="que-resuelve"
        aria-labelledby="titulo-que-resuelve"
        className="scroll-mt-28 surface-card border-warm/25 bg-warmSoft/50 p-6 sm:p-7"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/80 text-accent shadow-soft ring-1 ring-stroke">
            <HelpCircle size={22} aria-hidden />
          </span>
          <div>
            <h2
              id="titulo-que-resuelve"
              className="font-display text-2xl font-semibold tracking-tight text-ink"
            >
              ¿Qué resuelve?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Dudas habituales antes de acudir a urgencias o agendar cita.
            </p>
          </div>
        </div>
        <ul className="mt-6 space-y-3">
          {resuelve.map((texto) => (
            <li key={texto} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warm"
                aria-hidden
              />
              <span>{texto}</span>
            </li>
          ))}
        </ul>
      </section>
      <section
        id="que-entrega"
        aria-labelledby="titulo-que-entrega"
        className="scroll-mt-28 surface-card border-accent/15 bg-accentSoft/35 p-6 sm:p-7"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/90 text-accent shadow-soft ring-1 ring-accent/15">
            <CheckCircle2 size={22} aria-hidden />
          </span>
          <div>
            <h2
              id="titulo-que-entrega"
              className="font-display text-2xl font-semibold tracking-tight text-ink"
            >
              ¿Qué entrega?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Resultados concretos para comparar y decidir con más claridad.
            </p>
          </div>
        </div>
        <ul className="mt-6 space-y-3">
          {entrega.map((texto) => (
            <li key={texto} className="flex gap-3 text-sm leading-relaxed text-muted">
              <CheckCircle2
                className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent"
                aria-hidden
              />
              <span className="text-ink/90">{texto}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default SeccionValor

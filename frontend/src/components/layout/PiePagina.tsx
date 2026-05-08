import { Link } from 'react-router-dom'
import { LANDING_SECTIONS } from '../../constants/landingSections'
import { useLandingSectionNav } from '../../hooks/useLandingSectionNav'

function PiePagina() {
  const irASeccion = useLandingSectionNav()

  return (
    <footer className="relative mt-16 shrink-0 border-t border-strokeStrong bg-white/75 py-10 backdrop-blur-md supports-[backdrop-filter]:bg-white/55">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-xl font-semibold text-ink">
            MediCost-AI
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Orientación sobre copagos, cobertura y hospitales en red, con
            lenguaje claro y resultados que puedes contrastar.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <nav
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted"
            aria-label="Enlaces del pie"
          >
            {LANDING_SECTIONS.map(({ id, etiqueta }) => (
              <a
                key={id}
                href={`/#${id}`}
                className="rounded-md transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
                onClick={(e) => {
                  e.preventDefault()
                  irASeccion(id)
                }}
              >
                {etiqueta}
              </a>
            ))}
          </nav>
          <Link
            to="/chat"
            className="inline-flex w-fit items-center justify-center rounded-full border border-accent/25 bg-accentSoft px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
          >
            Ir al chat
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-6 text-center text-xs text-muted/90 md:text-left">
        La información es orientativa y no sustituye la consulta médica ni el
        criterio de tu aseguradora.
      </p>
    </footer>
  )
}

export default PiePagina

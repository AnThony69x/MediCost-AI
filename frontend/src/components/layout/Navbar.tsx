import { Link } from 'react-router-dom'
import { HeartPulse } from 'lucide-react'
import { LANDING_SECTIONS } from '../../constants/landingSections'
import { useLandingSectionNav } from '../../hooks/useLandingSectionNav'

function Navbar() {
  const irASeccion = useLandingSectionNav()

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-stroke bg-canvas/80 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/65">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-3.5 sm:py-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl outline-none ring-accent/30 transition hover:opacity-90 focus-visible:ring-2"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-accent text-white shadow-glow ring-1 ring-white/20">
            <HeartPulse size={20} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold leading-tight text-ink">
              MediCost-AI
            </p>
            <p className="text-xs leading-snug text-muted">
              Copagos claros antes de ir al hospital
            </p>
          </div>
        </Link>
        <nav
          className="hidden items-center gap-0.5 text-sm font-medium md:flex"
          aria-label="Secciones de la página"
        >
          {LANDING_SECTIONS.map(({ id, etiqueta }) => (
            <a
              key={id}
              href={`/#${id}`}
              className="rounded-lg px-3 py-2 text-muted transition-colors hover:bg-white/70 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
              onClick={(e) => {
                e.preventDefault()
                irASeccion(id)
              }}
            >
              {etiqueta}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/chat"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-medium transition hover:bg-accentHover hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            Ir al chat
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar

import { HeartPulse } from 'lucide-react'

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-stroke bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-white shadow-medium">
            <HeartPulse size={20} />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              MediCost AI
            </p>
            <p className="text-xs text-muted">
              Calcula tu copago antes de ir al hospital
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          <a href="#beneficios">Beneficios</a>
          <a href="#flujo">Flujo</a>
          <a href="#confianza">Confianza</a>
          <a href="#cta">Demo</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full border border-stroke bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft transition hover:-translate-y-0.5"
          >
            Ver demo
          </button>
          <button
            type="button"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-medium transition hover:-translate-y-0.5"
          >
            Iniciar chat
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

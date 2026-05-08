import { Link } from 'react-router-dom'

function PiePagina() {
  return (
    <footer className="mt-auto shrink-0 border-t border-stroke bg-white/70 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            MediCost-AI
          </p>
          <p className="mt-1 text-sm text-muted">
            Orientación sobre copagos y red hospitalaria con lenguaje claro.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#que-resuelve">Qué resuelve</a>
          <Link to="/chat" className="font-semibold text-accent">
            Ir al chat
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default PiePagina

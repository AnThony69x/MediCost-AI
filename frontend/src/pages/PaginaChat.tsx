import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import CajaChat from '../components/chat/CajaChat'

const pasosGuia = [
  'Escribe tu síntoma',
  'Recibe tu especialidad',
  'Mira tu copago',
  'Compara hospitales',
]

function PaginaChat() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <header className="flex shrink-0 flex-wrap items-center gap-4 border-b border-stroke pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-stroke bg-white px-3 py-2 text-sm font-semibold text-ink shadow-soft transition hover:-translate-y-0.5"
        >
          <ArrowLeft size={18} aria-hidden />
          Volver
        </Link>
        <h1 className="font-display text-lg font-semibold text-ink md:text-xl">
          Asistente MediCost-AI
        </h1>
      </header>

      <section
        className="shrink-0 rounded-2xl border border-stroke bg-white/90 p-4 shadow-soft"
        aria-labelledby="guia-titulo"
      >
        <h2 id="guia-titulo" className="text-sm font-semibold text-ink">
          ¿Cómo usar?
        </h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
          {pasosGuia.map((texto) => (
            <li key={texto}>{texto}</li>
          ))}
        </ol>
      </section>

      <div className="flex min-h-0 flex-1 flex-col">
        <CajaChat variant="page" />
      </div>
    </div>
  )
}

export default PaginaChat

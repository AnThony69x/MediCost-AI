import { Link } from 'react-router-dom'
import { HeartPulse } from 'lucide-react'
import { LANDING_SECTIONS } from '../../constants/landingSections'
import { useLandingSectionNav } from '../../hooks/useLandingSectionNav'

function PiePagina() {
  const irASeccion = useLandingSectionNav()

  return (
    <footer className="relative mt-24 border-t border-border bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-glow">
                <HeartPulse size={20} />
              </div>
              <p className="text-xl font-bold tracking-tight text-ink">
                MediCost<span className="text-accent">AI</span>
              </p>
            </div>
            <p className="text-muted leading-relaxed">
              Democratizando el acceso a la información de salud. Calculamos tus costos médicos para que tomes decisiones informadas y ahorres en cada consulta.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-ink mb-6">Plataforma</p>
              <nav className="flex flex-col gap-4">
                {LANDING_SECTIONS.map(({ id, etiqueta }) => (
                  <a
                    key={id}
                    href={`/#${id}`}
                    className="text-sm text-muted transition-colors hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault()
                      irASeccion(id)
                    }}
                  >
                    {etiqueta}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-ink mb-6">Acciones</p>
              <div className="flex flex-col gap-4">
                <Link to="/chat" className="text-sm text-muted transition-colors hover:text-accent">
                  Simulador de Copago
                </Link>
                <Link to="/" className="text-sm text-muted transition-colors hover:text-accent">
                  Centro de Ayuda
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted/80 max-w-2xl italic">
            * MediCost-AI proporciona estimaciones basadas en algoritmos de IA. La información es orientativa y no sustituye la asesoría profesional de tu aseguradora ni el criterio médico.
          </p>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} MediCost-AI. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default PiePagina


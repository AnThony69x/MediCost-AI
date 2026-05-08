import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'
import { LANDING_SECTIONS } from '../../constants/landingSections'
import { useLandingSectionNav } from '../../hooks/useLandingSectionNav'

function PiePagina() {
  const irASeccion = useLandingSectionNav()

  return (
    <footer className="relative mt-24 border-t border-slate-900 bg-[#020617] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-glow-primary">
                <Activity size={20} />
              </div>
              <p className="text-xl font-bold tracking-tight text-white">
                MediCost<span className="text-primary">AI</span>
              </p>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Democratizando el acceso a la información de salud. Calculamos tus costos médicos para que tomes decisiones informadas y ahorres en cada consulta.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white mb-6">Plataforma</p>
              <nav className="flex flex-col gap-4">
                {LANDING_SECTIONS.map(({ id, etiqueta }) => (
                  <a
                    key={id}
                    href={`/#${id}`}
                    className="text-sm text-slate-400 transition-colors hover:text-primary"
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
              <p className="text-sm font-bold uppercase tracking-widest text-white mb-6">Acciones</p>
              <div className="flex flex-col gap-4">
                <Link to="/chat" className="text-sm text-slate-400 transition-colors hover:text-primary">
                  Simulador de Copago
                </Link>
                <Link to="/" className="text-sm text-slate-400 transition-colors hover:text-primary">
                  Centro de Ayuda
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-900 pt-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed italic">
            * MediCost-AI proporciona estimaciones basadas en algoritmos de IA. La información es orientativa y no sustituye la asesoría profesional de tu aseguradora ni el criterio médico.
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} MediCost-AI.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default PiePagina



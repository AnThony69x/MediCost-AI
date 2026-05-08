import { ClipboardList, Hospital, Stethoscope, Wallet } from 'lucide-react'

const pasos = [
  {
    titulo: 'Describe tu síntoma',
    descripcion: 'Escribe lo que sientes en lenguaje natural.',
    Icon: Stethoscope,
  },
  {
    titulo: 'Analizamos tu caso',
    descripcion: 'Relacionamos el caso con la especialidad adecuada.',
    Icon: ClipboardList,
  },
  {
    titulo: 'Calculamos tu copago',
    descripcion: 'Aplicamos cobertura y costo del servicio.',
    Icon: Wallet,
  },
  {
    titulo: 'Te recomendamos el mejor hospital',
    descripcion: 'Comparamos copagos dentro de la red.',
    Icon: Hospital,
  },
]

function SeccionComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-28 py-16">
      <p className="section-kicker">De síntoma a números</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2rem]">
        ¿Cómo funciona?
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Cuatro pasos claros para pasar de lo que sientes a un copago estimado y
        una recomendación dentro de tu red.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {pasos.map(({ titulo, descripcion, Icon }, i) => (
          <div
            key={titulo}
            className="group surface-card flex gap-4 p-5 transition hover:-translate-y-0.5 hover:border-accent/18 hover:shadow-medium"
          >
            <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accentSoft text-accent ring-1 ring-accent/10 transition group-hover:bg-white group-hover:shadow-soft">
              <span
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow-glow"
                aria-hidden
              >
                {i + 1}
              </span>
              <Icon size={22} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Paso {i + 1}
              </p>
              <h3 className="mt-1 text-base font-semibold text-ink">{titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SeccionComoFunciona

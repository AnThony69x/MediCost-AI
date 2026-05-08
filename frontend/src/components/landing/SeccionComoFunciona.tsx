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
    <section id="como-funciona" className="scroll-mt-28 py-14">
      <h2 className="font-display text-3xl font-semibold text-ink">
        ¿Cómo funciona?
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Cuatro pasos para pasar de síntoma a números claros.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {pasos.map(({ titulo, descripcion, Icon }, i) => (
          <div
            key={titulo}
            className="flex gap-4 rounded-2xl border border-stroke bg-white p-5 shadow-soft"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accentSoft text-accent">
              <Icon size={22} aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Paso {i + 1}
              </p>
              <h3 className="mt-1 text-base font-semibold text-ink">{titulo}</h3>
              <p className="mt-1 text-sm text-muted">{descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SeccionComoFunciona

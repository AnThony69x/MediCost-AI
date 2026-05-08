type PasoFlujoProps = {
  indice: string
  titulo: string
  descripcion: string
}

function PasoFlujo({ indice, titulo, descripcion }: PasoFlujoProps) {
  return (
    <div className="flex gap-4 rounded-2xl border border-stroke bg-white p-5 shadow-soft">
      <span className="h-fit rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
        {indice}
      </span>
      <div>
        <h3 className="text-base font-semibold text-ink">{titulo}</h3>
        <p className="text-sm text-muted">{descripcion}</p>
      </div>
    </div>
  )
}

export default PasoFlujo

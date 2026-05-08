type TarjetaBeneficioProps = {
  icono: string
  titulo: string
  descripcion: string
  detalle: string
}

function TarjetaBeneficio({
  icono,
  titulo,
  descripcion,
  detalle,
}: TarjetaBeneficioProps) {
  return (
    <article className="rounded-2xl border border-stroke bg-white p-6 shadow-soft">
      <span
        className="grid h-11 w-11 place-items-center rounded-xl bg-orange-100 text-sm font-semibold text-orange-700"
        aria-hidden="true"
      >
        {icono}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-ink">{titulo}</h3>
      <p className="text-sm text-muted">{descripcion}</p>
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">
        {detalle}
      </span>
    </article>
  )
}

export default TarjetaBeneficio

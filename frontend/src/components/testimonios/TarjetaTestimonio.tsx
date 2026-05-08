type TarjetaTestimonioProps = {
  cita: string
  nombre: string
  rol: string
}

function TarjetaTestimonio({ cita, nombre, rol }: TarjetaTestimonioProps) {
  return (
    <article className="grid gap-3 rounded-2xl border border-stroke bg-white p-6 shadow-soft">
      <p className="text-sm font-medium text-ink">"{cita}"</p>
      <div>
        <p className="text-sm font-semibold text-ink">{nombre}</p>
        <p className="text-xs text-muted">{rol}</p>
      </div>
    </article>
  )
}

export default TarjetaTestimonio

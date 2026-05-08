type EncabezadoSeccionProps = {
  titulo: string
  descripcion: string
  centrado?: boolean
}

function EncabezadoSeccion({
  titulo,
  descripcion,
  centrado = false,
}: EncabezadoSeccionProps) {
  const clase = centrado
    ? 'mx-auto max-w-xl text-center'
    : 'max-w-xl'

  return (
    <div className={`${clase} space-y-2`}>
      <h2 className="font-display text-3xl font-semibold text-ink">
        {titulo}
      </h2>
      <p className="text-muted">{descripcion}</p>
    </div>
  )
}

export default EncabezadoSeccion

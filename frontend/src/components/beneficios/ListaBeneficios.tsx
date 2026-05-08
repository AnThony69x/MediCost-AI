import EncabezadoSeccion from '../section/EncabezadoSeccion'
import TarjetaBeneficio from './TarjetaBeneficio'

const beneficios = [
  {
    icono: '01',
    titulo: 'Copago claro desde el inicio',
    descripcion: 'Calcula rangos por plan y servicio con datos actualizados.',
    detalle: 'Exactitud mensual',
  },
  {
    icono: '02',
    titulo: 'Especialidad sugerida en segundos',
    descripcion: 'Triamos sintomas y dirigimos al equipo adecuado.',
    detalle: 'Flujo sin friccion',
  },
  {
    icono: '03',
    titulo: 'Red hospitalaria priorizada',
    descripcion: 'Ordenamos centros por costo, cobertura y ubicacion.',
    detalle: 'Comparativa directa',
  },
]

function ListaBeneficios() {
  return (
    <section id="beneficios" className="space-y-8 py-16">
      <EncabezadoSeccion
        titulo="Decisiones medicas con datos visibles"
        descripcion="Concentramos cobertura, costos y red hospitalaria en una sola vista para acelerar decisiones clinicas."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {beneficios.map((beneficio) => (
          <TarjetaBeneficio key={beneficio.icono} {...beneficio} />
        ))}
      </div>
    </section>
  )
}

export default ListaBeneficios

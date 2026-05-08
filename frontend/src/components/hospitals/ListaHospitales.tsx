import RecommendationBanner from '../ui/RecommendationBanner'
import TarjetaHospital from './TarjetaHospital'
import type { Hospital } from '../../services/servicioChat'

type ListaHospitalesProps = {
  hospitales: Hospital[]
}

function ListaHospitales({ hospitales }: ListaHospitalesProps) {
  if (!hospitales || hospitales.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stroke bg-white p-4 text-sm text-muted">
        No hay hospitales disponibles para esta consulta.
      </div>
    )
  }

  const ordenados = [...hospitales].sort((a, b) => a.copago - b.copago)
  const mejor = ordenados[0]

  return (
    <div className="grid gap-3">
      <RecommendationBanner
        titulo="Mejor opcion"
        descripcion={`${mejor.nombre} tiene el copago mas bajo.`}
      />
      <div className="grid gap-3">
        {ordenados.map((hospital) => (
          <TarjetaHospital
            key={hospital.nombre}
            nombre={hospital.nombre}
            copago={hospital.copago}
            costo={hospital.costo}
            destacado={hospital.nombre === mejor.nombre}
          />
        ))}
      </div>
    </div>
  )
}

export default ListaHospitales

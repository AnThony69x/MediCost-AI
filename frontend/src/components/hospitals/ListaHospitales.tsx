import TarjetaHospital from './TarjetaHospital'

import type { Hospital } from '../../services/servicioChat'

type ListaHospitalesProps = {
  hospitales: Hospital[]
}

function ListaHospitales({ hospitales }: ListaHospitalesProps) {
  if (!hospitales || hospitales.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-500">
        No hay hospitales disponibles.
      </div>
    )
  }

  const ordenados = [...hospitales].sort((a, b) => a.copago - b.copago)
  const mejor = ordenados[0]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Opciones de Red</p>
        <div className="flex gap-1">
          <div className="h-1 w-4 rounded-full bg-primary" />
          <div className="h-1 w-1 rounded-full bg-slate-800" />
          <div className="h-1 w-1 rounded-full bg-slate-800" />
        </div>
      </div>
      
      <div className="rounded-2xl border border-white/5 bg-slate-950/30 p-2 sm:p-3">
      {/* Mobile/Tablet: Horizontal carousel | Desktop: 2-column grid */}
      <div className="flex gap-3 overflow-x-auto pb-2 pt-1 pr-1 snap-x snap-mandatory scroll-smooth custom-scrollbar lg:grid lg:grid-cols-2 lg:overflow-visible lg:snap-none lg:pb-0 lg:pt-0 lg:pr-0">
        {ordenados.map((hospital) => (
          <div 
            key={hospital.nombre} 
            className="shrink-0 snap-start w-[88%] min-w-[240px] sm:w-[72%] sm:min-w-[300px] lg:w-auto lg:min-w-0 lg:shrink"
          >
            <TarjetaHospital
              nombre={hospital.nombre}
              copago={hospital.copago}
              costo={hospital.costo}
              destacado={hospital.nombre === mejor.nombre}
            />
          </div>
        ))}
      </div>
      </div>
      
      <p className="text-[10px] text-slate-500 italic px-1">
        * Desliza para comparar otros centros médicos
      </p>
    </div>
  )
}


export default ListaHospitales

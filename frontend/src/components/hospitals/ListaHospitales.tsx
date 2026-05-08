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
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Opciones de Red</p>
        <div className="flex gap-1">
          <div className="h-1 w-4 rounded-full bg-primary" />
          <div className="h-1 w-1 rounded-full bg-slate-800" />
          <div className="h-1 w-1 rounded-full bg-slate-800" />
        </div>
      </div>
      
      {/* Horizontal Carousel */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scroll-smooth custom-scrollbar-hide">
        {ordenados.map((hospital) => (
          <div 
            key={hospital.nombre} 
            className="min-w-[280px] sm:min-w-[320px] snap-center"
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
      
      <p className="text-[10px] text-slate-500 italic px-1">
        * Desliza para comparar otros centros médicos
      </p>
    </div>
  )
}


export default ListaHospitales

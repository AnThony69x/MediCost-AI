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
        <p className="hospitales-heading text-[10px] font-bold uppercase tracking-widest">Opciones de Red</p>
        <div className="flex gap-1">
          <div className="h-1 w-4 rounded-full bg-primary" />
          <div className="hospitales-dot h-1 w-1 rounded-full" />
          <div className="hospitales-dot h-1 w-1 rounded-full" />
        </div>
      </div>
      
      <div className="hospitales-shell rounded-2xl border p-2 sm:p-3 overflow-x-hidden">
      {/* Mobile: single column to prevent overflow | Desktop: 2-column grid */}
      <div className="grid grid-cols-1 gap-3 pb-1 pt-1 min-w-0 lg:grid-cols-2 lg:pb-0 lg:pt-0">
        {ordenados.map((hospital) => (
          <div 
            key={hospital.nombre} 
            className="w-full min-w-0"
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
      
      <p className="hospitales-footnote text-[10px] italic px-1">
        * Compara centros médicos y elige el menor copago
      </p>
    </div>
  )
}


export default ListaHospitales

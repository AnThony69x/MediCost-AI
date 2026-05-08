import EncabezadoSeccion from '../section/EncabezadoSeccion'
import PasoFlujo from './PasoFlujo'

const pasos = [
  {
    indice: 'Paso 1',
    titulo: 'Escucha inteligente',
    descripcion: 'Recibimos sintomas y perfil del paciente con contexto clinico.',
  },
  {
    indice: 'Paso 2',
    titulo: 'Calculo de copago',
    descripcion: 'Consultamos reglas de cobertura y costos hospitalarios.',
  },
  {
    indice: 'Paso 3',
    titulo: 'Recomendacion priorizada',
    descripcion: 'Ordenamos hospitales y sugerimos especialidad adecuada.',
  },
]

function SeccionFlujo() {
  return (
    <section
      id="flujo"
      className="rounded-[28px] border border-stroke bg-white/60 px-6 py-14 shadow-soft"
    >
      <EncabezadoSeccion
        titulo="Un flujo simple, trazable y seguro"
        descripcion="Estandarizamos la conversacion medica y reducimos tiempos de respuesta sin perder contexto."
      />
      <div className="grid gap-4">
        {pasos.map((paso) => (
          <PasoFlujo key={paso.indice} {...paso} />
        ))}
      </div>
    </section>
  )
}

export default SeccionFlujo

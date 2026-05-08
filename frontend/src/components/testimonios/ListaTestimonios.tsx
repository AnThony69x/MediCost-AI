import EncabezadoSeccion from '../section/EncabezadoSeccion'
import TarjetaTestimonio from './TarjetaTestimonio'

const testimonios = [
  {
    cita: 'Reducimos en 40% el tiempo de respuesta al paciente.',
    nombre: 'Dra. Valeria Soto',
    rol: 'Directora Medica',
  },
  {
    cita: 'Ahora el copago se explica en segundos, sin llamadas extras.',
    nombre: 'Luis Mendoza',
    rol: 'Operaciones Clinicas',
  },
  {
    cita: 'La red hospitalaria aparece ordenada y con costos claros.',
    nombre: 'Carla Rivera',
    rol: 'Coordinacion de Red',
  },
]

function ListaTestimonios() {
  return (
    <section id="confianza" className="space-y-8 py-16">
      <EncabezadoSeccion
        titulo="Equipos clinicos que confian en MediCost"
        descripcion="Centralizamos datos para mejorar la experiencia del paciente y del personal medico."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonios.map((testimonio) => (
          <TarjetaTestimonio key={testimonio.nombre} {...testimonio} />
        ))}
      </div>
    </section>
  )
}

export default ListaTestimonios

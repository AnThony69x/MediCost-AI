import { Link } from 'react-router-dom'
import heroImg from '../../assets/hero.png'

const indicadores = [
  { titulo: '95%', descripcion: 'precisiones en simulaciones' },
  { titulo: '2 min', descripcion: 'tiempo promedio de respuesta' },
  { titulo: '24/7', descripcion: 'disponibilidad operativa' },
]

function HeroPrincipal() {
  return (
    <section
      id="inicio"
      className="grid items-center gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12"
    >
      <div className="space-y-5">
        <h1 className="text-balance font-display text-4xl font-semibold text-ink sm:text-5xl lg:text-5xl">
          Calcula tu copago antes de ir al hospital
        </h1>
        <p className="max-w-xl text-base text-muted sm:text-lg">
          Ingresa tus síntomas y obtén especialidad, cobertura y costos en
          segundos.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/chat"
            className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-medium transition hover:-translate-y-0.5"
          >
            Probar ahora
          </Link>
          <a
            href="#como-funciona"
            className="rounded-full border border-stroke bg-white px-5 py-3 text-sm font-semibold text-ink shadow-soft transition hover:-translate-y-0.5"
          >
            Ver pasos
          </a>
        </div>
        <div className="grid gap-4 pt-2 sm:grid-cols-3">
          {indicadores.map((item) => (
            <div
              key={item.titulo}
              className="rounded-xl border border-stroke bg-white px-4 py-3 text-sm shadow-soft"
            >
              <p className="text-lg font-semibold text-ink">{item.titulo}</p>
              <p className="mt-1 text-muted">{item.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative grid place-items-center pb-8 pt-2 sm:pb-10 lg:pb-12">
        <div className="absolute h-80 w-80 rounded-full bg-[radial-gradient(circle,_#bceadf_0%,_transparent_70%)] md:h-96 md:w-96" />
        <img
          src={heroImg}
          alt="Vista del asistente MediCost-AI"
          className="relative z-10 w-full max-w-[400px] rounded-[28px] shadow-strong lg:max-w-[440px]"
        />
        <div className="absolute bottom-0 right-0 z-20 w-[min(100%,280px)] rounded-2xl border border-stroke bg-white p-4 text-sm shadow-medium sm:right-[-12px] sm:w-auto sm:min-w-[240px] lg:bottom-[-8px] lg:right-[-20px]">
          <p className="font-semibold text-ink">Resumen inmediato</p>
          <p className="mt-2 text-muted">Copago estimado: $18.40</p>
          <p className="text-muted">Especialidad sugerida: Cardiología</p>
          <span className="mt-3 inline-block w-fit rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-accent">
            Cobertura 82%
          </span>
        </div>
      </div>
    </section>
  )
}

export default HeroPrincipal

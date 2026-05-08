import { Link } from 'react-router-dom'
import heroImg from '../../assets/hero.png'

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
      </div>
      <div className="relative grid place-items-center">
        <div className="absolute h-80 w-80 rounded-full bg-[radial-gradient(circle,_#bceadf_0%,_transparent_70%)] md:h-96 md:w-96" />
        <img
          src={heroImg}
          alt="Vista del asistente MediCost-AI"
          className="relative z-10 w-full max-w-[400px] rounded-[28px] shadow-strong lg:max-w-[440px]"
        />
      </div>
    </section>
  )
}

export default HeroPrincipal

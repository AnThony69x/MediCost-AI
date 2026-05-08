import heroImg from '../../assets/hero.png'

const indicadores = [
  { titulo: '95%', descripcion: 'precisiones en simulaciones' },
  { titulo: '2 min', descripcion: 'tiempo promedio de respuesta' },
  { titulo: '24/7', descripcion: 'disponibilidad operativa' },
]

function HeroPrincipal() {
  return (
    <section id="inicio" className="grid items-center gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          Plataforma clinica para copagos
        </span>
        <h1 className="text-balance font-display text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
          Decide con claridad, estima copagos y deriva al especialista ideal
        </h1>
        <p className="text-base text-muted sm:text-lg">
          MediCost AI traduce sintomas en decisiones accionables: cobertura,
          costos estimados y red hospitalaria en un solo flujo.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-medium transition hover:-translate-y-0.5"
          >
            Probar consulta
          </button>
          <button
            type="button"
            className="rounded-full border border-accent px-5 py-3 text-sm font-semibold text-accent transition hover:-translate-y-0.5"
          >
            Ver flujo completo
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {indicadores.map((item) => (
            <div
              key={item.titulo}
              className="glass rounded-xl px-4 py-3 text-sm text-muted"
            >
              <p className="text-lg font-semibold text-ink">{item.titulo}</p>
              <p>{item.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative grid place-items-center">
        <div className="absolute h-56 w-56 rounded-full bg-[radial-gradient(circle,_#bceadf_0%,_transparent_70%)]" />
        <img
          src={heroImg}
          alt="Vista del dashboard de MediCost AI"
          className="relative z-10 w-[280px] rounded-[28px] shadow-strong"
        />
        <div className="absolute bottom-[-24px] right-[-8px] z-20 grid gap-2 rounded-2xl border border-stroke bg-white p-4 text-sm shadow-medium">
          <p className="font-semibold text-ink">Resumen inmediato</p>
          <p className="text-muted">Copago estimado: $18.40</p>
          <p className="text-muted">Especialidad sugerida: Cardiologia</p>
          <span className="w-fit rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-accent">
            Cobertura 82%
          </span>
        </div>
      </div>
    </section>
  )
}

export default HeroPrincipal

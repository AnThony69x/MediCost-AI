function LlamadoAccion() {
  return (
    <section id="cta" className="py-12">
      <div className="flex flex-col items-start gap-6 rounded-[28px] bg-gradient-to-br from-accent to-[#136f63] p-8 text-white shadow-strong md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">
            Activa un piloto en tu clinica
          </h2>
          <p className="text-sm text-white/80">
            Integra MediCost AI en tu flujo de atencion y obtiene reportes de
            copagos en tiempo real.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-accent"
          >
            Agendar demo
          </button>
          <button
            type="button"
            className="rounded-full border border-white/50 px-5 py-2 text-sm font-semibold text-white"
          >
            Hablar con ventas
          </button>
        </div>
      </div>
    </section>
  )
}

export default LlamadoAccion

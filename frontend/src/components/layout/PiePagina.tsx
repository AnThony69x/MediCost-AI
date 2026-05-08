function PiePagina() {
  return (
    <footer className="border-t border-stroke bg-white/70 py-12">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-[1.4fr_1fr_1fr] md:items-center">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            MediCost AI
          </p>
          <p className="text-sm text-muted">
            Orientamos copagos con datos reales y un lenguaje claro.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-muted">
          <a href="#beneficios">Beneficios</a>
          <a href="#flujo">Flujo</a>
          <a href="#cta">Contactar</a>
        </div>
        <div className="rounded-xl border border-stroke bg-white p-4 shadow-soft">
          <p className="text-xs uppercase tracking-widest text-muted">
            Seguridad
          </p>
          <p className="text-base font-semibold text-ink">Datos cifrados</p>
        </div>
      </div>
    </footer>
  )
}

export default PiePagina

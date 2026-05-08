function SeccionValor() {
  return (
    <section className="grid gap-10 border-t border-stroke py-14 md:grid-cols-2">
      <div id="que-resuelve" className="scroll-mt-28">
        <h2 className="font-display text-2xl font-semibold text-ink">
          ¿Qué resuelve?
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>No sabes cuánto pagarás por la consulta o el servicio.</li>
          <li>No sabes a qué especialista acudir según tus síntomas.</li>
          <li>No sabes qué hospital conviene más dentro de tu red.</li>
        </ul>
      </div>
      <div id="que-entrega" className="scroll-mt-28">
        <h2 className="font-display text-2xl font-semibold text-ink">
          ¿Qué entrega?
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>Especialidad médica orientativa.</li>
          <li>Cobertura de tu seguro (porcentaje).</li>
          <li>Copago estimado.</li>
          <li>Comparación de hospitales y la opción más conveniente.</li>
        </ul>
      </div>
    </section>
  )
}

export default SeccionValor

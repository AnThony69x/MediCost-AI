import HeroPrincipal from '../components/hero/HeroPrincipal'
import ListaBeneficios from '../components/beneficios/ListaBeneficios'
import SeccionFlujo from '../components/flujo/SeccionFlujo'
import ListaTestimonios from '../components/testimonios/ListaTestimonios'
import LlamadoAccion from '../components/cta/LlamadoAccion'
import CajaChat from '../components/chat/CajaChat'

function Inicio() {
  return (
    <>
      <HeroPrincipal />
      <section className="grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            Chat medico inteligente
          </p>
          <h2 className="text-balance font-display text-3xl font-semibold text-ink">
            Una conversacion clara que entrega especialidad, copago y hospitales
          </h2>
          <p className="text-sm text-muted">
            La experiencia es como un asistente clinico: recibe sintomas,
            consulta cobertura y entrega recomendaciones accionables.
          </p>
          <div className="grid gap-3 text-sm text-muted">
            <div className="flex items-center justify-between rounded-2xl border border-stroke bg-white p-4 shadow-soft">
              <span>Especialidad recomendada</span>
              <span className="font-semibold text-ink">Cardiologia</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-stroke bg-white p-4 shadow-soft">
              <span>Cobertura promedio</span>
              <span className="font-semibold text-ink">80%</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-stroke bg-white p-4 shadow-soft">
              <span>Copago estimado</span>
              <span className="font-semibold text-ink">$16</span>
            </div>
          </div>
        </div>
        <CajaChat />
      </section>
      <ListaBeneficios />
      <div className="py-8">
        <SeccionFlujo />
      </div>
      <ListaTestimonios />
      <LlamadoAccion />
    </>
  )
}

export default Inicio

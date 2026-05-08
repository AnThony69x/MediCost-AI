import { useRef } from 'react'
import { ClipboardList, Hospital, Stethoscope, Wallet } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const pasos = [
  {
    titulo: 'Describe tu síntoma',
    descripcion: 'Escribe lo que sientes en lenguaje natural, sin términos médicos complejos.',
    Icon: Stethoscope,
  },
  {
    titulo: 'Analizamos tu caso',
    descripcion: 'Nuestra IA identifica la especialidad médica más probable para tu consulta.',
    Icon: ClipboardList,
  },
  {
    titulo: 'Calculamos tu copago',
    descripcion: 'Estimamos el costo total basándonos en tu plan de salud y cobertura actual.',
    Icon: Wallet,
  },
  {
    titulo: 'Recomendación de Red',
    descripcion: 'Comparamos hospitales cercanos para asegurar que pagues lo justo.',
    Icon: Hospital,
  },
]

function SeccionComoFunciona() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Refresh ScrollTrigger after a small delay to ensure layout is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    gsap.from('.step-card', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 90%', // Trigger earlier
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      clearProps: 'all' // Ensure no leftover styles after animation
    })

    gsap.from('.section-header', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 95%',
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    })

    return () => clearTimeout(timer)
  }, { scope: container })

  return (
    <section id="como-funciona" ref={container} className="py-24 sm:py-32">
      <div className="section-header mb-16 text-center lg:text-left">
        <p className="como-kicker mb-4 text-sm font-bold uppercase tracking-widest">Proceso Inteligente</p>
        <h2 className="como-title text-4xl font-bold sm:text-5xl">
          ¿Cómo funciona?
        </h2>
        <p className="como-subtitle mt-6 max-w-2xl text-lg">
          Cuatro pasos claros para transformar tus dudas en decisiones financieras inteligentes.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pasos.map(({ titulo, descripcion, Icon }, i) => (
          <div
            key={titulo}
            className="step-card group relative rounded-3xl p-8 glass-card transition-all duration-300 hover:-translate-y-2"
          >
            <div className="como-icon-wrap mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors">
              <Icon size={28} />
            </div>
            
            <div className="como-step-number absolute top-8 right-8 text-4xl font-black transition-colors">
              0{i + 1}
            </div>

            <h3 className="como-step-title mb-3 text-xl font-bold">{titulo}</h3>
            <p className="como-step-description text-sm leading-relaxed">
              {descripcion}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}


export default SeccionComoFunciona




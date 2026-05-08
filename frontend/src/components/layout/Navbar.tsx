import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { HeartPulse } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { LANDING_SECTIONS } from '../../constants/landingSections'
import { useLandingSectionNav } from '../../hooks/useLandingSectionNav'

function Navbar() {
  const irASeccion = useLandingSectionNav()
  const headerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    })
    
    gsap.from('.nav-link', {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out',
    })
  }, { scope: headerRef })

  return (
    <header 
      ref={headerRef}
      className="fixed inset-x-0 top-6 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="glass-card flex items-center justify-between rounded-[2rem] px-6 py-4 shadow-strong">
        <Link
          to="/"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-glow transition-transform group-hover:rotate-12">
            <HeartPulse size={24} />
          </div>
          <div className="hidden sm:block">
            <p className="text-xl font-bold tracking-tight text-ink">
              MediCost<span className="text-accent">AI</span>
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
              Inteligencia Médica
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LANDING_SECTIONS.map(({ id, etiqueta }) => (
            <a
              key={id}
              href={`/#${id}`}
              className="nav-link rounded-full px-5 py-2 text-sm font-medium text-muted transition-all hover:bg-accent/5 hover:text-accent"
              onClick={(e) => {
                e.preventDefault()
                irASeccion(id)
              }}
            >
              {etiqueta}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/chat"
            className="btn-primary py-2.5 text-sm"
          >
            Simular Copago
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar


import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { LANDING_SECTIONS } from '../../constants/landingSections'
import { useLandingSectionNav } from '../../hooks/useLandingSectionNav'

function Navbar() {
  const irASeccion = useLandingSectionNav()
  const navRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    // Set initial state via GSAP to avoid CSS conflicts
    gsap.set(navRef.current, { y: -30, autoAlpha: 0 })
    gsap.set('.nav-item', { autoAlpha: 0 })

    tl.to(navRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
    })
    .to('.nav-item', {
      autoAlpha: 1,
      stagger: 0.1,
      duration: 0.6,
      clearProps: 'all'
    }, '-=0.7')
  }, { scope: navRef })


  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <nav
        ref={navRef}
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/5 bg-slate-950/40 px-6 py-3 backdrop-blur-xl shadow-2xl"
      >
        <Link to="/" className="nav-item flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-glow-primary transition-transform group-hover:rotate-12">
            <Activity size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            MediCost<span className="text-primary">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {LANDING_SECTIONS.map(({ id, etiqueta }) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-item text-sm font-medium text-slate-400 transition-colors hover:text-white"
              onClick={(e) => {
                e.preventDefault()
                irASeccion(id)
              }}
            >
              {etiqueta}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/chat"
            className="nav-item btn-primary py-2 px-6 text-sm whitespace-nowrap"
          >
            Simular Copago
          </Link>
        </div>
      </nav>
    </header>
  )

}

export default Navbar

import type { ReactNode } from 'react'
import Navbar from './Navbar'
import PiePagina from './PiePagina'

type LayoutVariant = 'default' | 'app'

type LayoutPrincipalProps = {
  children: ReactNode
  variant?: LayoutVariant
}

function LayoutPrincipal({
  children,
  variant = 'default',
}: LayoutPrincipalProps) {
  const isApp = variant === 'app'

  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 right-[-100px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,_rgba(184,228,220,0.55)_0%,_transparent_68%)] opacity-80" />
        <div className="absolute bottom-[-160px] left-[-140px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,_rgba(232,196,168,0.4)_0%,_transparent_68%)] opacity-90" />
        <div className="absolute left-1/2 top-[38%] h-[320px] w-[520px] max-w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,_rgba(224,242,239,0.35)_0%,_transparent_72%)]" />
      </div>
      {isApp ? null : <Navbar />}
      <main
        className={`relative z-10 flex min-h-0 flex-1 flex-col ${
          isApp
            ? 'mx-auto w-full max-w-3xl px-4 pb-6 pt-6 md:px-6'
            : 'mx-auto w-full max-w-6xl px-6 pb-0 pt-28'
        }`}
      >
        {children}
      </main>
      {isApp ? null : <PiePagina />}
    </div>
  )
}

export default LayoutPrincipal

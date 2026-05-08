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
        <div className="absolute -top-32 right-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_#c1f2e6_0%,_transparent_70%)] opacity-70" />
        <div className="absolute bottom-[-140px] left-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_#ffd8b1_0%,_transparent_70%)] opacity-70" />
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

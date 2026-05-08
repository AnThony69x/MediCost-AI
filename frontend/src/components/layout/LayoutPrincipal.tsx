import type { ReactNode } from 'react'
import Navbar from './Navbar'
import PiePagina from './PiePagina'

type LayoutPrincipalProps = {
  children: ReactNode
}

function LayoutPrincipal({ children }: LayoutPrincipalProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_#c1f2e6_0%,_transparent_70%)] opacity-70" />
      <div className="pointer-events-none absolute bottom-[-140px] left-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_#ffd8b1_0%,_transparent_70%)] opacity-70" />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-28">
        {children}
      </main>
      <PiePagina />
    </div>
  )
}

export default LayoutPrincipal

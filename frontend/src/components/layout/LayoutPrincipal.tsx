import type { ReactNode } from 'react'
import Navbar from './Navbar'
import PiePagina from './PiePagina'
import { SmoothScroll } from '../common/SmoothScroll'

type LayoutVariant = 'default' | 'app'

type LayoutPrincipalProps = Readonly<{
  children: ReactNode
  variant?: LayoutVariant
}>

function LayoutPrincipal({
  children,
  variant = 'default',
}: LayoutPrincipalProps) {
  const isApp = variant === 'app'

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden selection:bg-accent/10 selection:text-accent">
      <SmoothScroll />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[#F8FAFC]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      {isApp ? null : <Navbar />}
      
      <main
        className={`relative z-10 flex min-h-0 flex-1 flex-col ${
          isApp
            ? 'mx-auto w-full max-w-7xl px-4 pb-6 pt-5 sm:px-6 lg:px-8'
            : 'mx-auto w-full max-w-7xl px-4 pb-0 pt-24 sm:px-6 lg:px-8 xl:pt-28'
        }`}
      >
        <div className={isApp ? 'flex min-h-0 flex-1 flex-col' : ''}>
          {children}
        </div>
      </main>
      
      {isApp ? null : <PiePagina />}
    </div>
  )
}

export default LayoutPrincipal


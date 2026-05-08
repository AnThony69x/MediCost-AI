function LoaderEscribiendo() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/78 px-4 py-2 text-xs text-muted shadow-soft backdrop-blur-xl animate-pop">
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-accent" />
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-accent [animation-delay:140ms]" />
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-accent [animation-delay:280ms]" />
      <span className="ml-2">Escribiendo...</span>
    </div>
  )
}

export default LoaderEscribiendo

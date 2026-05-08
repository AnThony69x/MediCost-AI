function LoaderEscribiendo() {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs text-muted shadow-soft">
      <span className="h-2 w-2 animate-bounce rounded-full bg-accent"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:150ms]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:300ms]"></span>
      <span className="ml-2">Escribiendo...</span>
    </div>
  )
}

export default LoaderEscribiendo

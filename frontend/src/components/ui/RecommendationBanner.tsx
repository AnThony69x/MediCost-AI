type RecommendationBannerProps = Readonly<{
  titulo: string
  descripcion: string
}>

function RecommendationBanner({ titulo, descripcion }: RecommendationBannerProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-accent/15 bg-[linear-gradient(135deg,rgba(232,251,247,0.9),rgba(255,255,255,0.92))] px-4 py-3 shadow-soft">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {titulo}
        </p>
        <p className="text-sm font-semibold text-ink">{descripcion}</p>
      </div>
      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-accent shadow-sm">
        Recomendado
      </span>
    </div>
  )
}

export default RecommendationBanner

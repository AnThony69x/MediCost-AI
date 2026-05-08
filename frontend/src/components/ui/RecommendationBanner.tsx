type RecommendationBannerProps = {
  titulo: string
  descripcion: string
}

function RecommendationBanner({ titulo, descripcion }: RecommendationBannerProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-accent bg-accentSoft px-4 py-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {titulo}
        </p>
        <p className="text-sm font-semibold text-ink">{descripcion}</p>
      </div>
      <span className="text-xs font-semibold text-accent">Recomendado</span>
    </div>
  )
}

export default RecommendationBanner

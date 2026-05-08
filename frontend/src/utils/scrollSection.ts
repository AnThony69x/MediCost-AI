/** Scroll to an in-page section; honors reduced-motion preferences. */
export function scrollToSectionId(id: string): void {
  const el = document.getElementById(id)
  if (!el) return

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.requestAnimationFrame(() => {
    el.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    })
  })
}

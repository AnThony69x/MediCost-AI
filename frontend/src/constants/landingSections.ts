export const LANDING_SECTIONS = [
  { id: 'como-funciona', etiqueta: 'Cómo funciona' },
  { id: 'que-resuelve', etiqueta: 'Qué resuelve' },
  { id: 'que-entrega', etiqueta: 'Qué entrega' },
] as const

export type LandingSectionId = (typeof LANDING_SECTIONS)[number]['id']

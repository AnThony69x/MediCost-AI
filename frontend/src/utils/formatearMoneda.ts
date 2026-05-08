const formateador = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export function formatearMoneda(valor: number) {
  return formateador.format(valor)
}

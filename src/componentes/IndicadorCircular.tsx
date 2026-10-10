interface PropiedadesIndicador {
  porcentaje: number
  etiqueta: string
  detalle: string
}

export function IndicadorCircular({ porcentaje, etiqueta, detalle }: PropiedadesIndicador) {
  const valor = Math.min(100, Math.max(0, porcentaje))
  const perimetro = 2 * Math.PI * 58
  return (
    <figure className="indicador-circular">
      <div className="indicador-circular__grafico">
        <svg viewBox="0 0 144 144" role="img" aria-label={`${etiqueta}: ${valor}%`}>
          <circle cx="72" cy="72" r="58" fill="none" stroke="#e8f2f8" strokeWidth="12" />
          <circle className="indicador-circular__arco" cx="72" cy="72" r="58" fill="none"
            stroke="#004373" strokeWidth="12" strokeLinecap={valor === 0 ? 'butt' : 'round'}
            strokeDasharray={perimetro} strokeDashoffset={perimetro * (1 - valor / 100)}
            transform="rotate(-90 72 72)" />
        </svg>
        <strong aria-hidden="true">{valor}<span>%</span></strong>
      </div>
      <figcaption><strong>{etiqueta}</strong><p>{detalle}</p></figcaption>
    </figure>
  )
}

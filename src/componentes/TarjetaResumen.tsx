import type { LucideIcon } from 'lucide-react'

interface PropiedadesResumen {
  icono: LucideIcon
  valor: string
  etiqueta: string
}

export function TarjetaResumen({ icono: Icono, valor, etiqueta }: PropiedadesResumen) {
  return (
    <div className="metrica-destacada flex items-center gap-4">
      <div className="metrica-destacada__icono">
        <Icono className="size-5" />
      </div>
      <div>
        <strong className="block text-white">{valor}</strong>
        <p>{etiqueta}</p>
      </div>
    </div>
  )
}

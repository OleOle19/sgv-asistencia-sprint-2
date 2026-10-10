import type { LucideIcon } from 'lucide-react'

interface PropiedadesResumen {
  icono: LucideIcon
  valor: string
  etiqueta: string
}

export function TarjetaResumen({ icono: Icono, valor, etiqueta }: PropiedadesResumen) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#14527e] px-3.5 py-3">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#2c638b] text-[#ffd27b]">
        <Icono className="size-4.5" />
      </div>
      <div>
        <div className="font-titulos text-lg font-bold leading-none text-white">{valor}</div>
        <div className="mt-1 text-[11px] text-sky-100">{etiqueta}</div>
      </div>
    </div>
  )
}

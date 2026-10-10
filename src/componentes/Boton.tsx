import type { ButtonHTMLAttributes } from 'react'
type VarianteBoton = 'primaria' | 'secundaria' | 'observacion' | 'fantasma'
interface PropiedadesBoton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBoton
  tamaño?: 'medio' | 'pequeño' | 'icono'
}

const clasesPorVariante: Record<VarianteBoton, string> = {
  primaria:
    'bg-incubunt-azul text-white shadow-sm hover:bg-[#063657]',
  secundaria:
    'border border-[#d6e0e7] bg-white text-[#263746] hover:border-[#aebfca] hover:bg-[#f8fafb]',
  observacion:
    'border border-[#f1c56d] bg-[#fff8e9] text-[#7a5200] hover:bg-[#fff1d1]',
  fantasma: 'text-[#566675] hover:bg-[#edf2f5] hover:text-incubunt-azul',
}

const clasesPorTamaño = {
  medio: 'min-h-11 px-4',
  pequeño: 'min-h-9 px-3',
  icono: 'size-10 p-0',
}

export function Boton({
  variante = 'primaria',
  tamaño = 'medio',
  className = '',
  type = 'button',
  ...propiedades
}: PropiedadesBoton) {
  return (
    <button
      type={type}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl
        text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-3
        focus-visible:ring-[#ffb025]/40 disabled:cursor-not-allowed disabled:opacity-50
        ${clasesPorTamaño[tamaño]} ${clasesPorVariante[variante]} ${className}`}
      {...propiedades}
    />
  )
}

import type { ReactNode } from 'react'

interface PropiedadesCabecera {
  id: string
  titulo: string
  descripcion: string
  children?: ReactNode
  metricas?: ReactNode
}

export function CabeceraSeccion({ id, titulo, descripcion, children, metricas }: PropiedadesCabecera) {
  return (
    <div className="cabecera-destacada px-5 py-6 text-white md:px-7 md:py-7">
      <div className="flex flex-col gap-6">
        <div className="min-w-0">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#ffb025]">SGV / Asistencia</p>
          <h2 id={id} className="font-titulos text-2xl font-bold tracking-tight md:text-3xl">{titulo}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100">{descripcion}</p>
          {children}
        </div>
        {metricas && <div className="metricas-destacadas grid gap-3 sm:grid-cols-3">{metricas}</div>}
      </div>
    </div>
  )
}

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
    <div className="rounded-2xl bg-incubunt-azul px-5 py-6 text-white shadow-[0_14px_30px_rgba(0,67,115,.14)] md:px-7 md:py-7">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <h2 id={id} className="font-titulos text-2xl font-bold tracking-tight md:text-3xl">{titulo}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100">{descripcion}</p>
          {children}
        </div>
        {metricas && <div className="grid shrink-0 gap-2 sm:grid-cols-3">{metricas}</div>}
      </div>
    </div>
  )
}

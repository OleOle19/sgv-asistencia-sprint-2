export function AvatarVoluntario({ nombres, apellidos }: { nombres: string; apellidos: string }) {
  const iniciales = `${nombres.trim().charAt(0)}${apellidos.trim().charAt(0)}`.toLocaleUpperCase('es')
  return (
    <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e8f2f8] font-titulos text-sm font-bold text-incubunt-azul">
      {iniciales}
    </span>
  )
}

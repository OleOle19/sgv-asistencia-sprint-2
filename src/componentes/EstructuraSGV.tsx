import { useState, type ReactNode } from 'react'
import {
  Bell, ChevronDown, ClipboardCheck, FileBarChart, FolderKanban, Gauge,
  HeartHandshake, Menu, Search, Settings, UserRound, UsersRound, X,
} from 'lucide-react'
import * as MenuDesplegable from '@radix-ui/react-dropdown-menu'
import * as Dialogo from '@radix-ui/react-dialog'
import type { RolVista } from '../tipos/asistencia'
import { Boton } from './Boton'

interface PropiedadesEstructura {
  children: ReactNode
  rol: RolVista
  alCambiarRol: (rol: RolVista) => void
}

const enlaces = [
  { texto: 'Resumen', icono: Gauge },
  { texto: 'Voluntarios', icono: UsersRound },
  { texto: 'Proyectos', icono: FolderKanban },
  { texto: 'Actividades', icono: ClipboardCheck },
  { texto: 'Asistencia', icono: HeartHandshake, activo: true },
  { texto: 'Reportes', icono: FileBarChart },
]

function ContenidoBarraLateral({ alCerrar }: { alCerrar?: () => void }) {
  return (
    <>
      <div className="px-5 pb-8 pt-6">
        <div className="rounded-xl bg-white p-6">
          <img src="/marca/isologo-incubunt.png" alt="INCUBUNT: Inspira, Innova, Emprende"
            className="mx-auto h-auto w-[140px]" />
        </div>
      </div>
      <nav className="flex-1 px-3" aria-label="Navegación principal">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300/70">Gestión</p>
        <div className="space-y-1">
          {enlaces.map(({ texto, icono: Icono, activo }) => (
            <button key={texto} type="button" disabled={!activo}
              aria-current={activo ? 'page' : undefined}
              onClick={() => {
                alCerrar?.()
                document.getElementById('contenido')?.focus()
              }}
              className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm transition
                ${activo
                  ? 'bg-white/12 font-semibold text-white shadow-[inset_3px_0_0_#ffb025]'
                  : 'cursor-default text-sky-100/70'}`}
            >
              <Icono className="size-[18px]" />
              {texto}
            </button>
          ))}
        </div>
      </nav>
      <button type="button" disabled className="mx-3 mb-5 flex h-11 items-center gap-3 rounded-xl px-3 text-sm text-sky-100/60">
        <Settings className="size-[18px]" /> Configuración
      </button>
    </>
  )
}

export function EstructuraSGV({ children, rol, alCambiarRol }: PropiedadesEstructura) {
  const [menuMovilAbierto, establecerMenuMovilAbierto] = useState(false)

  return (
    <div className="min-h-screen bg-[#f3f6f8]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[244px] flex-col bg-incubunt-azul lg:flex">
        <ContenidoBarraLateral />
      </aside>
      <div className="min-w-0 lg:pl-[244px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center border-b border-[#e1e8ed] bg-white px-4 md:px-7">
          <Dialogo.Root open={menuMovilAbierto} onOpenChange={establecerMenuMovilAbierto}>
            <Dialogo.Trigger asChild>
              <Boton variante="fantasma" tamaño="icono" className="mr-2 lg:hidden" aria-label="Abrir menú">
                <Menu className="size-5" />
              </Boton>
            </Dialogo.Trigger>
            <Dialogo.Portal>
              <Dialogo.Overlay className="fixed inset-0 z-40 bg-[#061c2c]/55" />
              <Dialogo.Content className="fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col bg-incubunt-azul shadow-2xl outline-none">
                <Dialogo.Title className="sr-only">Navegación de SGV</Dialogo.Title>
                <Dialogo.Description className="sr-only">Menú principal. Asistencia es el módulo disponible en esta demo.</Dialogo.Description>
                <Dialogo.Close asChild>
                  <Boton variante="fantasma" tamaño="icono" className="absolute right-2 top-1 text-white hover:bg-white/10 hover:text-white" aria-label="Cerrar menú">
                    <X className="size-5" />
                  </Boton>
                </Dialogo.Close>
                <ContenidoBarraLateral alCerrar={() => establecerMenuMovilAbierto(false)} />
              </Dialogo.Content>
            </Dialogo.Portal>
          </Dialogo.Root>
          <div className="min-w-0 flex-1">
            <p className="hidden text-xs font-medium text-[#7a8893] sm:block">Sistema de Gestión de Voluntariado</p>
            <h1 className="truncate font-titulos text-lg font-bold text-[#172432]">Asistencia</h1>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <span className="hidden sm:block">
              <Boton variante="fantasma" tamaño="icono" disabled aria-label="Buscar: no disponible en la demo">
                <Search className="size-5" />
              </Boton>
            </span>
            <Boton variante="fantasma" tamaño="icono" disabled aria-label="Notificaciones: no disponibles en la demo">
              <Bell className="size-5" />
            </Boton>
            <div className="mx-1 hidden h-8 w-px bg-[#e1e8ed] sm:block" />
            <MenuDesplegable.Root>
              <MenuDesplegable.Trigger aria-label={`Usuario demo: ${rol}. Cambiar rol simulado`}
                className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl p-1.5 text-left outline-none transition hover:bg-[#f3f6f8] focus-visible:ring-3 focus-visible:ring-[#004373]/10">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e8f2f8] text-incubunt-azul">
                  <UserRound className="size-4.5" />
                </div>
                <div className="hidden min-w-0 sm:block">
                  <div className="max-w-32 truncate text-xs font-semibold text-[#263746]">Usuario demo</div>
                  <div className="max-w-32 truncate text-[10px] text-[#71808d]">{rol}</div>
                </div>
                <ChevronDown className="hidden size-4 text-[#84919b] sm:block" />
              </MenuDesplegable.Trigger>
              <MenuDesplegable.Portal>
                <MenuDesplegable.Content align="end" sideOffset={8}
                  className="z-50 w-56 rounded-xl border border-[#dbe4e9] bg-white p-1.5 shadow-xl">
                  <MenuDesplegable.Label className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#84919b]">
                    Simular permisos de
                  </MenuDesplegable.Label>
                  <MenuDesplegable.RadioGroup value={rol} onValueChange={(valor) => alCambiarRol(valor as RolVista)}>
                    {(['Voluntario', 'Director de proyecto', 'Presidencia'] as RolVista[]).map((opcion) => (
                      <MenuDesplegable.RadioItem key={opcion} value={opcion}
                        className="flex min-h-11 cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm text-[#334554] outline-none data-[highlighted]:bg-[#e8f2f8] data-[state=checked]:bg-[#e8f2f8] data-[state=checked]:font-semibold data-[state=checked]:text-incubunt-azul">
                        {opcion}
                      </MenuDesplegable.RadioItem>
                    ))}
                  </MenuDesplegable.RadioGroup>
                </MenuDesplegable.Content>
              </MenuDesplegable.Portal>
            </MenuDesplegable.Root>
          </div>
        </header>
        <main id="contenido" tabIndex={-1} className="mx-auto min-w-0 max-w-[1440px] p-4 outline-none md:p-7 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

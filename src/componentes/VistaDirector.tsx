import { useMemo, useRef, useState, type FormEvent } from 'react'
import { Check, CheckCircle2, Clock3, Eye, Inbox, MessageSquareWarning, X } from 'lucide-react'
import * as Dialogo from '@radix-ui/react-dialog'
import { Boton } from './Boton'
import { InsigniaEstado } from './InsigniaEstado'
import { CabeceraSeccion } from './CabeceraSeccion'
import { TarjetaResumen } from './TarjetaResumen'
import { AvatarVoluntario } from './AvatarVoluntario'
import { Selector } from './Selector'
import type {
    EstadoAsistencia,
    RegistroAsistencia,
    SesionAsistencia,
} from '../tipos/asistencia'

interface PropiedadesVistaDirector {
    sesion: SesionAsistencia
    registros: RegistroAsistencia[]
    alValidar: (id: string) => void
    alObservar: (id: string, observacion: string) => void
}

type FiltroEstado = 'Todos' | EstadoAsistencia

export function VistaDirector({
    sesion,
    registros,
    alValidar,
    alObservar,
}: PropiedadesVistaDirector) {
    const [filtroEstado, establecerFiltroEstado] = useState<FiltroEstado>('Todos')
    const [idEnObservacion, establecerIdEnObservacion] = useState<string | null>(null)
    const [motivo, establecerMotivo] = useState('')
    const botonOrigen = useRef<HTMLElement | null>(null)
    const [registroSeleccionado, establecerRegistroSeleccionado] = useState<RegistroAsistencia | null>(null)

    const solicitarObservacion = (id: string) => {
        botonOrigen.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
        establecerRegistroSeleccionado(registros.find((registro) => registro.id === id) ?? null)
        establecerMotivo('')
        establecerIdEnObservacion(id)
    }

    const cerrarObservacion = () => {
        establecerIdEnObservacion(null)
    }

    const registrosFiltrados = useMemo (() => {
        const ordenados = [...registros].sort ((a, b) =>
            a.apellidos.localeCompare(b.apellidos, 'es') ,
        )
        return filtroEstado === 'Todos'
            ? ordenados
            : ordenados.filter((registro) => registro.estado === filtroEstado)
    }, [filtroEstado, registros])

    const pendientes = registros.filter((registro) => registro.estado === 'Pendiente').length
    const validadas = registros.filter((registro) => registro.estado === 'Validada').length
    const observadas = registros.filter((registro) => registro.estado === 'Observada').length

    const guardarObservacion = (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (!idEnObservacion || !motivo.trim()) return
        alObservar(idEnObservacion, motivo.trim())
        establecerIdEnObservacion(null)
    }

    return (
        <section aria-labelledby="titulo-director" className="space-y-5 md:space-y-6">
            <CabeceraSeccion id="titulo-director" titulo="Validar asistencia"
                descripcion="Confirma el registro o devuelve una observación. No modifiques la marcación."
                metricas={<>
                    <TarjetaResumen icono={Clock3} etiqueta="pendientes" valor={String(pendientes)} />
                    <TarjetaResumen icono={CheckCircle2} etiqueta="validadas" valor={String(validadas)} />
                    <TarjetaResumen icono={MessageSquareWarning} etiqueta="observadas" valor={String(observadas)} />
                </>}>
                <p className="mt-4 text-xs leading-5 text-sky-100">{sesion.titulo} · {sesion.fecha} · {sesion.horario}</p>
            </CabeceraSeccion>

            <section className="tarjeta-sgv overflow-hidden">
                <div className="flex flex-col gap-3 border-b border-[#e5ecef] p-5 sm:flex-row
                    sm:items-center sm:justify-between">
                    <div>
                        <h3 className="font-titulos font-bold text-[#203441]">Registros recibidos</h3>
                        <p className="mt-1 text-xs text-[#70818d]">Ordenados alfabéticamente por apellidos.</p>
                    </div>
                    <div className="w-full sm:w-52">
                        <span className="mb-1.5 block text-xs font-semibold text-[#536473]">Estado</span>
                        <Selector valor={filtroEstado}
                            alCambiarValor={(estado) => establecerFiltroEstado(estado as FiltroEstado)}
                            etiqueta="Estado" opciones={['Todos', 'Sin marcar', 'Pendiente', 'Validada', 'Observada']} />
                    </div>
                </div>

                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full border-separate border-spacing-0 text-left text-sm">
                        <thead className="bg-[#f7f9fa] text-xs uppercase tracking-wider text-[#6d7d87]">
                            <tr>
                                <th className="px-5 py-3">Voluntario</th>
                                <th className="px-5 py-3">Área</th>
                                <th className="px-5 py-3">Hora</th>
                                <th className="px-5 py-3">Estado</th>
                                <th className="px-5 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrosFiltrados.map((registro) => (
                                <tr key={registro.id}>
                                    <td className="border-b border-[#edf1f3] px-5 py-4 font-semibold text-[#263746]">
                                        <div className="flex items-center gap-3">
                                            <AvatarVoluntario nombres={registro.nombres} apellidos={registro.apellidos} />
                                            <span>{registro.apellidos}, {registro.nombres}</span>
                                        </div>
                                    </td>
                                    <td className="border-b border-[#edf1f3] px-5 py-4">{registro.area}</td>
                                    <td className="border-b border-[#edf1f3] px-5 py-4">{registro.horaMarcada ?? '-'}</td>
                                    <td className="border-b border-[#edf1f3] px-5 py-4"><InsigniaEstado estado={registro.estado} /></td>
                                    <td className="border-b border-[#edf1f3] px-5 py-4">
                                        <Acciones
                                            registro={registro}
                                            alValidar={alValidar}
                                            alSolicitarObservacion={solicitarObservacion}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="divide-y divide-[#edf1f3] md:hidden">
                    {registrosFiltrados.map((registro) => (
                        <article key={registro.id} className="space-y-3 p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <AvatarVoluntario nombres={registro.nombres} apellidos={registro.apellidos} />
                                    <div className="min-w-0">
                                    <h4 className="font-semibold text-[#2b404d]">
                                        {registro.apellidos}, {registro.nombres}
                                    </h4>
                                    <p className="mt-1 text-xs text-[#70818d]">
                                        Área {registro.area} . {registro.horaMarcada ?? 'Sin hora registrada'}
                                    </p>
                                    </div>
                                </div>
                                <InsigniaEstado estado={registro.estado}/>
                            </div>
                            <Acciones
                                registro={registro}
                                alValidar={alValidar}
                                alSolicitarObservacion={solicitarObservacion}
                            />
                        </article>
                    ))}
                </div>
                {registrosFiltrados.length === 0 && (
                    <div role="status" className="flex flex-col items-center gap-2 px-5 py-12 text-center">
                        <Inbox className="size-8 text-[#84919b]" />
                        <p className="font-semibold text-[#263746]">No hay registros en este estado</p>
                        <p className="text-sm text-[#657381]">Selecciona otro estado para consultar los registros.</p>
                    </div>
                )}
            </section>

            <Dialogo.Root open={idEnObservacion !== null} onOpenChange={(abierto) => { if (!abierto) cerrarObservacion() }}>
                <Dialogo.Portal>
                    <Dialogo.Overlay className="modal-sgv-fondo" />
                    <Dialogo.Content className="modal-sgv"
                        onOpenAutoFocus={(evento) => {
                            evento.preventDefault()
                            document.getElementById('motivo')?.focus()
                        }}
                        onCloseAutoFocus={(evento) => {
                            evento.preventDefault()
                            if (botonOrigen.current?.isConnected) botonOrigen.current.focus()
                            else document.querySelector<HTMLButtonElement>('button[aria-label="Estado"]')?.focus()
                        }}>
                        <div className="border-b border-[#e5ecef] p-5 pr-14 sm:p-6">
                            <span className="mb-3 grid size-11 place-items-center rounded-xl bg-[#fff5df] text-[#875700]">
                                <MessageSquareWarning className="size-5" aria-hidden="true" />
                            </span>
                            <Dialogo.Title className="font-titulos text-xl font-bold text-[#172432]">Observar asistencia</Dialogo.Title>
                            <Dialogo.Description className="mt-2 text-sm leading-6 text-[#657381]">
                                Indica qué debe confirmar o corregir el voluntario. La hora de marcación no se modificará.
                            </Dialogo.Description>
                            <Dialogo.Close asChild>
                                <Boton variante="fantasma" tamaño="icono" className="absolute right-3 top-3" aria-label="Cerrar observación">
                                    <X className="size-5" aria-hidden="true" />
                                </Boton>
                            </Dialogo.Close>
                        </div>
                        <form onSubmit={guardarObservacion} className="p-5 sm:p-6">
                            {registroSeleccionado && (
                                <div className="mb-5 flex items-center gap-3 rounded-xl bg-[#f3f6f8] p-3">
                                    <AvatarVoluntario nombres={registroSeleccionado.nombres} apellidos={registroSeleccionado.apellidos} />
                                    <div className="min-w-0">
                                        <p className="break-words text-sm font-semibold text-[#263746]">{registroSeleccionado.apellidos}, {registroSeleccionado.nombres}</p>
                                        <p className="mt-1 text-xs text-[#657381]">Área {registroSeleccionado.area} · Marcación {registroSeleccionado.horaMarcada ?? 'sin registrar'}</p>
                                    </div>
                                </div>
                            )}
                            <label className="block text-sm font-semibold text-[#263746]" htmlFor="motivo">Motivo de la observación</label>
                            <textarea id="motivo" value={motivo} onChange={(evento) => establecerMotivo(evento.target.value)}
                                rows={4} required aria-describedby="ayuda-motivo"
                                className="mt-2 w-full resize-y rounded-xl border border-[#d6e0e7] bg-white p-3 text-sm text-[#263746] outline-none focus:border-[#004373]"
                                placeholder="Indica qué debe confirmar o corregir el voluntario" />
                            <p id="ayuda-motivo" className="mt-2 text-xs leading-5 text-[#657381]">El motivo quedará asociado a este registro en la demostración.</p>
                            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                <Dialogo.Close asChild><Boton variante="secundaria">Cancelar</Boton></Dialogo.Close>
                                <Boton type="submit" variante="observacion" disabled={!motivo.trim()}>
                                    <MessageSquareWarning className="size-4" aria-hidden="true" /> Guardar observación
                                </Boton>
                            </div>
                        </form>
                    </Dialogo.Content>
                </Dialogo.Portal>
            </Dialogo.Root>
        </section>
    )
}

function Acciones({
    registro,
    alValidar,
    alSolicitarObservacion,
}: {
    registro: RegistroAsistencia
    alValidar: (id: string) => void
    alSolicitarObservacion: (id: string) => void
}) {
    if (registro.estado !== 'Pendiente') {
        return (
            <div className="flex justify-end text-xs text-[#70818d]">
                <Eye className="mr-1 size-4"/> Solo consulta
            </div>
        )
    }
    return (
        <div className="flex flex-wrap justify-end gap-2">
            <Boton variante="secundaria" onClick={() => alValidar(registro.id)}>
                <Check className="size-4"/> Validar
            </Boton>
            <Boton variante="observacion" onClick={() => alSolicitarObservacion(registro.id)}>
                Observar
            </Boton>
        </div>
    )
}

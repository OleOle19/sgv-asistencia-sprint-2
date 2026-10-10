import { CalendarDays, CheckCircle2, Clock3, Laptop2, UserRound } from 'lucide-react'
import { Boton } from './Boton'
import { InsigniaEstado } from './InsigniaEstado'
import { CabeceraSeccion } from './CabeceraSeccion'
import { AvatarVoluntario } from './AvatarVoluntario'
import type { RegistroAsistencia, SesionAsistencia } from '../tipos/asistencia'

interface PropiedadesVistaVoluntario {
    sesion: SesionAsistencia
    registro: RegistroAsistencia
    ventanaAbierta: boolean
    alMarcar: () => void //yo me void :v
}

export function VistaVoluntario({
    sesion,
    registro,
    ventanaAbierta,
    alMarcar,
}: PropiedadesVistaVoluntario) {
    const puedeMarcar = ventanaAbierta && registro.estado === 'Sin marcar'

    return (
        <section aria-labelledby="titulo-voluntario" className="space-y-5 md:space-y-6">
            <CabeceraSeccion id="titulo-voluntario" titulo={sesion.titulo}
                descripcion="Marca tu asistencia únicamente durante el horario asignado. El director de proyecto validará el registro después de la sesión.">
                <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#14527e] px-3 py-2 text-xs font-medium text-sky-100">
                    <CalendarDays className="size-4 text-[#ffd27b]" />
                    Próxima sesión · {sesion.fecha}
                </div>
            </CabeceraSeccion>

            <div className="grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
                <article className="tarjeta-sgv p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#70818d]">
                                {sesion.tipo}
                            </p>
                            <h3 className="mt-1 font-titulos text-lg font-bold text-[#203441]">
                                {sesion.proyecto}
                            </h3>
                        </div>
                        <InsigniaEstado estado={registro.estado} />
                    </div>

                    <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                        <Dato icono={CalendarDays} etiqueta="Fecha" valor={sesion.fecha} />
                        <Dato icono={Clock3} etiqueta="Horario" valor={sesion.horario} />
                        <Dato icono={Laptop2} etiqueta="Modalidad" valor={sesion.modalidad} />
                        <Dato icono={UserRound} etiqueta="Responsable" valor={sesion.responsable} />
                    </dl>

                    <div className="mt-6 border-t border-[#e5ecef] pt-5">
                        {puedeMarcar && (
                            <Boton onClick={alMarcar} className="w-full sm:w-auto">
                                <CheckCircle2 className="size-4" />
                                Marcar asistencia
                            </Boton>
                        )}

                        {!ventanaAbierta && registro.estado === 'Sin marcar' && (
                            <p className="rounded-xl border border-[#f1c56d] bg-[#fff8e9] p-4 text-sm
                                leading-6 text-[#6e4a00]">
                                La opción para marcar asistencia aparecerá cuando comience
                                el horario asignado.
                            </p>
                        )}

                        {registro.estado !== 'Sin marcar' && (
                            <div className="rounded-xl bg-[#eef6f8] p-4 text-sm leading-6 text-[#365464]">
                                Registro enviado a las <strong>{registro.horaMarcada}</strong>. Estado actual: {' '}
                                <strong>{registro.estado.toLowerCase()}</strong>.
                                {registro.observacion && (
                                    <span className="mt-2 block">Observación: {registro.observacion}</span>
                                )}
                            </div>
                        )}
                    </div>
                </article>

                <aside className="tarjeta-sgv p-5 md:p-6">
                    <h3 className="font-titulos font-bold text-[#203441]">Tu registro</h3>
                    <p className="mt-2 text-sm leading-6 text-[#647681]">
                        La asistencia no queda aprobada al marcarla. Primero pasa a revisión
                        del director del proyecto.
                    </p>
                    <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#f7fafb] p-4">
                        <AvatarVoluntario nombres={registro.nombres} apellidos={registro.apellidos} />
                        <div className="min-w-0">
                            <p className="text-xs text-[#70818d]">Voluntario</p>
                            <p className="mt-1 break-words font-semibold text-[#263746]">
                                {registro.apellidos}, {registro.nombres}
                            </p>
                            <p className="mt-1 text-xs font-medium text-incubunt-azul">Área {registro.area}</p>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    )
}

interface PropiedadesDato {
    icono: typeof CalendarDays
    etiqueta: string
    valor: string
}

function Dato({ icono: Icono, etiqueta, valor }: PropiedadesDato) {
    return (
        <div className="flex gap-3 rounded-xl bg-[#f7f9fa] p-4">
            <Icono className="mt-0.5 size-4 shrink-0 text-incubunt-azul" />
            <div>
                <dt className="text-xs text-[#70818d]">{etiqueta}</dt>
                <dd className="mt-1 text-sm font-semibold text-[#2d414f]">{valor}</dd>
            </div>
        </div>
    )
}

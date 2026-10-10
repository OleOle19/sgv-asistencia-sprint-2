import { BarChart3, Clock3, UsersRound } from "lucide-react"
import { InsigniaEstado } from "./InsigniaEstado"
import { CabeceraSeccion } from './CabeceraSeccion'
import { TarjetaResumen } from './TarjetaResumen'
import { AvatarVoluntario } from './AvatarVoluntario'
import type { RegistroAsistencia, SesionAsistencia } from "../tipos/asistencia"

interface PropiedadesVistaPresidencia {
    sesion: SesionAsistencia
    registros: RegistroAsistencia[]
}

export function VistaPresidencia({ sesion, registros }: PropiedadesVistaPresidencia) {
    const total = registros.length
    const marcadas = registros.filter((registro) => registro.estado !== 'Sin marcar').length
    const porcentaje = total ? Math.round((marcadas / total) * 100) : 0
    const colorSemaforo =
        porcentaje < 30
            ? 'bg-rose-500'
            : porcentaje < 60
                ? 'bg-orange-500'
                : 'bg-emerald-500'

    return (
        <section aria-labelledby="titulo-presidencia" className="space-y-5 md:space-y-6">
            <CabeceraSeccion id="titulo-presidencia" titulo="Resumen de asistencia"
                descripcion="Esta vista es de solo lectura y no permite validar ni modificar registros."
                metricas={<>
                    <TarjetaResumen icono={UsersRound} valor={`${marcadas} de ${total}`} etiqueta="registros recibidos" />
                    <TarjetaResumen icono={Clock3} valor={String(total - marcadas)} etiqueta="sin marcar" />
                    <TarjetaResumen icono={BarChart3} valor={`${porcentaje}%`} etiqueta="asistencia registrada" />
                </>}>
                <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#14527e] px-3 py-2 text-xs text-sky-100">
                    <span className={`size-2 rounded-full ${colorSemaforo}`} aria-hidden="true" />
                    {porcentaje < 30 ? 'Registro bajo' : porcentaje < 60 ? 'Registro intermedio' : 'Registro alto'}
                </div>
            </CabeceraSeccion>

            <div className="tarjeta-sgv overflow-hidden">
                <div className="border-b border-[#e5ecef] p-5">
                    <h3 className="font-titulos font-bold text-[#203441]">{sesion.titulo}</h3>
                    <p className="mt-1 text-xs text-[#70818d]">
                        {sesion.fecha} . {sesion.horario} . {sesion.proyecto}
                    </p>
                </div>
                <div className="divide-y divide-[#edf1f3]">
                    {registros.map((registro) => (
                        <div
                            key={registro.id}
                            className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <AvatarVoluntario nombres={registro.nombres} apellidos={registro.apellidos} />
                                <div className="min-w-0">
                                    <p className="break-words font-semibold text-[#263746]">
                                        {registro.apellidos}, {registro.nombres}
                                    </p>
                                    <p className="mt-1 text-xs text-[#70818d]">
                                        Área {registro.area} · {registro.horaMarcada ?? 'Sin marcación'}
                                    </p>
                                </div>
                            </div>
                            <InsigniaEstado estado={registro.estado}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

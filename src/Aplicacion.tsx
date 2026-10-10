import { useState } from "react";
import { Toaster as Avisos, toast as notificar } from 'sonner'
import { EstructuraSGV } from "./componentes/EstructuraSGV";
import { VistaDirector } from "./componentes/VistaDirector";
import { VistaPresidencia } from "./componentes/VistaPresidencia";
import { VistaVoluntario } from "./componentes/VistaVoluntario";
import { registrosIniciales, sesionDemostracion } from "./datos/asistencias";
import type { RegistroAsistencia, RolVista } from "./tipos/asistencia";

const idVoluntarioActual = 'VOL-001'

export function Aplicacion() {
    const [rolVista, establecerRolVista] = useState<RolVista>('Voluntario')
    const [ventanaAbierta, establecerVentanaAbierta] = useState(true)
    const [registros, establecerRegistros] =
        useState<RegistroAsistencia[]>(registrosIniciales)

        const registroVoluntario = registros.find(
            (registro) => registro.voluntarioId === idVoluntarioActual ,
        )!

        const marcarAsistencia = () => {
            if (!ventanaAbierta || registroVoluntario.estado !== 'Sin marcar') return
            const hora = new Intl.DateTimeFormat('es-PE', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }) .format(new Date())

            establecerRegistros((actuales) =>
                actuales.map((registro) =>
                    registro.voluntarioId === idVoluntarioActual
                        ? { ...registro, horaMarcada: hora, estado: 'Pendiente' }
                        : registro,
                ),
            )
            notificar.success('Asistencia marcada', { description: 'Registro actualizado en esta demostración. No se envió al servidor.' })
        }

        const validarAsistencia = (id : string) => {
            if (rolVista !== 'Director de proyecto') return
            establecerRegistros((actuales) =>
                actuales.map((registro) =>
                    registro.id === id
                        ? { ...registro, estado: 'Validada', observacion: undefined }
                        : registro,
                ),
            )
            notificar.success('Asistencia validada', { description: 'Cambio local de la demostración.' })
        }

        const observarAsistencia = (id: string, observacion: string) => {
            if (rolVista !== 'Director de proyecto' || !observacion.trim()) return
            establecerRegistros((actuales) =>
                actuales.map((registro) =>
                    registro.id === id ? { ...registro, estado: 'Observada', observacion } : registro,
                ),
            )
            notificar('Observación registrada', { description: 'El motivo queda visible en la ficha de asistencia de esta demo.' })
        }

        return (
            <EstructuraSGV rol={rolVista} alCambiarRol={establecerRolVista}>
                <Avisos position="bottom-right" closeButton toastOptions={{ style: { fontFamily: 'Poppins, sans-serif', background: '#ffffff', color: '#172432', border: '1px solid #dfe6eb', borderLeft: '4px solid #004373' } }} />
                <section aria-label="Control de demostración" className="tarjeta-sgv mb-5 p-4 md:mb-6 md:px-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#70818d]">Control de demostración</p>
                        <label className="flex items-center gap-3 text-sm font-medium text-[#405460]">
                            <input
                                type="checkbox"
                                checked={ventanaAbierta}
                                onChange={(evento) => establecerVentanaAbierta(evento.target.checked)}
                                className="size-4 accent-incubunt-azul"
                            />
                            Simular horario habilitado
                        </label>
                    </div>
                </section>

                {rolVista === 'Voluntario' && (
                    <VistaVoluntario
                        sesion={sesionDemostracion}
                        registro={registroVoluntario}
                        ventanaAbierta={ventanaAbierta}
                        alMarcar={marcarAsistencia}
                    />
                )}

                {rolVista === 'Director de proyecto' && (
                    <VistaDirector
                        sesion={sesionDemostracion}
                        registros={registros}
                        alValidar={validarAsistencia}
                        alObservar={observarAsistencia}
                    />
                )}

                {rolVista === 'Presidencia' && (
                    <VistaPresidencia sesion={sesionDemostracion} registros={registros}/>
                )}
            </EstructuraSGV>
        )
}

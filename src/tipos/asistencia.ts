export type RolVista = 'Voluntario' | 'Director de proyecto' | 'Presidencia'

export type EstadoAsistencia =
    | 'Sin marcar'
    | 'Pendiente'
    | 'Validada'
    | 'Observada'

export interface SesionAsistencia {
    id: string
    titulo: string
    proyecto: string
    tipo: 'Proyecto' | 'Capacitación'
    fecha: string
    horario: string
    modalidad: 'Presencial' | 'Virtual'
    responsable: string
}

export interface RegistroAsistencia {
    id: string
    voluntarioId: string
    apellidos: string
    nombres: string
    area: 'TI' | 'MKT' | 'LTK/FNZ' | 'PMO' | 'GTH'
    horaMarcada: string | null
    estado: EstadoAsistencia
    observacion?: string
}

import type { RegistroAsistencia, SesionAsistencia } from '../tipos/asistencia'

export const sesionDemostracion: SesionAsistencia = {
    id: 'ASI-SGV-001',
    titulo: 'Reunión semanal del proyecto SGV',
    proyecto: 'Sistema de Gestión del Voluntariado',
    tipo: 'Proyecto',
    fecha: '13 de octubre de 2026',
    horario: '19:00 - 20:30',
    modalidad: 'Virtual',
    responsable: 'Dirección del Proyecto SGV',
}

export const registrosIniciales: RegistroAsistencia[] = [
    {
        id: 'asis-001',
        voluntarioId: 'VOL-001',
        apellidos: 'Hitler',
        nombres: 'Adolf',
        area: 'TI',
        horaMarcada: '19:05',
        estado: 'Pendiente',
    },
    {
        id: 'asis-002',
        voluntarioId: 'VOL-002',
        apellidos: 'Le',
        nombres: 'Tongue',
        area: 'TI',
        horaMarcada: null,
        estado: 'Sin marcar',
    },
    {
        id: 'asis-003',
        voluntarioId: 'VOL-003',
        apellidos: 'El Bana',
        nombres: 'Nero',
        area: 'GTH',
        horaMarcada: '19:02',
        estado: 'Validada',
    },
    {
        id: 'asis-004',
        voluntarioId: 'VOL-004',
        apellidos: 'Estrella',
        nombres: 'Patricio',
        area: 'TI',
        horaMarcada: null,
        estado: 'Sin marcar',
        observacion: 'Confirmar el ingreso después de iniciado el horario.',
    },
    {
        id: 'asis-005',
        voluntarioId: 'VOL-005',
        apellidos: 'Freeman',
        nombres: 'Gordon',
        area: 'PMO',
        horaMarcada: '19:03',
        estado: 'Pendiente',
    },
]

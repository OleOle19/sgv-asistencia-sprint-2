import type { EstadoAsistencia } from '../tipos/asistencia'

const clasesPorEstado: Record<EstadoAsistencia, string> = {
    'Sin marcar': 'bg-slate-100 text-slate-600',
    Pendiente: 'bg-[#fff3d8] text-[#7a5200]',
    Validada: 'bg-emerald-50 text-emerald-700',
    Observada: 'bg-rose-50 text-rose-700',
}

export function InsigniaEstado({ estado }: { estado: EstadoAsistencia }) {
    return (
        <span
            className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold
                ${clasesPorEstado[estado]}`}
        >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
            {estado}
        </span>
    )
}

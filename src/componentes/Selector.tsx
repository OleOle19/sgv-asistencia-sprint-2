import * as SelectorPrimitivo from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'

interface PropiedadesSelector {
  valor: string
  alCambiarValor: (valor: string) => void
  etiqueta: string
  opciones: string[]
}

export function Selector({ valor, alCambiarValor, etiqueta, opciones }: PropiedadesSelector) {
  return (
    <SelectorPrimitivo.Root value={valor} onValueChange={alCambiarValor}>
      <SelectorPrimitivo.Trigger aria-label={etiqueta}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-[#d6e0e7] bg-white px-3.5 text-left text-sm text-[#334554] outline-none transition hover:border-[#aebfca] focus-visible:ring-3 focus-visible:ring-[#004373]/10">
        <SelectorPrimitivo.Value />
        <SelectorPrimitivo.Icon><ChevronDown className="size-4 text-[#71808d]" /></SelectorPrimitivo.Icon>
      </SelectorPrimitivo.Trigger>
      <SelectorPrimitivo.Portal>
        <SelectorPrimitivo.Content position="popper" sideOffset={6}
          className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-[#d6e0e7] bg-white p-1.5 shadow-xl">
          <SelectorPrimitivo.Viewport>
            {opciones.map((opcion) => (
              <SelectorPrimitivo.Item key={opcion} value={opcion}
                className="relative flex min-h-11 cursor-pointer select-none items-center rounded-lg py-2.5 pr-8 pl-3 text-sm text-[#334554] outline-none data-[highlighted]:bg-[#e8f2f8] data-[highlighted]:text-incubunt-azul">
                <SelectorPrimitivo.ItemText>{opcion}</SelectorPrimitivo.ItemText>
                <SelectorPrimitivo.ItemIndicator className="absolute right-2.5"><Check className="size-4" /></SelectorPrimitivo.ItemIndicator>
              </SelectorPrimitivo.Item>
            ))}
          </SelectorPrimitivo.Viewport>
        </SelectorPrimitivo.Content>
      </SelectorPrimitivo.Portal>
    </SelectorPrimitivo.Root>
  )
}

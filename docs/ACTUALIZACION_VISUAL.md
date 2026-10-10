# Interfaz SGV: componentes y verificación

## Criterios

El diseño utiliza azul #004373, amarillo #FFB025, Montserrat y Poppins. Se utiliza el isologo a color del paquete de marca, sin modificar sus píxeles ni su composición, dentro de una superficie blanca con espacio de protección. El recurso SVG permanece disponible como archivo alternativo.

La navegación es una propuesta local pendiente de la plantilla oficial. Los cambios visuales no sustituyen los requisitos de campos, orden, permisos simulados o secciones móviles.

## Orden de implementación

1. **Recursos y estilos:** `public/marca` y `src/estilos.css`. Las clases `cabecera-destacada`, `metrica-destacada` y `boton-sgv` definen superficies, jerarquía y estados de interacción. Se evita el desenfoque y se conserva la compensación de la barra de desplazamiento.
2. **Indicador circular:** `IndicadorCircular.tsx` dentro de la carpeta de componentes de interfaz. Recibe porcentaje, etiqueta y detalle. El perímetro es `2 * Math.PI * 58`; el desplazamiento del trazo representa la fracción que falta. Se limita el valor entre 0 y 100 y se proporciona un nombre accesible.
3. **Vistas:** las pantallas reciben valores calculados; el indicador no calcula asistencia ni decide permisos. Los estados tienen texto además del color.
4. **Interacción:** el directorio permite quitar filtros individualmente y seleccionar meses con ratón o teclado. En asistencia, Sonner confirma marcado, validación y observación como cambios locales; los estados de los registros siguen siendo la fuente de información persistente en pantalla.
5. **Movimiento:** se limita a entradas breves y barras de la gráfica. No se transforman los contenedores generales o el logo. Con `prefers-reduced-motion`, las animaciones y transiciones se desactivan.
6. **Pruebas:** compilar, revisar tipos y ejecutar las pruebas con el servidor de desarrollo activo. Las pruebas de navegador incluyen los nuevos controles y capturan las pantallas cuando las animaciones terminan.

## Dependencias

Los indicadores son SVG/CSS propios. Sonner se incorporó únicamente al sprint 2, siguiendo el patrón de notificaciones documentado por [shadcn/ui](https://ui.shadcn.com/docs/components/radix/sonner) y la [documentación de Sonner](https://sonner.emilkowal.ski/).

No se copió código de React Bits Pro ni se incorporaron Swapy o GSAP. Los filtros removibles aplican el patrón de [chips](https://namethatui.com/web/badge-chip-pill); no requieren instalar una biblioteca adicional.

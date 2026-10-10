# Herramientas de UI para SGV: qué aprovechar y cuándo

Revisión del 10 de octubre de 2026. Las recomendaciones son decisiones para esta demo, no nuevos requisitos del proyecto. Se revisaron documentación, catálogos y licencias públicas; no se compraron productos ni se auditó código de pago que no está disponible públicamente.

## 1. Primero: conservar lo que funciona

El sprint 1 es la referencia visual para barra lateral, barra superior, selector de rol, espaciado, tarjetas, filtros y botones. El sprint 2 conserva esa base y cambia únicamente el contenido de asistencia. No necesitamos instalar todas estas herramientas para conseguir consistencia.

El manual de INCUBUNT tiene prioridad sobre cualquier tema de ejemplo: azul #004373, amarillo #FFB025, Montserrat para títulos y Poppins para texto. El isologo mantiene composición, proporciones y espacio de protección. La versión monocromática actual se conserva sin efectos; el manual permite esta variante. Los estados funcionales conservan texto, además del color. No debe confundirse la restricción de colores del logo con una prohibición general de colores de estado.

## 2. shadcn/ui: la opción más útil para los módulos actuales

Es una forma de distribuir componentes cuyo código pasa al proyecto, no una biblioteca cerrada a la que solo se cambia un tema. Esto facilita adaptarlos, pero también deja en nuestro equipo la responsabilidad de mantener las modificaciones. Sus variables de tema permiten aplicar nuestra identidad. Fuentes: [introducción](https://ui.shadcn.com/docs), [temas](https://ui.shadcn.com/docs/theming).

### Aplicación concreta

- **Ahora:** usar el patrón de componentes pequeños y reutilizables para botón, tarjeta, insignia, selector, menú de roles y navegación móvil. Ya tenemos equivalentes propios con Radix y Tailwind; no hace falta sustituirlos solo por llevar el nombre shadcn.
- **Validación de asistencia:** mantener el selector de estado, el formulario de observación y la tabla existentes. Un [Dialog de Radix](https://ui.shadcn.com/docs/components/radix/dialog) sería una alternativa si el equipo solicita una observación modal; no aporta por sí solo una mejora frente al formulario actual.
- **Cuando llegue el backend:** estados vacíos, carga y errores; notificaciones de confirmación que no sustituyan errores persistentes del formulario. Un esqueleto de carga solo tiene sentido cuando realmente esperamos datos.
- **Cuando crezcan las listas:** valorar su [Data Table](https://ui.shadcn.com/docs/components/base/data-table) con TanStack para paginar, ordenar y controlar columnas. Cinco registros de prueba no justifican añadir todo ese mecanismo al sprint 2.

### Cómo incorporarlo sin romper SGV

Elegir componentes compatibles con las primitivas Radix ya usadas. No mezclar familias de primitivas o ejecutar una inicialización que reemplace nuestros estilos sin revisar los cambios. Ajustar colores, tipografías y tamaños antes de importar diseños completos. La [licencia del proyecto es MIT](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md); conservar los avisos aplicables.

**Decisión:** primera candidata para componentes futuros. En este ajuste usamos nuestros propios componentes; no instalamos shadcn ni copiamos un dashboard de su catálogo.

## 3. Swapy: útil para reorganizar tarjetas, no para todo lo arrastrable

Swapy permite intercambiar elementos entre posiciones del diseño mediante arrastre. En React, los contenidos dinámicos requieren coordinar ese intercambio con el estado; su integración dinámica utiliza `manualSwap`. También se debe destruir la instancia al desmontar. Fuentes: [producto](https://swapy.tahazsh.com/), [React](https://swapy.tahazsh.com/docs/framework-react/), [React dinámico](https://swapy.tahazsh.com/docs/framework-react-dynamic/).

### Dónde sí podría servir

Un dashboard personalizable: mover tarjetas de horas, participación y actividades, guardar el orden por usuario y ofrecer «Restablecer distribución». Antes, el equipo debe pedir expresamente esa personalización.

### Dónde no lo pondría

En la ficha del voluntario, la tabla de asistencia o los filtros. Allí necesitamos posiciones predecibles, lectura consistente y controles que no inicien arrastres accidentalmente. Tampoco asumiría que intercambiar tarjetas resuelve un Kanban: mover una actividad de estado es una operación de negocio, con permisos y persistencia, no solo una posición visual.

Si se adopta, habría que separar el asa de arrastre de botones y campos, probar móvil y ofrecer botones para mover las tarjetas. La alternativa debe funcionar con un solo puntero, además de teclado; [WCAG sobre arrastre](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) explica esa distinción.

**Licencia importante:** [Swapy ofrece GPLv3 o licencia comercial](https://swapy.tahazsh.com/license/). No es MIT. Antes de distribuirlo integrado hay que revisar las obligaciones y la licencia del proyecto; que SGV esté en GitHub público no resuelve automáticamente esa compatibilidad.

**Decisión:** guardar como posibilidad para un dashboard futuro, no incorporarlo a estos entregables.

## 4. React Bits Pro: catálogo útil, pero con una restricción relevante

Su catálogo no es únicamente de efectos: incluye también estructura de aplicaciones, dashboards, tablas, filtros y formularios. La [documentación de instalación](https://pro.reactbits.dev/docs/installation) describe el acceso mediante licencia y registro. Los ejemplos públicos permiten estudiar composiciones, pero no confirman por sí solos accesibilidad, rendimiento o calidad del código completo.

La [licencia de React Bits Pro](https://pro.reactbits.dev/license) es individual y restringe publicar el producto o partes sustanciales como código reutilizable en repositorios públicos. El despliegue de un producto final no equivale a publicar las fuentes licenciadas. Tampoco hay que asumir que una licencia personal cubre automáticamente a los tres miembros del equipo.

### Recomendación para nuestro caso

Como este prototipo se comparte y el usuario indicó que el repositorio es público, **no incorporar código Pro sin aclarar primero la licencia del equipo y la publicación de fuentes**. Estudiar un patrón visual no significa que debamos copiar su implementación o sus recursos.

Para una futura web institucional, una portada o una presentación interactiva, algunos recursos podrían tener sentido con licencia adecuada. En una pantalla operativa de asistencia no añadiría cursores especiales, efectos 3D ni animaciones de gran tamaño: no ayudan a validar registros. No modificaría el isologo para producir un efecto visual.

React Bits gratuito y React Bits Pro no deben tratarse como si compartieran automáticamente la misma licencia: verificar cada recurso elegido.

**Decisión:** referencia secundaria, sin integración de código de pago en el proyecto actual.

## 5. GSAP Scroll: reservar para una página que realmente necesite narración

[ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) conecta animaciones con el desplazamiento y permite fijar secciones o sincronizar el progreso. [ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/) añade suavizado y efectos; su documentación advierte sobre elementos fijos dentro de contenido transformado. Esto exige revisar nuestra barra lateral, cabecera y menús, no añadirlo como un adorno global.

### Aplicación razonable

Una futura página pública para explicar programas, impacto o etapas de un proyecto. No lo usaría para desplazar lentamente la tabla, fijar formularios o hacer que el usuario espere una animación antes de trabajar.

Para los sprints actuales bastan transiciones discretas en botones y foco. Si se incorpora GSAP en React, usar una integración que limpie animaciones al desmontar, como la descrita en su [guía de React](https://gsap.com/resources/React/), y respetar la preferencia de movimiento reducido.

Su [licencia estándar](https://gsap.com/community/standard-license/) permite usos comerciales sin cargo bajo sus condiciones; no debe describirse como MIT ni como ausencia de obligaciones.

**Decisión:** no necesario para ficha, filtros o asistencia; posible en una web institucional futura.

## 6. Name That UI: muy útil para hablar el mismo idioma

[Name That UI](https://namethatui.com/) es un diccionario visual de patrones, no un paquete de componentes para instalar. Ayuda a redactar tareas de ClickUp y a explicar qué comportamiento necesitamos.

Ejemplos aplicables a SGV:

- [Popover, dropdown y tooltip](https://namethatui.com/web/popover-dropdown-tooltip): el selector de roles es un menú de opciones, no un tooltip; una ayuda breve no debe alojar acciones imprescindibles.
- [Badge, chip y pill](https://namethatui.com/web/badge-chip-pill): la insignia «Pendiente» comunica un estado; un filtro removible es interactivo. Tener forma redondeada no hace equivalentes esos controles.
- [Skeleton y spinner](https://namethatui.com/web/skeleton-spinner): si conocemos la estructura del contenido que falta, reservamos ese espacio; no mostramos carga ficticia ni dejamos una espera indefinida sin error o recuperación.

**Decisión:** utilizar desde ahora como referencia de vocabulario y comportamiento. No añade dependencias ni cambia la marca.

## 7. Laws of UX: aplicar criterios, no convertirlos en mandamientos

[Laws of UX en español](https://lawsofux.com/es/) reúne principios para razonar sobre una interfaz. No sustituye el manual, las reglas de negocio ni las pruebas con usuarios.

| Principio | Aplicación concreta en SGV |
| --- | --- |
| [Jakob](https://lawsofux.com/es/ley-de-jakob/) | Conservar navegación, selector de roles y posición de acciones entre sprints. Es el principal motivo para esta armonización. |
| [Fitts](https://lawsofux.com/es/ley-de-fitts/) | Controles cómodos, sin objetivos diminutos ni botones pegados que causen errores. Usamos 44 px como criterio del proyecto, no como cifra impuesta por esta ley. |
| [Hick](https://lawsofux.com/es/ley-de-hick/) | Priorizar filtros frecuentes y dejar los secundarios en «Más», sin esconder requisitos importantes. |
| Región común | Agrupar sesión, registro, filtros y acciones mediante tarjetas claras. No rodear cada texto de una tarjeta distinta. |
| [Doherty](https://lawsofux.com/es/umbral-de-doherty/) | Dar respuesta perceptible a las acciones y mostrar estados de espera reales. No es una medición de rendimiento de esta demo ni una excusa para añadir pausas. |

Precauciones: Miller no significa que cada pantalla solo pueda tener siete elementos; Postel no justifica aceptar DNI ambiguos, datos inválidos o permisos incorrectos. La consistencia no obliga a que dos tareas distintas tengan el mismo contenido, sino a que sus controles y estructura se comporten de forma reconocible.

## 8. Orden de adopción recomendado

1. Consolidar el pequeño conjunto de componentes que ya tenemos y verificarlo en escritorio y móvil.
2. Al recibir una tarea, identificar qué patrón falta; usar Name That UI para nombrarlo y shadcn como primera referencia técnica.
3. Adaptar ese componente al manual antes de integrarlo. Probar teclado, estados vacíos, errores y desbordamientos.
4. Solo introducir TanStack, arrastre o animación si un requisito concreto lo necesita.
5. Revisar licencia, mantenimiento, publicación del código y colaboración antes de elegir componentes comerciales.

## 9. Qué se hizo en esta revisión

Se armonizó el sprint 2 con el sprint 1 mediante componentes propios de React, TypeScript, Tailwind, Radix y Lucide. Se añadió navegación móvil, un selector de estado coherente y estados vacíos. Se mantuvieron datos y lógica de asistencia. No se instalaron Swapy, React Bits Pro, GSAP o shadcn; las nuevas primitivas Radix cubren menú móvil y selector. La validación automática comprueba los tres roles en escritorio, tableta y móvil; no equivale a una auditoría completa de accesibilidad.

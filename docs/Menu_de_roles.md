# Cambio de roles — continuidad con el Sprint 1

El selector de botones de la guía PDF se sustituyó por un menú en la esquina superior derecha. El control del horario sigue en la pantalla. La lógica de asistencia no cambia.

## 1. Dependencia

Desde la raíz del Sprint 2:

```powershell
npm install @radix-ui/react-dropdown-menu@2.1.24
```

Ya está instalada y registrada en los archivos de dependencias.

## 2. Aplicacion.tsx

En `src/Aplicacion.tsx`, la estructura recibe el rol actual y su función de actualización:

```tsx
<EstructuraSGV rol={rolVista} alCambiarRol={establecerRolVista}>
```

Se eliminó la constante de roles y el bloque de botones que ejecutaba `roles.map`. Los tres bloques condicionales de las vistas y el estado `rolVista` se conservan.

## 3. EstructuraSGV.tsx

En `src/componentes/EstructuraSGV.tsx`, se añadieron las propiedades:

```tsx
rol: RolVista
alCambiarRol: (rol: RolVista) => void
```

El menú usa los componentes de Radix:

- `Root`: mantiene abierto/cerrado el menú.
- `Trigger`: muestra el avatar, “Usuario demo” y el rol actual.
- `Portal` y `Content`: muestran las opciones sobre el resto de la pantalla.
- `RadioGroup`: recibe `value={rol}` y llama a `alCambiarRol` al elegir.
- `RadioItem`: representa cada rol y resalta el seleccionado.

Las opciones siguen siendo Voluntario, Director de proyecto y Presidencia. El menú permite navegación con teclado y cierre con Escape.

## 4. estilos.css

Se reserva el espacio de la barra de desplazamiento y se evita que el menú lo descuente dos veces:

```css
html {
    scrollbar-gutter: stable;
}

html body[data-scroll-locked] {
    margin-right: 0 !important;
}
```

## 5. Verificación

```powershell
npm run build
npm run lint
npm run dev
```

Abre el menú de usuario, cambia de rol y comprueba que la observación o validación de un registro se conserve entre las vistas. Presidencia sigue siendo de solo lectura.

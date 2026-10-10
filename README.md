# SGV — Vista de Formato de Asistencia (Sprint 2)

Demo local con React, TypeScript, Vite, Tailwind, Radix y Lucide. Los roles son simulados y los datos están en memoria; no hay conexión a backend ni autorización real.

## Ejecutar en otra computadora

Instala Node.js 22.12 o superior compatible con Vite 8 y Git. Después:

```powershell
git clone https://github.com/OleOle19/sgv-asistencia-sprint-2.git
cd sgv-asistencia-sprint-2
npm ci
npm run dev -- --port 5174
```

Abre `http://localhost:5174`. El repositorio es privado: necesitas acceso autorizado para clonarlo. No requiere claves, base de datos ni archivo `.env`.

## Cambios y pruebas

Consulta [la guía de continuidad visual](docs/Guia_Continuidad_Visual.md) para recorrer los cambios en orden. Mantiene la estructura del sprint 1 y adapta únicamente el contenido de asistencia.

Con el servidor activo en el puerto 5174, `npm run prueba:funcional` verifica las vistas y genera capturas. El resto de verificaciones son `npm run build` y `npm run lint`.

## Ubicación del proyecto SGV

El proyecto ahora se ejecuta directamente desde `Vista de Formato de Asistencia (Sprint 2)`.
La carpeta `aplicacion` ya no existe: su contenido se movió a esta raíz, sin eliminar código ni documentos.

En esta carpeta ejecuta `npm run dev`. Para verificar el código, utiliza `npm run build` y `npm run lint`.

La guía PDF original utiliza rutas con el prefijo `aplicacion/`; omite ese prefijo.
Por ejemplo, `aplicacion/src/Aplicacion.tsx` ahora es `src/Aplicacion.tsx`.

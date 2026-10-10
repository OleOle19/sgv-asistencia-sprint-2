import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import './estilos.css'
import { Aplicacion } from './Aplicacion'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Aplicacion />
  </StrictMode>,
)
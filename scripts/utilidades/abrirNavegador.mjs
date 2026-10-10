import { access } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-core'

const rutasConocidas = [
  process.env.NAVEGADOR_EJECUTABLE,
  process.env['PROGRAMFILES(X86)'] && path.join(process.env['PROGRAMFILES(X86)'], 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
  process.env.PROGRAMFILES && path.join(process.env.PROGRAMFILES, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
  process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
  process.env.PROGRAMFILES && path.join(process.env.PROGRAMFILES, 'Google', 'Chrome', 'Application', 'chrome.exe'),
].filter(Boolean)

async function encontrarNavegador() {
  for (const ruta of rutasConocidas) {
    try {
      await access(ruta)
      return ruta
    } catch {
      // Probamos la siguiente instalación conocida.
    }
  }

  throw new Error(
    'No se encontró Edge o Chrome. Define NAVEGADOR_EJECUTABLE con la ruta del navegador.',
  )
}

export async function abrirNavegador() {
  return chromium.launch({
    executablePath: await encontrarNavegador(),
    headless: true,
  })
}

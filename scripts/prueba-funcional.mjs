import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { abrirNavegador } from './utilidades/abrirNavegador.mjs'

const navegador = await abrirNavegador()
const capturas = new URL('../docs/capturas/', import.meta.url)
await mkdir(capturas, { recursive: true })

try {
  for (const ancho of [1440, 900, 390]) {
    const pagina = await navegador.newPage({ viewport: { width: ancho, height: 1000 } })
    const errores = []
    pagina.on('pageerror', (error) => errores.push(error.message))
    await pagina.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' })
    const seleccionarRol = async (rol) => {
      const anchoAnterior = await pagina.locator('#root').evaluate((elemento) => elemento.getBoundingClientRect().width)
      await pagina.getByRole('button', { name: /Cambiar rol simulado/ }).click()
      assert.equal(await pagina.locator('#root').evaluate((elemento) => elemento.getBoundingClientRect().width), anchoAnterior)
      await pagina.getByRole('menuitemradio', { name: rol, exact: true }).click()
    }
    const dimensiones = await pagina.evaluate(() => ({
      alturaCabecera: document.querySelector('header').getBoundingClientRect().height,
      anchoLateral: document.querySelector('aside').getBoundingClientRect().width,
    }))
    assert.equal(dimensiones.alturaCabecera, 72)
    if (ancho >= 1024) assert.equal(dimensiones.anchoLateral, 244)
    if (ancho < 1024) {
      const abrirMenu = pagina.getByRole('button', { name: 'Abrir menú', exact: true })
      await abrirMenu.click()
      await pagina.getByRole('dialog', { name: 'Navegación de SGV' }).waitFor()
      await pagina.keyboard.press('Escape')
      await pagina.getByRole('dialog').waitFor({ state: 'hidden' })
      assert.equal(await abrirMenu.evaluate((elemento) => document.activeElement === elemento), true)
    }
    const tamaño = ancho === 1440 ? 'escritorio' : ancho === 900 ? 'tableta' : 'movil'
    for (const rol of ['Voluntario', 'Director de proyecto', 'Presidencia']) {
      await seleccionarRol(rol)
      assert.equal(await pagina.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, `Desbordamiento: ${rol}, ${ancho}px`)
      assert.equal(await pagina.locator('main').evaluate((elemento) => getComputedStyle(elemento).fontFamily.includes('Poppins')), true)
      assert.equal(await pagina.locator('h2').evaluate((elemento) => getComputedStyle(elemento).fontFamily.includes('Montserrat')), true)
      const efectos = await pagina.locator('main section').first().locator('div')
        .evaluateAll((elementos) => elementos.map((elemento) => getComputedStyle(elemento).backdropFilter))
      assert.ok(efectos.every((efecto) => efecto === 'none'))
      if (rol === 'Presidencia') assert.equal(await pagina.getByRole('button', { name: 'Validar', exact: true }).count(), 0)
      await pagina.getByRole('heading', { name: 'Asistencia', exact: true }).click()
      await pagina.evaluate(() => Promise.all(document.getAnimations().map((animacion) => animacion.finished.catch(() => {}))))
      await pagina.screenshot({ path: fileURLToPath(new URL(`${rol.split(' ')[0].toLowerCase()}-${tamaño}.png`, capturas)), fullPage: true })
      if (rol === 'Director de proyecto') {
        const botonObservar = pagina.getByRole('button', { name: 'Observar', exact: true }).first()
        const anchoAntes = await pagina.locator('#root').evaluate((elemento) => elemento.getBoundingClientRect().width)
        await botonObservar.click()
        const dialogo = pagina.getByRole('dialog', { name: 'Observar asistencia' })
        await dialogo.waitFor()
        const campoMotivo = dialogo.getByLabel('Motivo de la observación', { exact: true })
        assert.equal(await campoMotivo.evaluate((elemento) => document.activeElement === elemento), true)
        assert.equal(await pagina.locator('#root').evaluate((elemento) => elemento.getBoundingClientRect().width), anchoAntes)
        await campoMotivo.fill('   ')
        assert.equal(await dialogo.getByRole('button', { name: 'Guardar observación' }).isDisabled(), true)
        await campoMotivo.fill('Confirmar la hora registrada')
        await pagina.evaluate(() => Promise.all(document.getAnimations().map((animacion) => animacion.finished.catch(() => {}))))
        const limites = await dialogo.boundingBox()
        assert.ok(limites && limites.x >= 0 && limites.x + limites.width <= ancho)
        await pagina.screenshot({ path: fileURLToPath(new URL(`observacion-${tamaño}.png`, capturas)) })
        await pagina.keyboard.press('Escape')
        await dialogo.waitFor({ state: 'hidden' })
        assert.equal(await botonObservar.evaluate((elemento) => document.activeElement === elemento), true)
        await pagina.emulateMedia({ reducedMotion: 'reduce' })
        await botonObservar.click()
        await dialogo.waitFor()
        assert.equal(await campoMotivo.inputValue(), '')
        assert.equal(await dialogo.evaluate((elemento) => getComputedStyle(elemento).animationName), 'none')
        await dialogo.getByRole('button', { name: 'Cancelar', exact: true }).click()
        await dialogo.waitFor({ state: 'hidden' })
        await pagina.emulateMedia({ reducedMotion: 'no-preference' })
      }
    }
    assert.deepEqual(errores, [])
    await pagina.close()
  }

  const pagina = await navegador.newPage({ viewport: { width: 1440, height: 1000 } })
  await pagina.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' })
  const seleccionarRol = async (rol) => {
    await pagina.getByRole('button', { name: /Cambiar rol simulado/ }).click()
    await pagina.getByRole('menuitemradio', { name: rol, exact: true }).click()
  }
  await seleccionarRol('Director de proyecto')
  await pagina.getByRole('combobox', { name: 'Estado', exact: true }).click()
  await pagina.getByRole('option', { name: 'Observada', exact: true }).click()
  await pagina.getByText('No hay registros en este estado', { exact: true }).waitFor()
  await pagina.getByRole('combobox', { name: 'Estado', exact: true }).click()
  await pagina.getByRole('option', { name: 'Todos', exact: true }).click()
  const fila = pagina.locator('tbody tr').filter({ hasText: 'Hitler' })
  await fila.getByRole('button', { name: 'Observar', exact: true }).click()
  await pagina.getByLabel('Motivo de la observación', { exact: true }).fill('Confirmar asistencia')
  await pagina.getByRole('button', { name: 'Guardar observación' }).click()
  await pagina.getByRole('dialog', { name: 'Observar asistencia' }).waitFor({ state: 'hidden' })
  assert.equal(await pagina.getByRole('combobox', { name: 'Estado', exact: true }).evaluate((elemento) => document.activeElement === elemento), true)
  await pagina.locator('[data-sonner-toast]').getByText('Observación registrada', { exact: true }).waitFor()
  await fila.getByText('Observada', { exact: true }).waitFor()
  const otraFila = pagina.locator('tbody tr').filter({ hasText: 'Freeman' })
  await otraFila.getByRole('button', { name: 'Validar', exact: true }).click()
  await pagina.locator('[data-sonner-toast]').getByText('Asistencia validada', { exact: true }).waitFor()
  await otraFila.getByText('Validada', { exact: true }).waitFor()
  await seleccionarRol('Voluntario')
  await pagina.getByText('Observación: Confirmar asistencia', { exact: true }).waitFor()
  await seleccionarRol('Presidencia')
  assert.equal(await pagina.getByRole('button', { name: 'Validar', exact: true }).count(), 0)
  await pagina.close()
  console.log('Correcto: 3 roles en escritorio/tableta/móvil, navegación accesible, filtros, estados y continuidad visual.')
} finally {
  await navegador.close()
}

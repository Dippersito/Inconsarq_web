import { test, expect } from '@playwright/test';

const DOMINIO = 'https://www.inconsarq.com';

const PAGINAS = [
  { ruta: '/', titulo: /^INCONSARQ — Ingeniería, Construcción y Arquitectura/, h1: 'INCONSARQ' },
  { ruta: '/nosotros', titulo: /^Nosotros — INCONSARQ/, h1: 'Nuestra Historia' },
  { ruta: '/servicios', titulo: /^Servicios — INCONSARQ/, h1: 'Nuestros Servicios' },
  { ruta: '/contacto', titulo: /^Contacto — INCONSARQ/, h1: 'Hablemos de tu Proyecto' },
];

// Errores de consola o de red de la propia página (los de terceros no cuentan)
const vigilarErrores = (page, host) => {
  const errores = [];
  page.on('pageerror', (e) => errores.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errores.push(`console: ${m.text()}`);
  });
  page.on('response', (r) => {
    if (new URL(r.url()).host === host && r.status() >= 400) errores.push(`${r.status()} ${r.url()}`);
  });
  return errores;
};

// El sitio propio es el host bajo prueba (localhost o el dominio publicado);
// Vercel puede sumar su script de analítica, que no es un tercero.
const esPropio = (url, host) => url.host === host || url.pathname.startsWith('/_vercel/');

for (const p of PAGINAS) {
  test.describe(`Página ${p.ruta}`, () => {
    test('carga sin errores, con su título, un solo h1 y su canonical', async ({ page, baseURL }) => {
      const errores = vigilarErrores(page, new URL(baseURL).host);
      await page.goto(p.ruta);

      await expect(page).toHaveTitle(p.titulo);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(p.h1.split(' ')[0]);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      await expect(canonical).toHaveAttribute('href', `${DOMINIO}${p.ruta}`);

      const descripcion = page.locator('meta[name="description"]');
      await expect(descripcion).toHaveCount(1);
      const contenido = await descripcion.getAttribute('content');
      expect(contenido.length).toBeGreaterThan(80);
      expect(contenido.length).toBeLessThanOrEqual(170);

      await page.waitForLoadState('networkidle');
      expect(errores).toEqual([]);
    });

    test('no pide recursos a servidores de terceros al cargar', async ({ page, baseURL }) => {
      const host = new URL(baseURL).host;
      const externos = [];
      page.on('request', (r) => {
        const url = new URL(r.url());
        if (url.protocol.startsWith('http') && !esPropio(url, host)) externos.push(r.url());
      });
      await page.goto(p.ruta);
      await page.waitForLoadState('networkidle');
      expect(externos).toEqual([]);
    });
  });
}

test('una ruta inexistente redirige al inicio (sin pantalla en blanco)', async ({ page }) => {
  await page.goto('/esta-pagina-no-existe');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('h1')).toContainText('INCONS');
});

test('la tipografía Inter se carga desde el propio sitio', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const cargada = await page.evaluate(() =>
    [...document.fonts].some((f) => f.family.includes('Inter') && f.status === 'loaded')
  );
  expect(cargada).toBe(true);
});

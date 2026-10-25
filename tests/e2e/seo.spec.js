import { test, expect } from '@playwright/test';

// Lo que leen los buscadores y las redes SIN ejecutar JavaScript: se revisa el
// HTML tal como llega del servidor, no el DOM ya renderizado por React.
const DOMINIO = 'https://www.inconsarq.com';
const RUTAS = ['/', '/nosotros', '/servicios', '/contacto'];

test.describe('SEO estático', () => {
  test.skip(({ isMobile }) => isMobile, 'no depende del dispositivo');

  test('Open Graph y Twitter apuntan al dominio canónico', async ({ request }) => {
    const html = await (await request.get('/')).text();
    const meta = (prop) => html.match(new RegExp(`(?:property|name)="${prop}" content="([^"]+)"`))?.[1];

    expect(meta('og:url')).toBe(`${DOMINIO}/`);
    expect(meta('og:image')).toBe(`${DOMINIO}/og-image.jpg`);
    expect(meta('twitter:image')).toBe(`${DOMINIO}/og-image.jpg`);
    expect(meta('og:image:width')).toBe('1200');
    expect(meta('og:image:height')).toBe('630');
    // Ninguna URL absoluta al dominio sin www (Vercel lo redirige)
    expect(html).not.toMatch(/https:\/\/inconsarq\.com/);
  });

  test('la imagen social existe y pesa menos de 300 KB', async ({ request }) => {
    const r = await request.get('/og-image.jpg');
    expect(r.status()).toBe(200);
    expect((await r.body()).length).toBeLessThan(300 * 1024);
  });

  test('los datos estructurados (JSON-LD) son válidos y describen la empresa', async ({ request }) => {
    const html = await (await request.get('/')).text();
    const bloque = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
    const datos = JSON.parse(bloque);
    const empresa = datos['@graph'].find((n) => n['@type'] === 'GeneralContractor');
    const sitio = datos['@graph'].find((n) => n['@type'] === 'WebSite');

    expect(empresa.url).toBe(`${DOMINIO}/`);
    expect(empresa.address.addressLocality).toBe('Cerro Colorado');
    expect(empresa.email).toBe('comercial@inconsarq.com');
    expect(empresa.hasOfferCatalog.itemListElement.length).toBe(9);
    expect(sitio.publisher['@id']).toBe(empresa['@id']);

    const logo = await request.get(empresa.logo.url.replace(DOMINIO, ''));
    expect(logo.status()).toBe(200);
  });

  test('sitemap.xml usa el namespace estándar y lista las 4 páginas en www', async ({ request }) => {
    const r = await request.get('/sitemap.xml');
    expect(r.status()).toBe(200);
    const xml = await r.text();
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(RUTAS.map((ruta) => `${DOMINIO}${ruta}`));
    expect(xml).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  });

  test('robots.txt permite indexar y anuncia el sitemap', async ({ request }) => {
    const txt = await (await request.get('/robots.txt')).text();
    expect(txt).toContain('Allow: /');
    expect(txt).toContain(`Sitemap: ${DOMINIO}/sitemap.xml`);
  });
});

test('al navegar dentro del sitio cambian el título y el canonical', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'Servicios' }).click();
  } else {
    await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Servicios' }).click();
  }
  await expect(page).toHaveURL(/\/servicios$/);
  await expect(page).toHaveTitle(/^Servicios — INCONSARQ/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${DOMINIO}/servicios`);
});

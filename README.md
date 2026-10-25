# inconsarq.com

Sitio corporativo de **INCONSARQ — Ingeniería, Construcción y Arquitectura** (Arequipa, Perú).
Lo mantiene COREM Labs bajo contrato de mantenimiento mensual.

- **Stack:** React 19 + Vite 7 (SPA), React Router 7, framer-motion, CSS Modules, EmailJS.
- **Deploy:** Vercel publica la rama `main`. El dominio que sirve es `https://www.inconsarq.com`
  (Vercel redirige `inconsarq.com` → `www`).

## Comandos

```bash
npm install            # usa el registro público de npm (.npmrc del proyecto)
npm run dev            # servidor de desarrollo
npm run lint           # ESLint (incluye reglas de accesibilidad jsx-a11y)
npm run build          # build de producción en dist/
npm run preview        # sirve dist/ como lo haría Vercel
npm run test:e2e       # pruebas end-to-end (requiere un build previo)
npm run optimize:images  # convierte las imágenes nuevas de src/assets a WebP
```

## Variables de entorno

Copiar `.env.example` como `.env`. Son las tres claves de EmailJS del formulario de contacto;
en Vercel van en *Project Settings → Environment Variables*. Sin ellas el sitio funciona y el
formulario muestra el correo y WhatsApp como alternativa.

## Estructura

```
src/
  config/site.js       datos del negocio (teléfono, correo, dirección, dominio) — una sola fuente
  config/services.js   catálogo de servicios (página Servicios + formulario de contacto)
  components/          Layout (navbar, footer, WhatsApp), Seo, UI, animaciones
  pages/<Página>/      cada página con sus componentes y estilos (CSS Modules)
  assets/              imágenes; los .png/.jpg originales son la fuente de los .webp
  assets/fondos/       fondos de sección (versión escritorio y -movil)
public/                favicon, imagen social (og-image.jpg), sitemap.xml, robots.txt, firma/
scripts/               optimize-images.mjs y el generador de firmas de correo (firma-correo/)
tests/e2e/             pruebas Playwright
```

## SEO — reglas que no hay que romper

- **Dominio canónico = `https://www.inconsarq.com`.** Está en `src/config/site.js`, en las
  etiquetas Open Graph y el JSON-LD de `index.html`, en `public/sitemap.xml` y en
  `public/robots.txt`. Si cambia, cambiar los cuatro.
- **Open Graph / Twitter van estáticos en `index.html`:** WhatsApp, Facebook y X no ejecutan
  JavaScript. Título, descripción y canonical sí van por página con `<Seo>`.
- **Al agregar o renombrar un servicio:** editar `src/config/services.js` y el catálogo del
  JSON-LD en `index.html`.
- Al agregar una página: ruta en `App.jsx`, `<Seo>` en la página y su URL en `sitemap.xml`.

## Imágenes

- Imagen nueva: dejar el original en `src/assets/` y correr `npm run optimize:images`; importar
  el `.webp`. El script **no** pisa los `.webp` existentes y conserva el original a propósito.
- Fondos grandes: generar también una versión `-movil` (960 px) y usarla en el `@media` de
  celular del CSS de la sección.
- Los fondos de `assets/fondos/` son fotos de Unsplash (licencia libre, sin atribución
  obligatoria) descargadas y optimizadas: antes se cargaban desde los servidores de Unsplash.
  IDs: `photo-1503387762-592deb58ef4e` (planos), `photo-1486406146926-c627a92ad1ab` (edificios),
  `photo-1504307651254-35680f356dfd` (obra), `photo-1541888946425-d81bb19240f5` (obra, servicios).

## Pruebas end-to-end

```bash
npm run build && npm run test:e2e
```

Cubren las 4 páginas en escritorio (1440 px), tablet (768 px) y celular (Pixel 7): títulos, canonical y
descripción por página, SEO estático (Open Graph, JSON-LD, sitemap, robots), que no se carguen
recursos de terceros, menú (incluido Escape en celular), enlace "Saltar al contenido",
carrusel, formulario (validación, envío, error y honeypot — EmailJS siempre interceptado, nunca
se envía un correo real), barrido de toques y una auditoría WCAG 2.1 AA con axe-core.

Usan el Chrome instalado (`channel: 'chrome'`). Sin Chrome: `npx playwright install chromium`
y `PW_CHANNEL=chromium`.

**Prueba de humo después de cada deploy** (contra el sitio publicado, sin servidor local):

```bash
E2E_BASE_URL=https://www.inconsarq.com npx playwright test
```

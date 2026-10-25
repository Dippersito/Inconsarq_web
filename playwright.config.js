import { defineConfig, devices } from '@playwright/test';

/**
 * Pruebas end-to-end (regresión) del sitio.
 *
 * Corren contra el build de producción servido por `vite preview`, no contra el
 * servidor de desarrollo: es lo más parecido a lo que publica Vercel.
 *
 *   npm run build && npm run test:e2e
 *
 * Usan el Chrome instalado en la máquina (channel: 'chrome'). Sin Chrome:
 * `npx playwright install chromium` y PW_CHANNEL=chromium.
 *
 * Prueba de humo contra el sitio publicado (después de cada deploy):
 *   E2E_BASE_URL=https://www.inconsarq.com npx playwright test
 * (no levanta servidor local; el formulario nunca envía correos reales porque
 * las llamadas a EmailJS se interceptan en las pruebas).
 */
const PORT = 4175;
const channel = process.env.PW_CHANNEL === 'chromium' ? undefined : 'chrome';
const baseURL = process.env.E2E_BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], channel, viewport: { width: 1440, height: 900 } } },
    { name: 'movil', use: { ...devices['Pixel 7'], channel } },
    // 768 px: el punto exacto donde el menú pasa a hamburguesa
    {
      name: 'tablet',
      use: { ...devices['Desktop Chrome'], channel, viewport: { width: 768, height: 1024 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npm run preview -- --port ${PORT} --strictPort`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});

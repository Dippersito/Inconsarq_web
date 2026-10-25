import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Auditoría automática WCAG 2.1 A/AA con axe-core en cada página.
// Se recorre la página antes de auditar para que las animaciones de entrada
// terminen (un texto a medio aparecer daría falsos errores de contraste).
const recorrer = async (page) => {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
};

for (const ruta of ['/', '/nosotros', '/servicios', '/contacto']) {
  test(`${ruta} no tiene violaciones WCAG 2.1 A/AA detectables`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(ruta);
    await page.waitForLoadState('networkidle');
    await recorrer(page);

    const resultado = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const resumen = resultado.violations.map(
      (v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).slice(0, 4).join(' | ')}`
    );
    expect(resumen).toEqual([]);
  });
}

import { test, expect } from '@playwright/test';

test.describe('Menú', () => {
  test('escritorio: enlaces sin subrayado y marca de página activa del ancho del enlace', async ({ page, isMobile }) => {
    test.skip(isMobile, 'el menú de escritorio está oculto en celular');
    await page.goto('/nosotros');
    const nav = page.getByRole('navigation', { name: 'Principal' });
    const activo = nav.getByRole('link', { name: 'Nosotros' });
    await expect(activo).toHaveAttribute('aria-current', 'page');

    const { decoracion, anchoEnlace, anchoMarca } = await activo.evaluate((el) => ({
      decoracion: getComputedStyle(el).textDecorationLine,
      anchoEnlace: el.getBoundingClientRect().width,
      anchoMarca: parseFloat(getComputedStyle(el, '::after').width),
    }));
    expect(decoracion).toBe('none');
    // Regresión: la línea naranja se estiraba hasta el borde de la pantalla
    expect(Math.abs(anchoMarca - anchoEnlace)).toBeLessThan(2);
  });

  test('celular: abre, Escape lo cierra y bloquea el scroll mientras está abierto', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'solo celular');
    await page.goto('/');
    const boton = page.getByRole('button', { name: 'Abrir menú' });
    await boton.click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).toBeHidden();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  });

  test('celular: un enlace del menú navega y cierra el menú', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'solo celular');
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'Contacto' }).click();
    await expect(page).toHaveURL(/\/contacto$/);
    await expect(page.locator('#mobile-menu')).toBeHidden();
  });
});

test('el enlace "Saltar al contenido" aparece con Tab y lleva al contenido', async ({ page, isMobile }) => {
  test.skip(isMobile, 'navegación por teclado');
  await page.goto('/');
  await page.keyboard.press('Tab');
  const salto = page.getByRole('link', { name: 'Saltar al contenido' });
  await expect(salto).toBeFocused();
  await expect(salto).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page.locator('main#contenido')).toBeFocused();
});

test.describe('Carrusel de especialidades (inicio)', () => {
  test('la imagen no tapa los controles ni el título del servicio', async ({ page }) => {
    await page.goto('/');
    const carrusel = page.locator('[class*="carouselWrapper"]');
    await carrusel.scrollIntoViewIfNeeded();

    // Regresión (celular): la foto medía 440 px dentro de una fila de 280 px
    // y quedaba encima de los puntos, las flechas y el título.
    const tapados = await carrusel.evaluate((wrap) => {
      const objetivos = [
        ...wrap.querySelectorAll('[class*="indicators"] button'),
        ...wrap.querySelectorAll('[class*="arrowBtns"] button'),
        wrap.querySelector('h3'),
      ];
      return objetivos
        .filter((el) => {
          el.scrollIntoView({ block: 'center', behavior: 'instant' });
          const r = el.getBoundingClientRect();
          const encima = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
          return !(el === encima || el.contains(encima));
        })
        .map((el) => el.getAttribute('aria-label') || el.textContent);
    });
    expect(tapados).toEqual([]);
  });

  test('los puntos tienen área de toque de al menos 24 px', async ({ page }) => {
    await page.goto('/');
    const puntos = page.locator('[class*="indicators"] button');
    await expect(puntos).toHaveCount(3);
    for (const caja of await puntos.evaluateAll((els) => els.map((e) => e.getBoundingClientRect().toJSON()))) {
      expect(caja.width).toBeGreaterThanOrEqual(24);
      expect(caja.height).toBeGreaterThanOrEqual(24);
    }
  });

  test('las flechas cambian de servicio', async ({ page }) => {
    await page.goto('/');
    const titulo = page.locator('[class*="carouselServiceTitle"]');
    await titulo.scrollIntoViewIfNeeded();
    const antes = await titulo.textContent();
    await page.getByRole('button', { name: 'Servicio siguiente' }).click();
    await expect(titulo).not.toHaveText(antes);
  });
});

test('página de Servicios: elegir un servicio muestra su detalle', async ({ page }) => {
  await page.goto('/servicios');
  const boton = page.getByRole('button', { name: 'Tuberías HDPE' });
  await boton.click();
  await expect(boton).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[class*="cardTitle"]')).toHaveText('Tuberías HDPE');
  await expect(page.getByText('Termofusión certificada')).toBeVisible();
});

// Barrido de toques: cada enlace y botón visible debe recibir el clic en su
// centro (que ninguna capa invisible lo tape). Se hace en las 4 páginas.
for (const ruta of ['/', '/nosotros', '/servicios', '/contacto']) {
  test(`barrido de toques en ${ruta}: ningún elemento interactivo queda tapado`, async ({ page }) => {
    await page.goto(ruta);
    await page.waitForLoadState('networkidle');
    const tapados = await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = 'auto';
      const sel = 'a[href], button, input:not([tabindex="-1"]), select, textarea';
      const res = [];
      for (const el of document.querySelectorAll(sel)) {
        if (el.closest('[aria-hidden="true"]') || el.classList.contains('skip-link')) continue;
        el.scrollIntoView({ block: 'center', behavior: 'instant' });
        await new Promise((r) => requestAnimationFrame(() => r()));
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue; // oculto en este tamaño
        const encima = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        if (encima && !(el === encima || el.contains(encima))) {
          // El botón flotante de WhatsApp puede pasar por encima al hacer scroll: se tolera
          if (encima.closest('a[aria-label="Contactar por WhatsApp"]')) continue;
          res.push(`${el.tagName} "${(el.getAttribute('aria-label') || el.textContent).trim().slice(0, 40)}" tapado por ${encima.tagName}.${encima.className}`);
        }
      }
      return res;
    });
    expect(tapados).toEqual([]);
  });
}

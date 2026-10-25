import { test, expect } from '@playwright/test';

// NUNCA se envía un correo real: toda llamada a EmailJS se intercepta.
const EMAILJS = '**/api.emailjs.com/**';

const llenarFormulario = async (page) => {
  await page.getByLabel('Nombre completo').fill('Prueba Automatizada');
  await page.getByLabel('Teléfono').fill('+51 900 000 000');
  await page.getByLabel('Correo electrónico').fill('prueba@ejemplo.com');
  await page.getByLabel('Servicio de interés').selectOption('Geosintéticos');
  await page.getByLabel('Mensaje').fill('Mensaje de prueba de la suite de regresión.');
};

test.describe('Formulario de contacto', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contacto');
  });

  test('vacío no se envía: el navegador marca los campos obligatorios', async ({ page }) => {
    let llamadas = 0;
    await page.route(EMAILJS, (route) => { llamadas++; return route.fulfill({ status: 200, body: 'OK' }); });

    await page.getByRole('button', { name: /Enviar Mensaje/i }).click();
    const valido = await page.locator('form').evaluate((f) => f.checkValidity());
    expect(valido).toBe(false);
    await expect(page.getByLabel('Nombre completo')).toBeFocused();
    expect(llamadas).toBe(0);
  });

  test('ofrece los 9 servicios del catálogo más "Otro"', async ({ page }) => {
    const lista = page.getByLabel('Servicio de interés').locator('option:not([disabled])');
    await expect(lista).toHaveCount(10);
    const opciones = await lista.allTextContents();
    expect(opciones[0]).toBe('Geosintéticos');
    expect(opciones.at(-1)).toBe('Otro');
  });

  test('completo se envía y muestra el mensaje de éxito', async ({ page }) => {
    let cuerpo = '';
    await page.route(EMAILJS, async (route) => {
      cuerpo = route.request().postData() || '';
      await route.fulfill({ status: 200, body: 'OK' });
    });

    await llenarFormulario(page);
    await page.getByRole('button', { name: /Enviar Mensaje/i }).click();

    const noConfigurado = page.getByText('El formulario aún no está configurado');
    const exito = page.getByRole('heading', { name: '¡Mensaje enviado!' });
    await expect(exito.or(noConfigurado)).toBeVisible();
    test.skip(await noConfigurado.isVisible(), 'build sin variables de EmailJS (.env)');

    await expect(exito).toBeFocused(); // el foco pasa al mensaje de éxito
    expect(cuerpo).toContain('Prueba Automatizada');
    expect(cuerpo).toContain('Geosintéticos');
  });

  test('si EmailJS falla, avisa y ofrece el correo directo', async ({ page }) => {
    await page.route(EMAILJS, (route) => route.fulfill({ status: 500, body: 'Error' }));
    await llenarFormulario(page);
    await page.getByRole('button', { name: /Enviar Mensaje/i }).click();
    const alerta = page.getByRole('alert');
    await expect(alerta).toBeVisible();
    await expect(alerta).toContainText(/comercial@inconsarq\.com/);
  });

  test('honeypot: si un bot llena el campo trampa, no se envía nada', async ({ page }) => {
    let llamadas = 0;
    await page.route(EMAILJS, (route) => { llamadas++; return route.fulfill({ status: 200, body: 'OK' }); });

    await llenarFormulario(page);
    await page.locator('input[name="website"]').fill('http://spam.example');
    await page.getByRole('button', { name: /Enviar Mensaje/i }).click();
    await expect(page.getByRole('heading', { name: '¡Mensaje enviado!' })).toBeVisible();
    expect(llamadas).toBe(0);
  });

  test('el campo trampa no se ve ni recibe foco con Tab', async ({ page }) => {
    const trampa = page.locator('input[name="website"]');
    await expect(trampa).not.toBeInViewport();
    await expect(trampa).toHaveAttribute('tabindex', '-1');
  });
});

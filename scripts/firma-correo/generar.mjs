/**
 * Genera las firmas de correo de INCONSARQ desde una sola fuente.
 *
 *   node scripts/firma-correo/generar.mjs
 *
 * Produce, por cada persona de `personas.mjs`:
 *   public/firma/<slug>.png              avatar circular optimizado (hospedado, lo usa el HTML)
 *   public/firma/logo.png                logo de marca sobre fondo oscuro (compartido)
 *   scripts/firma-correo/salida/<slug>.html   firma HTML — es la que se pega en Gmail/Outlook
 *   scripts/firma-correo/salida/<slug>.png    misma firma como imagen 2x (respaldo / uso en documentos)
 *
 * El HTML referencia los avatares por URL absoluta de inconsarq.com, así que los PNG de
 * `public/firma/` deben estar desplegados para que la firma se vea en el correo del receptor.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, statSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { firmaHTML } from './plantilla.mjs';
import { personas } from './personas.mjs';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../..');
const PUBLICO = path.join(RAIZ, 'public/firma');
const SALIDA = path.join(AQUI, 'salida');
const BASE_URL = 'https://inconsarq.com/firma';

const ANCHO = 672; // px CSS de la firma
const ESCALA = 2; // el PNG se renderiza a 2x para pantallas de alta densidad
const AVATAR = 192; // 96 px CSS a 2x
const LOGO_ANCHO = 268; // 134 px CSS a 2x

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find(existsSync);

const kb = (f) => (statSync(f).size / 1024).toFixed(1) + ' KB';
const url = (p) => 'file:///' + p.split(path.sep).join('/');

mkdirSync(PUBLICO, { recursive: true });
mkdirSync(SALIDA, { recursive: true });

/** Retrato recortado en círculo con el anillo terracota horneado en el píxel.
 *  Va horneado y no como `border-radius` porque Outlook de escritorio ignora
 *  los bordes redondeados y mostraría la foto cuadrada. */
async function generarAvatar(persona) {
  const S = AVATAR;
  const anillo = 3; // grosor del aro a esta escala
  const interior = S - anillo * 2;

  const rostro = await sharp(path.join(RAIZ, persona.avatarFuente))
    .extract(persona.recorte)
    .resize(interior, interior, { fit: 'cover' })
    .toBuffer();

  const mascara = Buffer.from(
    `<svg width="${interior}" height="${interior}"><circle cx="${interior / 2}" cy="${interior / 2}" r="${interior / 2}" fill="#fff"/></svg>`,
  );
  const aro = Buffer.from(
    `<svg width="${S}" height="${S}"><circle cx="${S / 2}" cy="${S / 2}" r="${S / 2 - anillo / 2}" fill="none" stroke="#c64d27" stroke-width="${anillo}"/></svg>`,
  );

  const circulo = await sharp(rostro).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
  const destino = path.join(PUBLICO, `${persona.slug}.png`);

  await sharp({ create: { width: S, height: S, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: circulo, left: anillo, top: anillo }, { input: aro, left: 0, top: 0 }])
    .png({ compressionLevel: 9, effort: 10, palette: true })
    .toFile(destino);

  return destino;
}

/** Logo sin la línea de subtítulo: a 134 px de ancho ese texto sería ilegible.
 *  y=220 es justo debajo de la barra terracota del logo normalizado a 600 px. */
async function generarLogo() {
  const destino = path.join(PUBLICO, 'logo.png');
  // Dos pasadas: sharp aplica un solo resize por pipeline, así que el recorte
  // necesita que el logo ya esté normalizado a 600 px de ancho.
  const normalizado = await sharp(path.join(RAIZ, 'src/assets/Nuevo_logo_202020.png'))
    .trim()
    .resize({ width: 600 })
    .png()
    .toBuffer();

  await sharp(normalizado)
    .extract({ left: 0, top: 0, width: 600, height: 220 })
    .resize({ width: LOGO_ANCHO })
    .png({ compressionLevel: 9, effort: 10, palette: true })
    .toFile(destino);
  return destino;
}

/** Rasteriza el mismo HTML de la firma y lo recorta a su altura real. */
async function generarPNG(persona, html) {
  if (!CHROME) {
    console.warn('  ! Chrome no encontrado: se omite el PNG (el HTML sí se generó)');
    return null;
  }
  const temporal = path.join(SALIDA, `.${persona.slug}.tmp.html`);
  const crudo = path.join(SALIDA, `.${persona.slug}.tmp.png`);
  const destino = path.join(SALIDA, `${persona.slug}.png`);

  writeFileSync(
    temporal,
    `<style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');html,body{margin:0;padding:0;background:#fff;}</style>\n${html}`,
  );

  execFileSync(
    CHROME,
    [
      '--headless=new', '--disable-gpu', '--hide-scrollbars',
      `--force-device-scale-factor=${ESCALA}`,
      `--window-size=${ANCHO},600`,
      '--default-background-color=FFFFFF',
      `--screenshot=${crudo}`,
      url(temporal),
    ],
    { stdio: 'ignore' },
  );

  // Buscar la última fila que no sea blanco puro: es el borde inferior de la firma.
  const { data, info } = await sharp(crudo).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let alto = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels;
      if (data[i] < 250 || data[i + 1] < 250 || data[i + 2] < 250) { alto = y; break; }
    }
  }

  await sharp(crudo)
    .extract({ left: 0, top: 0, width: ANCHO * ESCALA, height: alto + 1 })
    .png({ compressionLevel: 9 })
    .toFile(destino);

  rmSync(temporal);
  rmSync(crudo);
  return destino;
}

const logo = await generarLogo();
console.log(`logo.png            ${kb(logo)}`);

for (const persona of personas) {
  console.log(`\n${persona.nombre} ${persona.apellidos} — ${persona.cargo}`);

  const avatar = await generarAvatar(persona);
  console.log(`  ${persona.slug}.png (avatar)   ${kb(avatar)}`);

  const html = firmaHTML({
    ...persona,
    avatar: `${BASE_URL}/${persona.slug}.png`,
    logo: `${BASE_URL}/logo.png`,
  });
  const destinoHTML = path.join(SALIDA, `${persona.slug}.html`);
  writeFileSync(destinoHTML, html);
  console.log(`  ${persona.slug}.html          ${kb(destinoHTML)}`);

  // El PNG se rasteriza contra los archivos locales: las URLs públicas todavía
  // no existen hasta que se despliegue `public/firma/`.
  const png = await generarPNG(
    persona,
    firmaHTML({ ...persona, avatar: url(avatar), logo: url(logo) }),
  );
  if (png) console.log(`  ${persona.slug}.png (firma)    ${kb(png)}`);
}

/**
 * Convierte todas las imágenes PNG/JPG/JPEG de src/assets a WebP.
 * Mantiene los archivos originales (por seguridad y compatibilidad con OG/favicons).
 *
 * Uso:
 *   npm run optimize:images
 */
import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, parse, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

const ROOTS = ['src/assets'];
const SKIP_FILES = new Set(['react.svg', 'vite.svg']);
const VALID_EXTS = new Set(['.png', '.jpg', '.jpeg']);
const MAX_WIDTH = 1920; // tope razonable para foto en web (incluso para 4K screens)

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function convert(file) {
  const { dir, name, ext } = parse(file);
  if (SKIP_FILES.has(`${name}${ext}`)) return null;
  if (!VALID_EXTS.has(ext.toLowerCase())) return null;

  const out = join(dir, `${name}.webp`);
  if (await fileExists(out)) {
    return { from: file, to: out, skipped: true };
  }

  const isPng = ext.toLowerCase() === '.png';
  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: isPng ? 88 : 80, effort: 6 })
    .toFile(out);

  const orig = (await stat(file)).size;
  const next = (await stat(out)).size;

  // Si el WebP termina pesando lo mismo o más que el original (típico cuando
  // la fuente ya está MUY comprimida), no vale la pena. Eliminamos el WebP y
  // el import en el JSX debe quedar apuntando al archivo original.
  if (next >= orig) {
    await unlink(out);
    return { from: file, to: out, orig, next, rejected: true };
  }

  return { from: file, to: out, orig, next };
}

console.log('🖼️  Convirtiendo imágenes a WebP...\n');

let totalBytes = 0;
let savedBytes = 0;
let count = 0;
let skipped = 0;
let rejected = 0;

for (const root of ROOTS) {
  const fullRoot = join(PROJECT_ROOT, root);
  if (!(await fileExists(fullRoot))) {
    console.log(`  (saltando ${root}: no existe)`);
    continue;
  }

  for await (const file of walk(fullRoot)) {
    const result = await convert(file);
    if (!result) continue;

    const rel = relative(PROJECT_ROOT, result.from).replace(/\\/g, '/');

    if (result.skipped) {
      skipped++;
      console.log(`  ⏭  ${rel}  (ya existe .webp)`);
      continue;
    }

    if (result.rejected) {
      rejected++;
      console.log(
        `  ⚠  ${rel}  webp ${(result.next / 1024).toFixed(0)}KB ≥ original ${(result.orig / 1024).toFixed(0)}KB → manteniendo original`
      );
      continue;
    }

    const { orig, next } = result;
    const saved = orig - next;
    totalBytes += orig;
    savedBytes += saved;
    count++;

    const pct = ((saved / orig) * 100).toFixed(1);
    console.log(
      `  ✓ ${rel}  ${(orig / 1024).toFixed(0)}KB → ${(next / 1024).toFixed(0)}KB  (-${pct}%)`
    );
  }
}

if (count === 0 && skipped === 0 && rejected === 0) {
  console.log('  No se encontraron imágenes para convertir.');
} else {
  console.log(
    `\n✨ ${count} convertidas · ${skipped} ya existían · ${rejected} descartadas (webp ≥ original) · ` +
      `ahorro ${(savedBytes / 1024 / 1024).toFixed(2)}MB ` +
      (totalBytes > 0 ? `(${((savedBytes / totalBytes) * 100).toFixed(1)}%)` : '')
  );
  if (rejected > 0) {
    console.log(
      `\n⚠  ${rejected} archivo(s) descartado(s): la fuente ya estaba muy comprimida. ` +
        `En esos casos, los imports JSX deben apuntar al archivo original (.jpg/.png).`
    );
  }
}

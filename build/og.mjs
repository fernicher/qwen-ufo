/**
 * Genera una imagen de vista previa (Open Graph) por ruta, durante el build.
 *
 * Sin esto todas las URLs comparten la miniatura de la portada: alguien comparte
 * el expediente de Trelew por WhatsApp y se ve igual que la página de inicio.
 *
 * Se hace en el build y no en tiempo de ejecución a propósito. Una función que
 * dibuje la imagen al vuelo se puede probar sólo una vez desplegada; esto se
 * verifica localmente, no agrega funciones al proyecto y sirve archivos
 * estáticos, que es lo más rápido y barato de servir.
 *
 * satori maqueta el texto y lo convierte a trazos con las fuentes reales del
 * sitio, así que el resultado no depende de qué fuentes tenga instaladas la
 * máquina que compila. resvg lo pasa a PNG y sharp… no hace falta: el PNG de
 * 1200×630 pesa poco porque el fondo es plano.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);

const ANCHO = 1200;
const ALTO = 630;
const FONDO = '#0a0a0c';
const CIAN = '#22d3ee';

/** Las fuentes salen de node_modules, así no hay binarios en el repositorio. */
function cargarFuentes() {
  const ruta = (paquete, archivo) => join(dirname(require.resolve(`${paquete}/package.json`)), 'files', archivo);
  return [
    { name: 'Space Grotesk', weight: 700, style: 'normal', data: readFileSync(ruta('@fontsource/space-grotesk', 'space-grotesk-latin-700-normal.woff')) },
    { name: 'Inter', weight: 400, style: 'normal', data: readFileSync(ruta('@fontsource/inter', 'inter-latin-400-normal.woff')) },
  ];
}

/** Hiperscript mínimo: satori acepta este mismo objeto que produciría JSX. */
const h = (type, style, ...children) => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.flat().filter(Boolean) },
});

// Estrellas fijas, con la misma sensación que el fondo del sitio. Deterministas
// para que dos builds seguidos generen imágenes idénticas.
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260813);
const ESTRELLAS = Array.from({ length: 70 }).map(() => ({
  left: Math.round(rand() * ANCHO),
  top: Math.round(rand() * 420),
  size: rand() < 0.8 ? 2 : 3,
  opacity: 0.15 + rand() * 0.5,
}));

/** El titular largo se achica para que nunca desborde ni se corte. */
function cuerpoTitulo(texto) {
  if (texto.length > 78) return 46;
  if (texto.length > 52) return 56;
  if (texto.length > 32) return 66;
  return 74;
}

function plantilla({ kicker, titulo, pie }) {
  return h(
    'div',
    { width: ANCHO, height: ALTO, flexDirection: 'column', justifyContent: 'flex-end', background: FONDO, padding: 72, position: 'relative' },

    // Cielo
    ...ESTRELLAS.map((e) =>
      h('div', {
        position: 'absolute',
        left: e.left,
        top: e.top,
        width: e.size,
        height: e.size,
        borderRadius: e.size,
        background: '#ffffff',
        opacity: e.opacity,
      }),
    ),

    // Resplandor del horizonte, en el cian del sitio
    h('div', { position: 'absolute', left: 0, right: 0, bottom: 0, height: 260, background: 'linear-gradient(to top, rgba(34,211,238,0.16), rgba(10,10,12,0))' }),

    h('div', { flexDirection: 'column', position: 'relative' },
      h('div', { alignItems: 'center', marginBottom: 22 },
        h('div', { width: 44, height: 3, background: CIAN, marginRight: 16 }),
        h('div', { fontFamily: 'Inter', fontSize: 24, color: CIAN, textTransform: 'uppercase', letterSpacing: 2 }, kicker),
      ),
      h('div', { fontFamily: 'Space Grotesk', fontSize: cuerpoTitulo(titulo), color: '#ffffff', lineHeight: 1.12 }, titulo),
      pie && h('div', { fontFamily: 'Inter', fontSize: 28, color: '#9ca3af', marginTop: 20 }, pie),
    ),

    h('div', { position: 'relative', marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.12)', justifyContent: 'space-between', alignItems: 'center' },
      h('div', { fontFamily: 'Space Grotesk', fontSize: 26, color: '#ffffff' }, 'Project Aurora'),
      h('div', { fontFamily: 'Inter', fontSize: 22, color: '#6b7280' }, 'Archivo OVNI · UAP en español'),
    ),
  );
}

/** Recorta el título del buscador por si una ruta no declaró `og`. */
const desdeTitle = (title) => title.split(/ [—·-] /)[0].trim();

/**
 * Escribe `dist/og/<slug>.png` para cada ruta y devuelve un mapa
 * `{ '/ruta': '/og/slug.png' }` para que el HTML apunte a la suya.
 */
export async function generarPortadas(metas, outDir) {
  const fonts = cargarFuentes();
  const mapa = {};
  mkdirSync(join(outDir, 'og'), { recursive: true });

  for (const meta of metas) {
    // La portada conserva su miniatura ilustrada (public/og.jpg): una tarjeta de
    // texto sería un retroceso frente al dibujo de la nave y los aliens
    if (meta.path === '/') continue;

    const datos = meta.og || { kicker: 'Project Aurora', titulo: desdeTitle(meta.title) };
    const svg = await satori(plantilla({ ...datos, titulo: datos.titulo || desdeTitle(meta.title) }), {
      width: ANCHO,
      height: ALTO,
      fonts,
    });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: ANCHO } }).render().asPng();

    const slug = meta.path === '/' ? 'inicio' : meta.path.slice(1).replace(/\//g, '-');
    writeFileSync(join(outDir, 'og', `${slug}.png`), png);
    mapa[meta.path] = `/og/${slug}.png`;
  }

  return mapa;
}

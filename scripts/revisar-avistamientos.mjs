#!/usr/bin/env node
/**
 * Baja los avistamientos pendientes y los imprime con la forma exacta que espera
 * `src/data/testimonios.ts`, listos para copiar y pegar.
 *
 * Es el paso manual a propósito: nada se publica sin que alguien lo lea, decida
 * y escriba la nota de lo que pudo contrastar. Ese trabajo es el que sostiene la
 * diferencia entre el archivo y un muro de mensajes.
 *
 *   npm run avistamientos -- --token=EL_TOKEN
 *
 * También toma FEEDBACK_TOKEN y SITE_URL del entorno.
 */

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, '').split('=');
    return [k, v.join('=') || true];
  }),
);

const SITIO = args.sitio || process.env.SITE_URL || 'https://fernicher-ufo.vercel.app';
const TOKEN = args.token || process.env.FEEDBACK_TOKEN;

if (!TOKEN) {
  console.error('Falta el token. Uso: npm run avistamientos -- --token=EL_TOKEN');
  console.error('(es el mismo FEEDBACK_TOKEN que está cargado en Vercel)');
  process.exit(1);
}

const url = `${SITIO.replace(/\/$/, '')}/api/avistamiento?token=${encodeURIComponent(TOKEN)}`;
const r = await fetch(url);

if (r.status === 404) {
  console.error('El servidor devolvió 404: el token no coincide con FEEDBACK_TOKEN, o no está definido en Vercel.');
  process.exit(1);
}
if (!r.ok) {
  console.error(`El servidor devolvió ${r.status}.`);
  process.exit(1);
}

const { total = 0, avistamientos = [], configured } = await r.json();

if (configured === false) {
  console.error('Upstash no está configurado en el proyecto: no hay dónde guardar ni qué leer.');
  process.exit(1);
}
if (!total) {
  console.log('No hay avistamientos recibidos todavía.');
  process.exit(0);
}

/** Cita segura para pegar dentro de un archivo TypeScript. */
const txt = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;

/** id estable a partir del lugar y el mes: 'capilla-del-monte-2024-03' */
function slug(a) {
  const lugar = String(a.lugar || 'sin-lugar')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .split('-')
    .slice(0, 4)
    .join('-');
  return `${lugar}-${String(a.fecha || '').slice(0, 7)}`;
}

const hoy = new Date().toISOString().slice(0, 10);
const campo = (clave, valor) => (valor ? `\n    ${clave}: ${txt(valor)},` : '');

console.log(`${total} avistamiento(s) recibido(s). Del más reciente al más antiguo:\n`);

avistamientos.forEach((a, i) => {
  console.log('─'.repeat(78));
  console.log(`#${i + 1}  recibido ${String(a.recibido || '').slice(0, 16).replace('T', ' ')}  ·  desde ${a.paisRemitente || 'XX'}  ·  ${a.estado || 'pendiente'}`);
  if (a.email) console.log(`    contacto: ${a.email}   (NO se publica)`);
  console.log('');
  console.log(`    ${a.descripcion}`);
  console.log('');
  console.log('    Para publicarlo, pegar en src/data/testimonios.ts y escribir la nota:');
  console.log(`  {
    id: ${txt(slug(a))},
    fecha: ${txt(a.fecha)},${campo('hora', a.hora)}
    lugar: ${txt(a.lugar)},${campo('duracion', a.duracion)}
    relato: ${txt(a.descripcion)},${campo('movimiento', a.movimiento)}${campo('testigos', a.testigos)}${campo('descartado', a.descartado)}${campo('enlace', a.enlace)}${campo('autor', a.alias)}
    publicado: ${txt(hoy)},
    nota: '', // ← QUÉ SE COMPROBÓ. Sin esto no se publica.
  },`);
  console.log('');
});

console.log('─'.repeat(78));
console.log('Falta el país en la ficha: agregar `pais:` a mano, que el remitente no lo declara.');
console.log('Conviene revisar el relato por datos personales antes de publicarlo.');

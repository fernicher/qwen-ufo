// Utilidades compartidas por las funciones que guardan en Upstash Redis.
// El guion bajo del nombre evita que Vercel lo publique como endpoint.

export const REST_URL = process.env.UPSTASH_REDIS_REST_URL;
export const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
export const READ_TOKEN = process.env.FEEDBACK_TOKEN;

export const configurado = () => Boolean(REST_URL && REST_TOKEN);

export async function redis(command) {
  const r = await fetch(REST_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REST_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error('upstash ' + r.status);
  const j = await r.json();
  return j.result;
}

/** Identifica al remitente sólo para limitar cuántos envíos hace por día. */
export function clienteId(req) {
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return ip || 'desconocido';
}

/** Devuelve true si el remitente ya agotó su cupo diario. */
export async function superaLimite(req, prefijo, maximo) {
  const clave = `${prefijo}:${clienteId(req)}`;
  const envios = Number(await redis(['INCR', clave])) || 0;
  if (envios === 1) await redis(['EXPIRE', clave, '86400']);
  return envios > maximo;
}

/** Guarda al principio de una lista y la recorta para que no crezca sin fin. */
export async function guardar(lista, registro, maximo) {
  await redis(['LPUSH', lista, JSON.stringify(registro)]);
  await redis(['LTRIM', lista, '0', String(maximo - 1)]);
}

/** Lectura protegida por FEEDBACK_TOKEN. Devuelve null si el token no cuadra. */
export async function leerConToken(req, lista, cuantos = 200) {
  if (!READ_TOKEN || req.query.token !== READ_TOKEN) return null;
  const crudos = (await redis(['LRANGE', lista, '0', String(cuantos - 1)])) || [];
  return crudos.map((s) => {
    try {
      return JSON.parse(s);
    } catch {
      return { error: 'ilegible', raw: s };
    }
  });
}

export const pais = (req) => String(req.headers['x-vercel-ip-country'] || 'XX').toUpperCase();

export function cuerpo(req) {
  return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
}

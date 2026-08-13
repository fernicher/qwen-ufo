// Vercel Serverless Function — opinión de los lectores sobre un expediente.
//
// Guarda un contador por caso y opción en un hash de Upstash. Es un termómetro
// de lo que le parece a la gente, no una valoración del archivo: la
// clasificación de evidencia (A/B/C) se asigna por la documentación disponible
// y no la mueve ningún voto. Mezclar las dos cosas convertiría el archivo en
// una encuesta de popularidad.
//
// Env: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.

import { configurado, redis, superaLimite } from './_upstash.js';

const OPCIONES = ['convence', 'dudas', 'terrenal'];
const MAX_POR_DIA = 40; // permite recorrer y votar varios casos, no llenar la base
const clave = (caso) => `aurora:reacciones:${caso}`;

/** Sólo ids con la forma de los del archivo: evita inventar claves en Redis. */
const idValido = (v) => /^[a-z0-9][a-z0-9-]{1,59}$/.test(v);

/** Upstash devuelve el hash como lista plana [campo, valor, campo, valor…]. */
function aVotos(plano) {
  const votos = Object.fromEntries(OPCIONES.map((o) => [o, 0]));
  const lista = Array.isArray(plano) ? plano : [];
  for (let i = 0; i < lista.length; i += 2) {
    const opcion = String(lista[i]);
    if (OPCIONES.includes(opcion)) votos[opcion] = Number(lista[i + 1]) || 0;
  }
  return votos;
}

const conTotal = (votos) => ({
  votos,
  total: OPCIONES.reduce((s, o) => s + votos[o], 0),
});

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!configurado()) {
    res.status(200).json({ configured: false });
    return;
  }

  const caso = String((req.query && req.query.caso) || '').trim();
  if (!idValido(caso)) {
    res.status(400).json({ configured: true, error: 'caso inválido' });
    return;
  }

  try {
    if (req.method === 'GET') {
      const votos = aVotos(await redis(['HGETALL', clave(caso)]));
      res.status(200).json({ configured: true, ...conTotal(votos) });
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'método no permitido' });
      return;
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const voto = String(body.voto || '');
    if (!OPCIONES.includes(voto)) {
      res.status(400).json({ configured: true, error: 'opción inválida' });
      return;
    }

    if (await superaLimite(req, 'aurora:reacciones:limite', MAX_POR_DIA)) {
      res.status(429).json({ configured: true, error: 'Demasiados votos por hoy.' });
      return;
    }

    await redis(['HINCRBY', clave(caso), voto, '1']);
    const votos = aVotos(await redis(['HGETALL', clave(caso)]));
    res.status(200).json({ configured: true, ok: true, ...conTotal(votos) });
  } catch (e) {
    res.status(500).json({ configured: true, error: String((e && e.message) || e) });
  }
}

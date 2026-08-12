// Vercel Serverless Function — buzón de sugerencias.
// Guarda en Upstash Redis lo que envía la gente. NO se publica en el sitio:
// es un canal privado hacia quien mantiene el archivo, así que no hay
// moderación pública ni riesgo de que aparezca spam a la vista.
// Env necesarias: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
// Si no están definidas, responde { configured:false } y la caja se oculta.
// Opcional: FEEDBACK_TOKEN habilita la lectura vía GET ?token=...

const REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const READ_TOKEN = process.env.FEEDBACK_TOKEN;

const LISTA = 'aurora:feedback';
const MAX_GUARDADOS = 500;
const MAX_MENSAJE = 1000;
const MIN_MENSAJE = 4;
const MAX_POR_DIA = 5;

async function redis(command) {
  const r = await fetch(REST_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REST_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error('upstash ' + r.status);
  const j = await r.json();
  return j.result;
}

/** Identifica al remitente sólo para limitar el número de envíos por día. */
function clienteId(req) {
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return ip || 'desconocido';
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!REST_URL || !REST_TOKEN) {
    res.status(200).json({ configured: false });
    return;
  }

  // Lectura de lo recibido, sólo con el token privado
  if (req.method === 'GET') {
    if (!READ_TOKEN || req.query.token !== READ_TOKEN) {
      res.status(404).json({ error: 'no encontrado' });
      return;
    }
    try {
      const crudos = (await redis(['LRANGE', LISTA, '0', '199'])) || [];
      const mensajes = crudos.map((s) => {
        try {
          return JSON.parse(s);
        } catch {
          return { error: 'ilegible', raw: s };
        }
      });
      res.status(200).json({ total: mensajes.length, mensajes });
    } catch (e) {
      res.status(500).json({ error: String((e && e.message) || e) });
    }
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'método no permitido' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const mensaje = String(body.mensaje || '').trim();
    const email = String(body.email || '').trim();
    const pagina = String(body.pagina || '').slice(0, 200);

    // Campo trampa: invisible en el formulario, sólo lo rellenan los bots
    if (String(body.web || '').length > 0) {
      res.status(200).json({ configured: true, ok: true });
      return;
    }

    if (mensaje.length < MIN_MENSAJE) {
      res.status(400).json({ configured: true, error: 'El mensaje está vacío.' });
      return;
    }
    if (mensaje.length > MAX_MENSAJE) {
      res.status(400).json({ configured: true, error: `El mensaje no puede pasar de ${MAX_MENSAJE} caracteres.` });
      return;
    }
    if (email && (email.length > 120 || !email.includes('@'))) {
      res.status(400).json({ configured: true, error: 'Ese correo no parece válido.' });
      return;
    }

    // Un puñado de envíos por día y remitente, para que un bot no llene la lista
    const claveLimite = `aurora:feedback:limite:${clienteId(req)}`;
    const envios = Number(await redis(['INCR', claveLimite])) || 0;
    if (envios === 1) await redis(['EXPIRE', claveLimite, '86400']);
    if (envios > MAX_POR_DIA) {
      res.status(429).json({ configured: true, error: 'Ya enviaste varias sugerencias hoy. ¡Gracias! Prueba mañana.' });
      return;
    }

    const registro = {
      fecha: new Date().toISOString(),
      mensaje,
      email: email || null,
      pagina,
      pais: String(req.headers['x-vercel-ip-country'] || 'XX').toUpperCase(),
    };

    await redis(['LPUSH', LISTA, JSON.stringify(registro)]);
    await redis(['LTRIM', LISTA, '0', String(MAX_GUARDADOS - 1)]);

    res.status(200).json({ configured: true, ok: true });
  } catch (e) {
    res.status(500).json({ configured: true, error: String((e && e.message) || e) });
  }
}

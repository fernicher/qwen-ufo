// Vercel Serverless Function — buzón de sugerencias.
// Guarda en Upstash Redis lo que envía la gente. NO se publica en el sitio:
// es un canal privado hacia quien mantiene el archivo, así que no hay
// moderación pública ni riesgo de que aparezca spam a la vista.
// Env necesarias: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
// Si no están definidas, responde { configured:false } y la caja se oculta.
// Opcional: FEEDBACK_TOKEN habilita la lectura vía GET ?token=...

import { configurado, superaLimite, guardar, leerConToken, pais, cuerpo } from './_upstash.js';

const LISTA = 'aurora:feedback';
const MAX_GUARDADOS = 500;
const MAX_MENSAJE = 1000;
const MIN_MENSAJE = 4;
const MAX_POR_DIA = 5;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!configurado()) {
    res.status(200).json({ configured: false });
    return;
  }

  // Lectura de lo recibido, sólo con el token privado
  if (req.method === 'GET') {
    try {
      const mensajes = await leerConToken(req, LISTA);
      if (!mensajes) {
        res.status(404).json({ error: 'no encontrado' });
        return;
      }
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
    const body = cuerpo(req);
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
    if (await superaLimite(req, 'aurora:feedback:limite', MAX_POR_DIA)) {
      res.status(429).json({ configured: true, error: 'Ya enviaste varias sugerencias hoy. ¡Gracias! Prueba mañana.' });
      return;
    }

    await guardar(LISTA, {
      fecha: new Date().toISOString(),
      mensaje,
      email: email || null,
      pagina,
      pais: pais(req),
    }, MAX_GUARDADOS);

    res.status(200).json({ configured: true, ok: true });
  } catch (e) {
    res.status(500).json({ configured: true, error: String((e && e.message) || e) });
  }
}

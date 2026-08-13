// Vercel Serverless Function — recepción de avistamientos enviados por el público.
//
// Nada se publica automáticamente: los envíos quedan guardados para que quien
// mantiene el archivo los lea, contraste y decida. Es lo que permite que el
// archivo siga siendo fiable aunque cualquiera pueda escribir.
//
// Env: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN. FEEDBACK_TOKEN opcional
// para leer lo recibido con ?token=...

import { configurado, superaLimite, guardar, leerConToken, pais, cuerpo } from './_upstash.js';

const LISTA = 'aurora:avistamientos';
const MAX_GUARDADOS = 500;
const MAX_POR_DIA = 3;

const LIMITES = {
  descripcion: [30, 4000],
  lugar: [2, 160],
  duracion: [0, 80],
  movimiento: [0, 300],
  testigos: [0, 300],
  descartado: [0, 1000],
  enlace: [0, 300],
  alias: [0, 60],
  email: [0, 120],
};

/** Valida y normaliza. Devuelve { error } o { registro }. */
function revisar(body, req) {
  const t = (campo) => String(body[campo] || '').trim();

  for (const [campo, [min, max]] of Object.entries(LIMITES)) {
    const valor = t(campo);
    if (valor.length > max) return { error: `El campo "${campo}" es demasiado largo.` };
    if (valor.length < min) {
      return {
        error:
          campo === 'descripcion'
            ? 'Cuéntanos un poco más: al menos un par de frases sobre lo que viste.'
            : `Falta completar "${campo}".`,
      };
    }
  }

  const fecha = t('fecha');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return { error: 'Indica la fecha del avistamiento.' };
  const cuando = new Date(fecha + 'T00:00:00Z');
  if (Number.isNaN(cuando.getTime())) return { error: 'Esa fecha no es válida.' };
  if (cuando.getTime() > Date.now() + 86400000) return { error: 'La fecha no puede ser futura.' };
  if (cuando.getUTCFullYear() < 1900) return { error: 'La fecha es demasiado antigua para el archivo.' };

  const hora = t('hora');
  if (hora) {
    const m = /^(\d{2}):(\d{2})$/.exec(hora);
    // El formato solo no alcanza: "25:99" encaja en el patrón y no existe
    if (!m || Number(m[1]) > 23 || Number(m[2]) > 59) return { error: 'Esa hora no es válida.' };
  }

  const email = t('email');
  if (email && !email.includes('@')) return { error: 'Ese correo no parece válido.' };

  const enlace = t('enlace');
  if (enlace && !/^https?:\/\//i.test(enlace)) return { error: 'El enlace debe empezar por http:// o https://' };

  // Sin permiso explícito no se guarda: es lo que habilita a publicarlo después
  if (body.consentimiento !== true) {
    return { error: 'Necesitamos tu permiso para poder publicar el relato.' };
  }

  return {
    registro: {
      recibido: new Date().toISOString(),
      fecha,
      hora: hora || null,
      lugar: t('lugar'),
      duracion: t('duracion') || null,
      descripcion: t('descripcion'),
      movimiento: t('movimiento') || null,
      testigos: t('testigos') || null,
      descartado: t('descartado') || null,
      enlace: enlace || null,
      alias: t('alias') || null,
      email: email || null,
      consentimiento: true,
      paisRemitente: pais(req),
      estado: 'pendiente',
    },
  };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!configurado()) {
    res.status(200).json({ configured: false });
    return;
  }

  if (req.method === 'GET') {
    try {
      const envios = await leerConToken(req, LISTA);
      if (!envios) {
        res.status(404).json({ error: 'no encontrado' });
        return;
      }
      res.status(200).json({ total: envios.length, avistamientos: envios });
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

    // Campo trampa: invisible en el formulario, sólo lo rellenan los bots.
    // Se responde ok para no darles pistas de que fueron detectados.
    if (String(body.web || '').length > 0) {
      res.status(200).json({ configured: true, ok: true });
      return;
    }

    const { error, registro } = revisar(body, req);
    if (error) {
      res.status(400).json({ configured: true, error });
      return;
    }

    if (await superaLimite(req, 'aurora:avistamientos:limite', MAX_POR_DIA)) {
      res.status(429).json({ configured: true, error: 'Ya enviaste varios relatos hoy. Prueba mañana.' });
      return;
    }

    await guardar(LISTA, registro, MAX_GUARDADOS);
    res.status(200).json({ configured: true, ok: true });
  } catch (e) {
    res.status(500).json({ configured: true, error: String((e && e.message) || e) });
  }
}

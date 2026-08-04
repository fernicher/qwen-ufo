// Vercel Serverless Function — contador de visitas + desglose por país.
// Persiste en Upstash Redis (plan gratis) vía su API REST. País: header gratuito
// x-vercel-ip-country que Vercel agrega en cada request. Sin datos personales.
// Env necesarias: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
// Si no están definidas, el endpoint responde { configured:false } y la UI se oculta.

const REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

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

function parseHash(arr) {
  const out = {};
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i += 2) out[arr[i]] = Number(arr[i + 1]) || 0;
  }
  return out;
}

export default async function handler(req, res) {
  if (!REST_URL || !REST_TOKEN) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ configured: false });
    return;
  }

  try {
    const country = String(req.headers['x-vercel-ip-country'] || 'XX').toUpperCase();
    const cookie = String(req.headers.cookie || '');
    const alreadyCounted = /(?:^|;\s*)aurora_seen=1(?:;|$)/.test(cookie);

    if (req.method === 'POST' && !alreadyCounted) {
      await redis(['INCR', 'aurora:hits:total']);
      if (/^[A-Z]{2}$/.test(country)) {
        await redis(['HINCRBY', 'aurora:hits:country', country, '1']);
      }
      // No vuelve a contar a este visitante por 12 horas.
      res.setHeader('Set-Cookie', 'aurora_seen=1; Path=/; Max-Age=43200; SameSite=Lax');
    }

    const total = Number(await redis(['GET', 'aurora:hits:total'])) || 0;
    const hash = parseHash(await redis(['HGETALL', 'aurora:hits:country']));
    const countries = Object.entries(hash)
      .map(([code, count]) => ({ code, count }))
      .sort((a, b) => b.count - a.count);

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ configured: true, total, countries });
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ configured: true, total: 0, countries: [], error: String((e && e.message) || e) });
  }
}

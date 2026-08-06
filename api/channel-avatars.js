// Vercel Serverless Function — resuelve el avatar oficial de canales de YouTube.
// Recibe ?names=Canal 1|Canal 2|... y devuelve { configured, avatars: { "Canal 1": url, ... } }.
// Usa la YouTube Data API v3 (misma YOUTUBE_API_KEY del feed). Si no está definida,
// responde { configured:false } y la UI cae al monograma generado. Cachea 24 h.

export default async function handler(req, res) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ configured: false, avatars: {} });
    return;
  }

  const raw = (req.query && req.query.names) || '';
  const names = String(raw)
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 20);

  const pickThumb = (item) => {
    const th = item && item.snippet && item.snippet.thumbnails;
    return (th && ((th.high && th.high.url) || (th.medium && th.medium.url) || (th.default && th.default.url))) || null;
  };

  const entries = await Promise.all(
    names.map(async (name) => {
      try {
        // Si empieza con '@' es un handle exacto -> channels.list?forHandle (1 unidad, preciso).
        // Si no, es un nombre -> search.list?type=channel (búsqueda aproximada).
        const url = name.startsWith('@')
          ? 'https://www.googleapis.com/youtube/v3/channels?part=snippet&forHandle=' + encodeURIComponent(name.slice(1)) + '&key=' + key
          : 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=' + encodeURIComponent(name) + '&key=' + key;
        const r = await fetch(url);
        if (!r.ok) throw new Error(String(r.status));
        const j = await r.json();
        const item = j.items && j.items[0];
        return [name, pickThumb(item)];
      } catch {
        return [name, null];
      }
    })
  );

  const avatars = Object.fromEntries(entries.filter(([, v]) => v));
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
  res.status(200).json({ configured: true, avatars });
}

// Vercel Serverless Function — agrega noticias OVNI/UAP de fuentes gratuitas.
// Sin claves: Reddit r/UFOs, Google News (RSS, español), Bluesky (API pública).
// Opcional con clave gratis: YouTube (definí YOUTUBE_API_KEY en Vercel para activarlo).

const UA = 'aurora-uap-archive/1.0 (+https://github.com/fernicher/qwen-ufo)';

function stripHtml(s = '') {
  return String(s)
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fromReddit() {
  const r = await fetch('https://www.reddit.com/r/UFOs/hot.json?limit=20&raw_json=1', {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
  });
  if (!r.ok) throw new Error('reddit ' + r.status);
  const j = await r.json();
  return (j.data && j.data.children ? j.data.children : [])
    .map((c) => c.data)
    .filter((d) => d && !d.stickied && !d.over_18)
    .map((d) => ({
      id: 'rd_' + d.id,
      source: 'reddit',
      title: d.title || '',
      url: 'https://www.reddit.com' + d.permalink,
      excerpt: stripHtml(d.selftext || '').slice(0, 180),
      date: new Date((d.created_utc || 0) * 1000).toISOString(),
      author: 'u/' + (d.author || 'anon'),
      meta: { score: d.score || 0, comments: d.num_comments || 0 },
    }));
}

function parseRss(xml) {
  const out = [];
  const blocks = xml.split(/<item>/i).slice(1);
  for (const b of blocks) {
    const chunk = b.split(/<\/item>/i)[0];
    const pick = (tag) => {
      const m = chunk.match(new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)<\\/' + tag + '>', 'i'));
      if (!m) return '';
      return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
    };
    const rawTitle = stripHtml(pick('title'));
    const link = stripHtml(pick('link'));
    const pubDate = pick('pubDate');
    let source = stripHtml(pick('source'));
    let title = rawTitle;
    const idx = rawTitle.lastIndexOf(' - ');
    if (idx > 0) {
      // Google News formatea "Titular - Medio"
      if (!source) source = rawTitle.slice(idx + 3);
      if (rawTitle.slice(idx + 3) === source) title = rawTitle.slice(0, idx);
    }
    if (title) out.push({ title, link, pubDate, publisher: source || 'Google News' });
  }
  return out;
}

async function fromGoogleNews() {
  const q = encodeURIComponent('(OVNI OR OVNIs OR UAP OR "fenómeno anómalo no identificado") when:21d');
  const url = `https://news.google.com/rss/search?q=${q}&hl=es-419&gl=AR&ceid=AR:es-419`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error('gnews ' + r.status);
  const xml = await r.text();
  return parseRss(xml)
    .slice(0, 20)
    .map((it, i) => ({
      id: 'gn_' + i + '_' + (it.link || '').slice(-8),
      source: 'news',
      title: it.title,
      url: it.link,
      excerpt: '',
      date: it.pubDate ? new Date(it.pubDate).toISOString() : new Date().toISOString(),
      author: it.publisher,
      meta: {},
    }));
}

async function searchBluesky(q) {
  const url =
    'https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=' +
    encodeURIComponent(q) +
    '&limit=12&sort=latest';
  const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
  if (!r.ok) throw new Error('bsky ' + r.status);
  const j = await r.json();
  return (j.posts || []).map((p) => {
    const handle = (p.author && p.author.handle) || 'bsky.app';
    const rkey = (p.uri || '').split('/').pop();
    return {
      id: 'bs_' + (p.cid || rkey),
      source: 'bluesky',
      title: (p.record && p.record.text) || '',
      url: `https://bsky.app/profile/${handle}/post/${rkey}`,
      excerpt: '',
      date: (p.record && p.record.createdAt) || p.indexedAt || new Date().toISOString(),
      author: '@' + handle,
      meta: { likes: p.likeCount || 0, reposts: p.repostCount || 0 },
    };
  });
}

async function fromBluesky() {
  const results = await Promise.allSettled([searchBluesky('OVNI'), searchBluesky('UAP')]);
  const seen = new Set();
  const items = [];
  for (const res of results) {
    if (res.status !== 'fulfilled') continue;
    for (const it of res.value) {
      if (!it.title || seen.has(it.id)) continue;
      seen.add(it.id);
      items.push(it);
    }
  }
  return items;
}

async function fromYouTube(key) {
  const q = encodeURIComponent('OVNI OR UAP OR UFO');
  const url =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=date&maxResults=8' +
    `&relevanceLanguage=es&q=${q}&key=${key}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('youtube ' + r.status);
  const j = await r.json();
  return (j.items || [])
    .filter((it) => it.id && it.id.videoId)
    .map((it) => ({
      id: 'yt_' + it.id.videoId,
      source: 'youtube',
      title: stripHtml(it.snippet.title),
      url: 'https://www.youtube.com/watch?v=' + it.id.videoId,
      excerpt: stripHtml(it.snippet.description || '').slice(0, 160),
      date: it.snippet.publishedAt,
      author: it.snippet.channelTitle,
      meta: {},
    }));
}

export default async function handler(_req, res) {
  const names = ['reddit', 'news', 'bluesky'];
  const tasks = [fromReddit(), fromGoogleNews(), fromBluesky()];
  if (process.env.YOUTUBE_API_KEY) {
    names.push('youtube');
    tasks.push(fromYouTube(process.env.YOUTUBE_API_KEY));
  }

  const settled = await Promise.allSettled(tasks);
  let items = [];
  const sources = {};
  settled.forEach((s, i) => {
    const name = names[i];
    if (s.status === 'fulfilled') {
      items = items.concat(s.value);
      sources[name] = s.value.length;
    } else {
      sources[name] = { error: String((s.reason && s.reason.message) || s.reason) };
    }
  });

  const seen = new Set();
  items = items
    .filter((it) => it.url && it.title && !seen.has(it.url) && seen.add(it.url))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 30);

  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');
  res.status(200).json({ updatedAt: new Date().toISOString(), sources, items });
}

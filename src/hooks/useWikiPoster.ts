import { useEffect, useState } from 'react';

/**
 * Trae el póster de un título usando la API REST pública de Wikipedia.
 * No necesita API key ni variables de entorno (a diferencia de TMDB).
 * Cachea en memoria para no repetir requests durante la sesión.
 */

type CacheState = { status: 'loading' | 'done'; url: string | null };
const cache = new Map<string, CacheState>();
const listeners = new Map<string, Set<() => void>>();

function notify(wiki: string) {
  listeners.get(wiki)?.forEach((cb) => cb());
}

async function fetchPoster(wiki: string) {
  cache.set(wiki, { status: 'loading', url: null });
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`);
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const url: string | null = data?.thumbnail?.source || data?.originalimage?.source || null;
    cache.set(wiki, { status: 'done', url });
  } catch {
    cache.set(wiki, { status: 'done', url: null });
  }
  notify(wiki);
}

export function useWikiPoster(wiki: string) {
  const [, force] = useState(0);

  useEffect(() => {
    if (!wiki) return;
    const rerender = () => force((n) => n + 1);
    if (!listeners.has(wiki)) listeners.set(wiki, new Set());
    listeners.get(wiki)!.add(rerender);

    if (!cache.has(wiki)) {
      fetchPoster(wiki);
    }

    return () => {
      listeners.get(wiki)?.delete(rerender);
    };
  }, [wiki]);

  const state = cache.get(wiki);
  return { poster: state?.url ?? null, loading: state?.status === 'loading' };
}

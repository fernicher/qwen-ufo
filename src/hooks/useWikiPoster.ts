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

/** Devuelve la imagen del artículo, o null si el artículo no existe o no tiene foto. */
async function imageFrom(lang: string, title: string): Promise<string | null> {
  try {
    const res = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.thumbnail?.source || data?.originalimage?.source || null;
  } catch {
    return null;
  }
}

/**
 * Acepta `Titulo` (busca en inglés y, si no hay foto, reintenta el mismo título
 * en español) o un prefijo explícito `es:Titulo` / `en:Titulo` cuando el
 * artículo sólo existe en un idioma o se llama distinto en cada uno.
 */
async function fetchPoster(wiki: string) {
  cache.set(wiki, { status: 'loading', url: null });

  const prefix = wiki.match(/^(es|en):(.+)$/);
  let url: string | null;
  if (prefix) {
    url = await imageFrom(prefix[1], prefix[2]);
  } else {
    url = (await imageFrom('en', wiki)) ?? (await imageFrom('es', wiki));
  }

  cache.set(wiki, { status: 'done', url });
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

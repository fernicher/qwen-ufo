import { useEffect, useState } from 'react';

/**
 * Trae portada e ISBN de un libro usando la API pública de Open Library.
 * No necesita API key ni variables de entorno. Cachea en memoria por sesión.
 */

interface BookData { cover: string | null; isbn: string | null; }
type CacheState = { status: 'loading' | 'done'; data: BookData };

const cache = new Map<string, CacheState>();
const listeners = new Map<string, Set<() => void>>();

function notify(key: string) {
  listeners.get(key)?.forEach((cb) => cb());
}

async function fetchBook(key: string, title: string, author: string) {
  cache.set(key, { status: 'loading', data: { cover: null, isbn: null } });
  try {
    const params = new URLSearchParams({ title, author, limit: '1', fields: 'cover_i,isbn' });
    const res = await fetch(`https://openlibrary.org/search.json?${params.toString()}`);
    if (!res.ok) throw new Error(String(res.status));
    const json = await res.json();
    const doc = json?.docs?.[0];
    const cover = doc?.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null;
    const isbn = Array.isArray(doc?.isbn) ? doc.isbn.find((x: string) => x.length === 13) || doc.isbn[0] : null;
    cache.set(key, { status: 'done', data: { cover, isbn } });
  } catch {
    cache.set(key, { status: 'done', data: { cover: null, isbn: null } });
  }
  notify(key);
}

export function useBookData(title: string, author: string) {
  const key = `${title}::${author}`;
  const [, force] = useState(0);

  useEffect(() => {
    const rerender = () => force((n) => n + 1);
    if (!listeners.has(key)) listeners.set(key, new Set());
    listeners.get(key)!.add(rerender);
    if (!cache.has(key)) fetchBook(key, title, author);
    return () => { listeners.get(key)?.delete(rerender); };
  }, [key, title, author]);

  const state = cache.get(key);
  return { cover: state?.data.cover ?? null, isbn: state?.data.isbn ?? null, loading: state?.status === 'loading' };
}

import { useQuery } from '@tanstack/react-query';
import { channels } from '../data/channels';

/**
 * Trae los avatares oficiales de los canales de YouTube desde /api/channel-avatars.
 * Devuelve un mapa { nombreDelCanal: urlAvatar }. Si la función no está configurada
 * (falta YOUTUBE_API_KEY) o falla, devuelve {} y las tarjetas usan el monograma.
 */
export function useChannelAvatars() {
  return useQuery<Record<string, string>>({
    queryKey: ['channel-avatars'],
    queryFn: async () => {
      const names = Array.from(new Set(channels.map((c) => c.ytChannel).filter(Boolean))) as string[];
      if (names.length === 0) return {};
      const r = await fetch('/api/channel-avatars?names=' + encodeURIComponent(names.join('|')));
      const ct = r.headers.get('content-type') || '';
      if (!r.ok || !ct.includes('application/json')) return {};
      const j = await r.json();
      return (j && j.avatars) || {};
    },
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });
}

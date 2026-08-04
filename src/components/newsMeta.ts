import { MessageCircle, Newspaper, Cloud, Play } from 'lucide-react';
import type { NewsSource } from '../hooks/useNews';

export const sourceMeta: Record<NewsSource, { label: string; color: string; Icon: typeof Newspaper }> = {
  reddit: { label: 'Reddit', color: '#ff4500', Icon: MessageCircle },
  news: { label: 'Prensa', color: '#22d3ee', Icon: Newspaper },
  bluesky: { label: 'Bluesky', color: '#0a7aff', Icon: Cloud },
  youtube: { label: 'YouTube', color: '#ff0000', Icon: Play },
};

export function timeAgo(iso: string): string {
  const secs = (Date.now() - new Date(iso).getTime()) / 1000;
  if (!isFinite(secs) || secs < 0) return '';
  if (secs < 60) return 'recién';
  if (secs < 3600) return `hace ${Math.floor(secs / 60)} min`;
  if (secs < 86400) return `hace ${Math.floor(secs / 3600)} h`;
  const days = Math.floor(secs / 86400);
  if (days < 30) return `hace ${days} d`;
  return new Date(iso).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
}
